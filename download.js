function if_then_else_return(condition, then_return, else_return){
  if (condition) {return then_return;} else {return else_return;}
}

function getOS(){
  if (navigator.userAgent.includes("Mac OS")) return "macOS";
  if (navigator.userAgent.includes("Linux")) return "Linux";
  if (navigator.userAgent.includes("Windows")) return "Windows";
  return "Other";
}

function getArchitecture(){
  if (navigator.userAgent.includes("x64")){
    return "64";
  } else {
    return "32";
  }
}

async function loadDownloadButton(){
  var lastest_version = await fetch('https://samuellouf.github.io/TurboWarp-Extension-Creator/lastest_version.json').then(result => result.text());
  lastest_version = JSON.parse(lastest_version);
  
  var download_button = document.querySelector('#page #download a.downloadbutton button');
  var download_link = document.querySelector('#page #download a.downloadbutton');
  
  download_button.innerHTML = 'Download version ' + lastest_version.stable.version + ' for <img src="' + if_then_else_return(getOS() == 'Windows', 'windows', if_then_else_return(getOS() == 'macOS', 'macOS', 'linux')) + '.svg" width="24"> ' + getOS();

  download_link.href = 'javascript: download();';
}

// This download function can work all by itself
async function download(version='lastest', os=if_then_else_return(getOS() == 'Windows', 'win', if_then_else_return(getOS() == 'macOS', 'macOS', 'linux'))){
  if (version == 'lastest'){
    var lastest_version = await fetch('https://samuellouf.github.io/TurboWarp-Extension-Creator/lastest_version.json').then(result => result.text());
    lastest_version = JSON.parse(lastest_version);
    version = lastest_version.stable.version;
  }
  const link = document.createElement("a");
  link.href = 'https://github.com/samuellouf/TurboWarp-Extension-Creator-App/releases/download/v' + version + '/TurboWarp-Extension-Creator-v' + version + '-' + os + '.' + if_then_else_return(os == 'win', 'exe', if_then_else_return(os == 'macOS', 'dmg', 'zip'));
  link.download = ('TurboWarp-Extension-Creator-v' + version + '-' + os + '.' + if_then_else_return(os == 'win', 'exe', if_then_else_return(os == 'macOS', 'dmg', 'zip'))).replace('v.', 'v');
  document.body.appendChild(link);
  link.click();
  link.remove();
}

loadDownloadButton();