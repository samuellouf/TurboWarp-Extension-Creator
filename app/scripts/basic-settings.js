// Fully operational
function inputHandlerNeedsToBeFilled(name){
  (window.loadCode || (() => {}))();
  const func = (event) => {
    const img = document.querySelector(`div.extension-${name} img`);
    img.src = event.target.value === '' ? './images/error.svg' : './images/valid.svg';
  }
  return func;
}

function inputHandlerDoesntNeedToBeFilled(name){
  (window.loadCode || (() => {}))();
  const func = (event) => {
    const img = document.querySelector(`div.extension-${name} img`);
    img.src = event.target.value === '' ? '' : './images/valid.svg';
  }
  return func;
}

function getBasicSettings(){
  var form = document.querySelector('#extension-manifest form');
  var data = Object.fromEntries(new FormData(document.querySelector('#extension-manifest form')).entries());
  data.icon = form.querySelector(`[name="ext_icon"]`).checked ? "colors" : "file";
  data.ext_icon = form.querySelector(`[name="ext_icon"]`).checked;
  delete data.ext_color1_enabled;
  delete data.ext_color2_enabled;
  delete data.ext_color3_enabled;
  return data;
}

function setBasicSettings(data){
  const form = document.querySelector('#extension-manifest form');
  form.querySelector(`[name="ext_color1"]`).disabled = form.querySelector(`[name="ext_color2"]`).disabled = form.querySelector(`[name="ext_color3"]`).disabled = true;
  form.querySelector(`[name="ext_color1_enabled"]`).checked = form.querySelector(`[name="ext_color2_enabled"]`).checked = form.querySelector(`[name="ext_color3_enabled"]`).checked = false;
  for (var key of Object.keys(data)){
    if (!form.querySelector(`[name="${key}"]`)) break;
    if (form.querySelector(`[name="${key}"]`).type === "checkbox"){
      form.querySelector(`[name="${key}"]`).checked = data[key];
    } else if (form.querySelector(`[name="${key}"]`).type === "color") {
      form.querySelector(`[name="${key}"]`).disabled = false;
      form.querySelector(`[name="${key}"]`).value = data[key];
      form.querySelector(`[name="${key}_enabled"]`).checked = true;
    } else {
      form.querySelector(`[name="${key}"]`).value = data[key];
    }
  }
  (window.loadCode || (() => {}))();
  refreshExtensionColor();
}

document.querySelector('div.extension-name input').addEventListener("input", inputHandlerNeedsToBeFilled("name"));

document.querySelector('div.extension-id input').addEventListener("input", inputHandlerNeedsToBeFilled("id"));

document.querySelector('div.extension-description input').addEventListener("input", inputHandlerNeedsToBeFilled("description"));

document.querySelector('div.extension-creator input').addEventListener("input", inputHandlerDoesntNeedToBeFilled("creator"));

document.querySelector('div.extension-creator-account-url input').addEventListener("input", (event) => {
  inputHandlerDoesntNeedToBeFilled("creator-account-url")(event);
  if (event.target.value.includes('http')){
    if (event.target.value.includes('https://')){
      document.querySelector('div.extension-creator-account-url select').value = 'https';
      event.target.value = event.target.value.replace('https://', '');
    } else if (event.target.value.includes('http://')){
      document.querySelector('div.extension-creator-account-url select').value = 'http';
      event.target.value = event.target.value.replace('http://', '');
    }
  }
});

function refreshExtensionColor(){
  document.body.style.setProperty("--color1", document.querySelector('div.extension-color1 input').disabled ? '#0fbd8c' : document.querySelector('div.extension-color1 input').value);
  document.body.style.setProperty("--color2", document.querySelector('div.extension-color2 input').disabled ? '#0b8e69' : document.querySelector('div.extension-color2 input').value);
  document.body.style.setProperty("--color3", document.querySelector('div.extension-color3 input').disabled ? '#0c9770' : document.querySelector('div.extension-color3 input').value);
}

document.querySelector('div.extension-color1 .switch input').addEventListener("input", (event) => {
  document.querySelector('div.extension-color1 input').disabled = !document.querySelector('div.extension-color1 .switch input').checked;
  refreshExtensionColor();
});

document.querySelector('div.extension-color2 .switch input').addEventListener("input", (event) => {
  document.querySelector('div.extension-color2 input').disabled = !document.querySelector('div.extension-color2 .switch input').checked;
  refreshExtensionColor();
});

document.querySelector('div.extension-color3 .switch input').addEventListener("input", (event) => {
  document.querySelector('div.extension-color3 input').disabled = !document.querySelector('div.extension-color3 .switch input').checked;
  refreshExtensionColor();
});

document.querySelector('div.extension-color1 input').addEventListener("input", (event) => {
  document.querySelector('svg.icon g g').style.fill = document.querySelector('div.extension-color1 input').value;
  refreshExtensionColor();
});

document.querySelector('div.extension-color2 input').addEventListener("input", (event) => {
  document.querySelector('svg.icon g g').style.stroke = document.querySelector('div.extension-color2 input').value;
  refreshExtensionColor();
});

document.querySelector('div.extension-icon .switch input').addEventListener("input", (event) => {
  document.querySelector('div.extension-icon input').disabled = document.querySelector('div.extension-icon .switch input').checked;
  refreshExtensionColor();
});

document.querySelector("#basic-settings form").addEventListener("submit", (event) => {
  event.preventDefault();
  var settings = getBasicSettings();
  openPage("extension-blocks");
});

document.querySelector('input[name="ext_icon"]').addEventListener("input", (event) => {
  document.querySelector('input[name="icon_file"]').required = !event.target.checked;
});

document.addEventListener("DOMContentLoaded", ()=> {refreshExtensionColor()});
