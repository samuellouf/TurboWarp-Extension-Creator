const fs = require("fs");
const child_process = require("child_process");
const chokidar = require("chokidar");
const net = require("net");

function watchPaths(callback, ...paths) {
  chokidar
    .watch(paths, {
      ignoreInitial: true,
    })
    .on("all", () => {
      callback(callback);
    });
}

function watchPathsSync(...paths) {
  return new Promise((resolve) => {
    watchPaths(resolve, ...paths);
  });
}

function waitForElementEvent(element, type) {
  return new Promise((resolve) => {
    var listener = (event) => {
      resolve(event);
      element.removeEventListener(type, listener);
    };
    element.addEventListener(type, listener);
  });
}

/**
 * Executes a command.
 * @param {string} command - The command to execute.
 * @param {object} options - The options for the command.
 * @returns {Promise<{error, stderr, stdout}>} - The result of the command.
 */
function exec(command, options = null) {
  return new Promise((resolve) => {
    child_process.exec(command, options, (error, stdout, stderr) =>
      resolve({ error, stderr, stdout }),
    );
  });
}

/**
 * Generates an ID sting of random characters.
 * @param {number} length - The numbers of characters in the ID.
 * @param {string} characters - The characters to use to compose the ID.
 */
function generateRandomID(
  length,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
) {
  var idx = "";
  for (let i = 0; i < length; i++) {
    idx += characters[Math.round(Math.random() * characters.length) - 1];
  }
  return idx;
}

function getVersion() {
  if (fs.existsSync("./package.json")) {
    return require("./package.json").version;
  }
  return "1.0.0";
}

async function getLastestVersion() {
  return (
    (await fetch(
      "https://samuellouf.github.io/TurboWarp-Extension-Creator/package.json",
    )
      .then((r) => r.json())
      .then((r) => r.version)
      .catch((err) => null)) || "1.0.0"
  );
}

/**
 * Compares two versions
 */
function compareVersions(v1, v2) {
  const compare = (item1, item2) =>
    item1 === item2 ? 0 : item1 < item2 ? -1 : 1;
  return (
    compare(
      Number(v1.split(".").slice(0, 2).join(".")),
      Number(v2.split(".").slice(0, 2).join(".")),
    ) ||
    compare(
      Number(v1.split(".").slice(1, 3).join(".")),
      Number(v2.split(".").slice(0, 3).join(".")),
    )
  );
}

async function isUpdateAvailable() {
  if (!bridge && isLocalServer()) return false;
  var current_version = await getVersion();
  var lastest_version = await getLastestVersion();
  return compareVersions(current_version, lastest_version) === -1;
}

function generateTimeStampFromDate(date) {
  return `${(String(date.getDate()).length === 1 ? "0" : "") + date.getDate()}-${(String(date.getMonth()).length === 1 ? "0" : "") + date.getMonth()}-${date.getFullYear()}--${(String(date.getHours()).length === 1 ? "0" : "") + date.getHours()}-${(String(date.getMinutes()).length === 1 ? "0" : "") + date.getMinutes()}-${(String(date.getSeconds()).length === 1 ? "0" : "") + date.getSeconds()}-${(String(date.getMilliseconds()).length === 1 ? "00" : String(date.getMilliseconds()).length === 2 ? "0" : "") + date.getMilliseconds()}`;
}

function getArgument(arg) {
  for (let arg_ of process.argv) {
    if (arg_.startsWith("-" + arg) || arg_.startsWith("--" + arg)) {
      if (arg_.includes("=")) {
        return arg_.split("=")[1];
      } else {
        return "";
      }
    }
  }
  return null;
}

function hasArgument(arg) {
  return getArgument(arg) != null;
}

function fixVersion(version) {
  return version.split(".").length - 1 === 0
    ? version + ".0.0"
    : version.split(".").length - 1 === 1
      ? version + ".0"
      : version;
}

function clearConsole() {
  if (console.clear) {
    console.clear();
  } else if (console.log) {
    console.log("\x1Bc");
  } else {
    process.stdout.write("\x1Bc");
  }
}

function isPortOpen(port, host = "localhost") {
  var socket = new net.Socket();
  return new Promise((resolve) => {
    socket.once("connect", () => {
      resolve(false);
    });

    socket.once("error", (error) => {
      resolve(true);
    });

    socket.connect({ port: port, host: host }, () => {});
  });
}

function getOpenPort(host = "localhost", startPort = 0, endPort = Infinity) {
  return new Promise(async (resolve) => {
    for (var port = startPort; port <= endPort; port++) {
      if (await isPortOpen(port, host)) {
        resolve(port);
        return;
      }
    }
    resolve(null);
  });
}

module.exports = {
  watchPaths,
  watchPathsSync,
  generateRandomID,
  getVersion,
  getLastestVersion,
  isUpdateAvailable,
  exec,
  waitForElementEvent,
  compareVersions,
  generateTimeStampFromDate,
  getArgument,
  hasArgument,
  fixVersion,
  clearConsole,
  isPortOpen,
  getOpenPort,
};
