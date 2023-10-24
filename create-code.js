function if_then_else_return(condition, then_return, else_return){
  if (condition){
    return then_return;
  } else {
    return else_return;
  }
}

function getBlockCode(block){
  if (block.getAttribute('type') == 'label'){
    return {
      blockType: "label",
      text: block.innerText
    }
  } else if (block.getAttribute('type') == 'button'){
    return {
      func: block.getAttribute('opcode'),
      blockType: "button",
      text: block.innerText
    }
  } else {
    var base = {
      opcode: block.getAttribute('opcode'),
      blockType: if_then_else_return(block.getAttribute('type') == 'boolean', 'Boolean', block.getAttribute('type')),
      text: ""
    }

    var inputs = [];
    var inputsElem = [];

    var i = 0;

    for (i in block.children){
      if (typeof block.children[i] == 'object'){

        if (i == 0){
          var before = '';
        } else {
          var before = ' ';
        }

        if ((block.children[i].getAttribute('type') == 'text') && (block.children[i].nodeName == 'DIV')){
          var text = block.children[i].innerText;
        } else {
          var text = '[' + block.children[i].getAttribute('name') + ']';
          inputs.push(block.children[i].getAttribute('name'));
          inputsElem.push(block.children[i]);
        }

        base.text = base.text + before + text;
      }
    }

    if (inputs != []){
      base.arguments = {}
      var b = 0;
      for (b in inputs){
        base.arguments[inputs[b]] = {}
        var elemtype = inputsElem[b].getAttribute('type');
        if (elemtype == 'text'){
          base.arguments[inputs[b]].type = 'string';
        } else if (elemtype == 'boolean'){
          base.arguments[inputs[b]].type = 'Boolean';
        } else if (elemtype == 'number'){
          base.arguments[inputs[b]].type = 'number';
        } else if (elemtype == 'color'){
          base.arguments[inputs[b]].type = 'color';
        } else if (elemtype == 'menu'){
          base.arguments[inputs[b]].type = 'string';
          base.arguments[inputs[b]].menu = inputsElem[b].getAttribute('menu');
        }

        if ((inputsElem[b].value != '') && !(elemtype == 'boolean')){
          if (elemtype == 'number'){
            base.arguments[inputs[b]].defaultValue = Number(inputsElem[b].value);
          } else {
            base.arguments[inputs[b]].defaultValue = inputsElem[b].value;
          }
        }
      }
    }

    return base;
  }
}

function getAllBlocks() {
  var blocks = document.querySelectorAll('div.turbowarp-block');
  var blocksCode = [];

  var n = 0;
  
  for (n in blocks){
    if (typeof blocks[n] == 'object'){
        blocksCode.push(getBlockCode(blocks[n]));
    }
  }

  return blocksCode;
}



function getMenuCode(menu){
  var menuitems = [];
  var d = 0;
  for (d in menu.children){
    if (typeof menu.children[d] == 'object'){
      menuitems.push({text: menu.children[d].innerText, value: menu.children[d].value});
    }
  }

  return {
    menu_name: menu.getAttribute('menu'),
    menu: {
      acceptReporters: menu.getAttribute('acceptreporters') == 'true',
      items: menuitems,
    }
  };
}

function getAllMenus(){
  var menus = {}
  var menusElements = document.querySelectorAll('div.turbowarp-block select[type="menu"]');

  var k = 0;
  
  for (k in menusElements){
    if (typeof menusElements[k] == 'object'){
      var menucode = getMenuCode(menusElements[k]);
      menus[menucode.menu_name] = menucode.menu;
    }
  }


  return menus;
}

function json_get_all( Stype, json ) {
  try {
    json = JSON.parse(json);
    switch (Stype) {
      case "keys":
        return JSON.stringify(Object.keys(json).map((key) => key));
      case "values":
        return JSON.stringify(Object.keys(json).map((key) => json[key]));
      case "datas":
        return JSON.stringify(
          Object.keys(json).map((key) => [key, json[key]])
        );
      default:
        return "";
    }
  } catch {
    return "";
  }
}

