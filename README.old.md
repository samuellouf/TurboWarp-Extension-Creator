# TurboWarp Extension Creator
An HTML/CSS/JS app to easily create extensions for TurboWarp.

TurboWarp Extension Creator is not affiliated with TurboWarp.

## Versions
 - Version 1.0.0 : initial commit
 - Version 2.0.0 : Added NPM server among other things

## Usage
### Online
To use TurboWarp Extension Creator online, just open [https://samuellouf.github.io/TurboWarp-Extension-Creator/app](https://samuellouf.github.io/TurboWarp-Extension-Creator/app) or [https://samuellouf.itch.io/turbowarp-extension-creator](https://samuellouf.itch.io/turbowarp-extension-creator).

## Offline
### With Node.js
#### Installing Node.js
Go to [https://nodejs.org/en/download](https://nodejs.org/en/download) and download Node.js then install Node.js.
#### Downloading and opening
Download the TurboWarp Extension Creator binaries from [https://github.com/samuellouf/TurboWarp-Extension-Creator/releases](https://github.com/samuellouf/TurboWarp-Extension-Creator/releases) (download the `Source code` file).
Decompress the zip file and open the decompressed folder.
#### Running the scripts
|                    |  Build                               | Serve                                |
| ------------ | --------------------------- | --------------------------- |
| Full             | `npm run build`               | `npm run serve`                |
| App            | `npm run build-app`       | `npm run serve-app`         |
| Website      | `npm run build-website` | `npm run serve-website`  |

##### Build
If you choose to build the website, you then need to open `build/index.html`.

##### Serve
If you choose to serve the website, some text will appear in the console.
```sh

> turbowarp-extension-creator@2.0.0 serve
> node ./server/server.js [--full/--app/--website]

[XX:XX:XX] Building... done in XXXms
Server is ready on http://localhost:[XXXX]/

```

`[--full/--app/--website]` depends on the command you ran.

`[XX:XX:XX]` is the time the server was built (in the HH:MM:SS format).

`[XXXX]` is the localhost port (usually 4000).

Open `http://localhost:XXXX/` in your web browser.


### Without Node.js
#### Downloading and opening
Download the TurboWarp Extension Creator binaries from [https://github.com/samuellouf/TurboWarp-Extension-Creator/releases](https://github.com/samuellouf/TurboWarp-Extension-Creator/releases) (download the `build.zip` or `build.tar.gz` file).
Decompress the zip file and open the decompressed folder.

Open `index.html` in your web browser.

