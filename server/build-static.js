const fs = require("fs");
const pathUtil = require("path");
const { mkdirp, recursiveReadDirectory } = require("./fs-utils");

class Builder {
  constructor() {
    if (process.argv.includes("--app")) {
      this.mode = ["app", null];
    } else if (process.argv.includes("--website")) {
      this.mode = ["website", null];
    } else {
      this.mode = ["full", null];
    }

    if (process.argv.includes("--dev")) {
      this.mode[1] = "dev";
    }

    if (this.mode[0] === "app") {
      this.websiteRoot = pathUtil.join(__dirname, "../app");
    } else if (this.mode[0] === "website" || this.mode[0] === "full") {
      this.websiteRoot = pathUtil.join(__dirname, "../website");
    }

    this.additionalRoots = [];

    if (this.mode[0] === "full"){
      this.additionalRoots.push({ url: "app/", path: pathUtil.join(__dirname, "../app")});
    }

    if (this.mode[1] === "dev"){
      this.additionalRoots.push({ url: "tests/", path: pathUtil.join(__dirname, "../tests")});
    }

    this.additionalFiles = ["package.json"];

    this.files = {};
  }

  build() {
    for (const [filename, absolutePath] of recursiveReadDirectory(
      this.websiteRoot,
    )) {
      this.files[`/${filename}`] = absolutePath;
    }

    for (var root of this.additionalRoots){
      for (const [filename, absolutePath] of recursiveReadDirectory(
        root.path,
      )) {
        this.files[`/${root.url}${filename}`] = absolutePath;
      }
    }

    for (const [filename, absolutePath] of this.additionalFiles.map((file) => [
      file.url || file,
      pathUtil.join(__dirname, "../", file.path || file),
    ])) {
      if (fs.existsSync(absolutePath))
        this.files[`/${filename}`] = absolutePath;
    }

    /* Copy the files */
    const buildPath = pathUtil.join(__dirname, "../", "build");
    if (fs.existsSync(buildPath)) fs.rmdirSync(buildPath, { force: true });
    fs.mkdirSync(buildPath);
    const getFiles = (files) => {
      var files_ = [];
      for (var name of Object.keys(files)){
        files_.push([name, files[name]]);
      }
      return files_;
    }

    for (const [filename, absolutePath] of getFiles(this.files)){
      try {
        if (!fs.existsSync(pathUtil.join(buildPath, filename, "../"))) fs.mkdirSync(pathUtil.join(buildPath, filename, "../"))
        fs.copyFileSync(absolutePath, pathUtil.join(buildPath, filename));
      } catch(e) {
        console.error(`Could not build file "${pathUtil.join(buildPath, filename)}" from "${absolutePath}"`)
      }
    }
  }

  tryBuild(...args) {
    const start = new Date();
    process.stdout.write(`[${start.toLocaleTimeString()}] Building... `);

    try {
      const build = this.build(...args);
      this.build_ = build;
      const time = Date.now() - start.getTime();
      console.log(`done in ${time}ms`);
      return build;
    } catch (error) {
      console.log("error");
      console.error(error);
    }

    return null;
  }

  startWatcher(callback) {
    // Load chokidar lazily.
    const chokidar = require("chokidar");
    callback(this.tryBuild());
    chokidar
      .watch([this.websiteRoot].concat(this.additionalRoots.map((root) => root.path)), {
        ignoreInitial: true,
      })
      .on("all", () => {
        callback(this.tryBuild());
      });
  }
}

const builder = new Builder();
builder.tryBuild();