function getEveryBlocksCode(){
  var blockidsopcode = localStorage.getItem('blockIDsOPCODE');
  var blocks = document.querySelectorAll('div.turbowarp-block');
  blockidsopcode = JSON.parse(blockidsopcode);
  var fullcode = '';

  var f = 0;

  for (f in blocks){
    if (typeof blocks[f] == 'object' && blocks[f].getAttribute('opcode') != ''){
      var blockid = blocks[f].getAttribute('blockid');
      var code = '    ';
      if (blockidsopcode[blockid].isAsync){
        code = code + 'async ';
      }

      code = code + blocks[f].getAttribute('opcode') + '(args' + blockidsopcode[blockid].additionalParameters + ')' + `{\n      ${blockidsopcode[blockid].code.replaceAll('\n', '\n      ')}\n    }`;

      fullcode = fullcode + code + '\n';
    }
  }

  return fullcode;
}

// ----------------------------------------------
function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function generateExtensionCode(){
  if (!document.querySelector('div.extension-icon input[type="checkbox"]').checked){
    var iconURI = blobToBase64(document.querySelector('div.extension-icon input[type="file"]').files[0]);
  }

  var code = `
// Name: ${document.querySelector('div.extension-name input').value}
// ID: ${document.querySelector('div.extension-id input').value}
// Description: ${document.querySelector('div.extension-description input').value}${if_then_else_return(document.querySelector('div.extension-creator input').value == '', '', `
// By: ${document.querySelector('div.extension-creator input').value} ${if_then_else_return(document.querySelector('div.extension-creator-account-url input').value == '', '', `<${document.querySelector('div.extension-creator-account-url select').value + '://' + document.querySelector('div.extension-creator-account-url input').value}>`)}`)}

(function (Scratch) {
  "use strict";
  ${if_then_else_return(document.querySelector('div.extension-icon input[type="checkbox"]').checked, '', `const iconURI = "${await iconURI}";`)}
  ${if_then_else_return(document.querySelector('div.issandboxed input[type="checkbox"]').checked, `
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  }`, '')}

  class ${document.querySelector('div.extension-id input').value} {
    getInfo() {
      return {
        id: "${document.querySelector('div.extension-id input').value}",
        name: "${document.querySelector('div.extension-name input').value}",${if_then_else_return(document.querySelector('div.extension-color1 input[type="checkbox"]').checked, `\n        color1: "${document.querySelector('div.extension-color1 input[type="color"]').value}",`, '')}${if_then_else_return(document.querySelector('div.extension-color2 input[type="checkbox"]').checked, `\n        color2: "${document.querySelector('div.extension-color2 input[type="color"]').value}",`, '')}${if_then_else_return(document.querySelector('div.extension-color3 input[type="checkbox"]').checked, `\n        color3: "${document.querySelector('div.extension-color3 input[type="color"]').value}",`, '')}${if_then_else_return(document.querySelector('div.extension-icon input[type="checkbox"]').checked, '', '\n        menuIconURI: iconURI,')}
        blocks: ${JSON.stringify(getAllBlocks(), null, 2).replaceAll('\n', '\n        ')},
        menus: ${JSON.stringify(getAllMenus(), null, 2).replaceAll('\n', '\n        ')},
      };
    }

${getEveryBlocksCode()}

  }
  Scratch.extensions.register(new ${document.querySelector('div.extension-id input').value}());
})(Scratch);
`
  return code;
}

// ------------------------------------------

async function loadCode(){
  if(document.querySelector('div.extension-name input').value == '' || document.querySelector('div.extension-id input').value == '' || document.querySelector('div.extension-description input').value == '' || document.querySelector('div.extension-file-name input').value == ''){
    if (document.querySelector('div.extension-name input').value == ''){
      document.querySelector('h1.errortext b').innerText = 'Error: No extension name';
    } else if (document.querySelector('div.extension-id input').value == ''){
      document.querySelector('h1.errortext b').innerText = 'Error: No extension id';
    } else if (document.querySelector('div.extension-description input').value == ''){
      document.querySelector('h1.errortext b').innerText = 'Error: No extension description';
    } else if (document.querySelector('div.extension-file-name input').value == ''){
      document.querySelector('h1.errortext b').innerText = 'Error: No extension file name';
    }
  } else {
    document.querySelector('h1.errortext b').innerText = '';
    document.querySelector('section#result pre code').innerText = await generateExtensionCode();
  }
}

// -----------------------------------------------
function copyExtensionCode(){
  navigator.clipboard.writeText(document.querySelector('section#result pre code').innerText);
}