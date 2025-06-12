const express = require("express");
const Builder = require("./builder");
const bodyParser = require("body-parser");
const utils = require("../utils");
const fs = require("fs");

var PORT = null,
  app = null,
  builder = null,
  mostRecentBuild = null,
  isServerOn = false;

function sendTemplate(response, page, ...incrustations) {
  response.contentType("text/html");
  page = fs.readFileSync(page, { encoding: "utf-8" });
  var computedPage = page;
  for (var incrustation of incrustations) {
    computedPage = computedPage.replace("[{INCRUSTRATION}]", incrustation);
  }
  response.send(computedPage);
}

async function startServer() {
  PORT = await utils.getOpenPort("localhost", 4000);

  mostRecentBuild = null;
  builder = new Builder();
  builder.startWatcher((newBuild) => {
    mostRecentBuild = newBuild;
  });

  app = express();
  app.use(bodyParser.json());
  app.set("strict routing", true);
  app.set("x-powered-by", false);

  app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self' blob:; script-src blob: data: 'self' 'unsafe-inline' 'unsafe-eval' https://samuellouf.github.io *; style-src 'self' 'unsafe-inline' *; img-src 'self' data: blob: *; connect-src 'self' https://samuellouf.github.io blob: *; media-src 'self' blob: *; frame-src *",
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });

  app.get("/*", (req, res, next) => {
    if (!mostRecentBuild) {
      res.contentType("text/plain");
      res.status(500);
      res.send("Build Failed; See Console");
      return;
    }

    const fileInBuild = mostRecentBuild.getFile(decodeURIComponent(req.path));
    if (!fileInBuild) {
      return next();
    }

    res.contentType(fileInBuild.getType());
    res.send(fileInBuild.read());

    if (req.path == "/app/close.html"){
      process.exit(0);
    }
  });

  app.get("/isServerOpened", (req, res, next) => {
    res.contentType("text/json");
    res.send(true);
  });

  app.use((req, res) => {
    if (builder.build_.files[req.path + "/index.html"] && !req.url.endsWith("/")){
      res.status(308);
      res.redirect(req.url + "/");
    } else {
      res.status(404);
    }

    if (builder.build_){
      if (builder.build_.files["/404.html"]){
        res.sendFile(builder.build_.files["/404.html"].sourcePath);
      }
    }
    console.error("404 Not Found:", req.path);
  });

  app.listen(PORT, () => {
    isServerOn = true;
    console.log(`${builder.mode[1] === "dev" ? "Development s" : "S"}erver is ready on http://localhost:${PORT}/`);
  });
}

module.exports = {
  PORT,
  app,
  builder,
  mostRecentBuild,
  startServer,
  isServerOn,
};

if (require.main === module) {
  startServer();
}
