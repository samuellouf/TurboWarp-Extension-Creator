// Fully operational

function if_then_else_return(condition, then_return, else_return){
  if (condition){
    return then_return;
  } else {
    return else_return;
  }
}

document.querySelector('div.extension-name input').addEventListener("change", (event) => {
  if (event.target.value == ''){
    document.querySelector('div.extension-name img').src = 'error.svg';
  } else {
    document.querySelector('div.extension-name img').src = 'valid.svg';
  }
});

document.querySelector('div.extension-id input').addEventListener("change", (event) => {
  if (event.target.value == ''){
    document.querySelector('div.extension-id img').src = 'error.svg';
  } else {
    document.querySelector('div.extension-id img').src = 'valid.svg';
  }
});

document.querySelector('div.extension-description input').addEventListener("change", (event) => {
  if (event.target.value == ''){
    document.querySelector('div.extension-description img').src = 'error.svg';
  } else {
    document.querySelector('div.extension-description img').src = 'valid.svg';
  }
});

document.querySelector('div.extension-creator input').addEventListener("change", (event) => {
  if (event.target.value != ''){
    document.querySelector('div.extension-creator img').src = 'valid.svg';
  } else {
    document.querySelector('div.extension-creator img').src = '';
  }
});

document.querySelector('div.extension-creator-account-url input').addEventListener("change", (event) => {
  if (event.target.value != ''){
    document.querySelector('div.extension-creator-account-url img').src = 'valid.svg';
  } else {
    document.querySelector('div.extension-creator-account-url img').src = '';
  }
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

document.querySelector('div.extension-file-name input').addEventListener("change", (event) => {
  if (event.target.value == ''){
    document.querySelector('div.extension-file-name img').src = 'error.svg';
  } else {
    document.querySelector('div.extension-file-name img').src = 'valid.svg';
  }
  if (event.target.value.includes('.js')){
    event.target.value = event.target.value.replace('.js', '');
  }

  document.querySelector('#extension-file-name').innerText = event.target.value + '.js';
});

function refreshExtensionColor(){
  document.querySelector('style.blocks-color').innerText = '.turbowarp-input[type="boolean"] { background-color:' + if_then_else_return(document.querySelector('div.extension-color2 input').disabled, '#0b8e69', document.querySelector('div.extension-color2 input').value) + '; border: ' + if_then_else_return(document.querySelector('div.extension-color2 input').disabled, '#0b8e69', document.querySelector('div.extension-color2 input').value) + '} .turbowarp-block:not([type="label"]):not([type="button"]){background-color: ' + if_then_else_return(document.querySelector('div.extension-color1 input').disabled, '#0fbd8c', document.querySelector('div.extension-color1 input').value) + '; border: ' + if_then_else_return(document.querySelector('div.extension-color2 input').disabled, '#0b8e69', document.querySelector('div.extension-color2 input').value) + ' 2.5px solid;}';
}

document.querySelector('div.extension-color1 .switch input').addEventListener("change", (event) => {
  document.querySelector('div.extension-color1 input').disabled = !document.querySelector('div.extension-color1 .switch input').checked;
  refreshExtensionColor();
});

document.querySelector('div.extension-color2 .switch input').addEventListener("change", (event) => {
  document.querySelector('div.extension-color2 input').disabled = !document.querySelector('div.extension-color2 .switch input').checked;
  refreshExtensionColor();
});

document.querySelector('div.extension-color3 .switch input').addEventListener("change", (event) => {
  document.querySelector('div.extension-color3 input').disabled = !document.querySelector('div.extension-color3 .switch input').checked;
  refreshExtensionColor();
});

document.querySelector('div.extension-color1 input').addEventListener("change", (event) => {
  document.querySelector('svg.icon g g').style.fill = document.querySelector('div.extension-color1 input').value;
  refreshExtensionColor();
});

document.querySelector('div.extension-color2 input').addEventListener("change", (event) => {
  document.querySelector('svg.icon g g').style.stroke = document.querySelector('div.extension-color2 input').value;
  refreshExtensionColor();
});

document.querySelector('div.extension-icon .switch input').addEventListener("change", (event) => {
  document.querySelector('div.extension-icon input').disabled = document.querySelector('div.extension-icon .switch input').checked;
  refreshExtensionColor();
});

window.onload = refreshExtensionColor();