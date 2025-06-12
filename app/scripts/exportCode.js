function getBlockCode(block){
  if (block.getAttribute('type') === 'label'){
    return {
      blockType: "label",
      text: block.innerText
    }
  } else if (block.getAttribute('type') === 'button'){
    return {
      func: block.getAttribute('opcode'),
      blockType: "button",
      text: block.innerText
    }
  } else {
    var base = {
      opcode: block.getAttribute('opcode'),
      blockType: (block.getAttribute('type') === 'boolean' ? 'Boolean' : block.getAttribute('type')),
      text: ""
    }

    var inputs = [];
    var inputsElem = [];

    var i = 0;

    for (i in block.children){
      if (typeof block.children[i] === 'object'){

        if (i == 0){
          var before = '';
        } else {
          var before = ' ';
        }

        if ((block.children[i].getAttribute('type') === 'text') && (block.children[i].tagName === 'SPAN')){
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
        if (elemtype === 'text'){
          base.arguments[inputs[b]].type = 'string';
        } else if (elemtype === 'boolean'){
          base.arguments[inputs[b]].type = 'Boolean';
        } else if (elemtype === 'number'){
          base.arguments[inputs[b]].type = 'number';
        } else if (elemtype === 'color'){
          base.arguments[inputs[b]].type = 'color';
        } else if (elemtype === 'menu'){
          base.arguments[inputs[b]].type = 'string';
          base.arguments[inputs[b]].menu = inputsElem[b].getAttribute('menu');
        }

        if ((inputsElem[b].value != '') && !(elemtype === 'boolean')){
          if (elemtype === 'number'){
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
  var blocks = document.querySelectorAll('#blocks .block');
  var blocksCode = [];

  var n = 0;
  
  for (n in blocks){
    if (typeof blocks[n] === 'object'){
      blocksCode.push(getBlockCode(blocks[n]));
    }
  }

  return blocksCode;
}

function getEveryBlocksCode(){
  var blocks = getAllBlocks();
  var fullcode = '';

  for (var block of blocks){
    var code = '    ';
    var blockid = getOpcodeAssociations()[block.opcode];
    
    if (blocksOpcodes[blockid].isAsync){
      code = code + 'async ';
    }

    code = code + block.opcode + '(args' + blocksOpcodes[blockid].additionalParameters + ')' + `{\n      ${blocksOpcodes[blockid].code.replaceAll('\n', '\n      ')}\n    }`;

    fullcode = fullcode + code + '\n';
  }

  return fullcode;
}

// ----------------------------------------------
async function generateExtensionCode(){
  if (getBasicSettings().icon == "file"){
    var iconURI = await blobToBase64(getBasicSettings().icon_file);
  }

  return `// Name: ${getBasicSettings().ext_name}
// ID: ${getBasicSettings().ext_id}
// Description: ${getBasicSettings().ext_description}${(getBasicSettings().ext_creator === '' ? '' : `
// By: ${getBasicSettings().ext_creator} ${(getBasicSettings().ext_creator_url_suffix === '' ? '' : `<${getBasicSettings().ext_creator_url_prefix + '://' + getBasicSettings().ext_creator_url_suffix}>`)}`)}

(function (Scratch) {
  "use strict";${(getBasicSettings().icon == "colors" ? '' : `\nconst iconURI = "${iconURI}";`)}${(!document.querySelector('div.issandboxed input[type="checkbox"]').checked ? `\n
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  }` : '')}

  class ${getBasicSettings().ext_name.replaceAll(" ", "")} {
    getInfo() {
      return {
        id: ${stringify(getBasicSettings().ext_id)},  
        name: ${stringify(getBasicSettings().ext_name)},${(getBasicSettings().ext_color1 ? `\n        color1: "${getBasicSettings().ext_color1}",` : '')}${(getBasicSettings().ext_color2 ? `\n        color2: "${getBasicSettings().ext_color2}",` : '')}${(getBasicSettings().ext_color3 ? `\n        color3: "${getBasicSettings().ext_color3}",` : '')}${(getBasicSettings().icon === "colors" ? '' : '\n        menuIconURI: iconURI,')}
        blocks: ${JSON.stringify(getAllBlocks(), null, 2).replaceAll('\n', '\n        ')},
        menus: ${JSON.stringify(extensionMenus || {}, null, 2).replaceAll('\n', '\n        ')},
      };
    }

${getEveryBlocksCode()}

  }
  Scratch.extensions.register(new ${getBasicSettings().ext_name.replaceAll(" ", "")}());
})(Scratch);`
}

// ------------------------------------------

async function loadCode(){
  document.querySelector('section#result code').innerHTML = (await generateExtensionCode()).replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  Prism.highlightAll();
}

// -----------------------------------------------
function copyExtensionCode(){
  navigator.clipboard.writeText(document.querySelector('section#result code').innerText);
}

async function downloadCode(){
  downloadText(
    (await generateExtensionCode()),
    `${getBasicSettings().ext_name}.js`
  );
  window.lastSave = getSave();
}

function getIDsAssociations(){
  var associations = {};
  for (var id of Object.keys(blocksOpcodes)){
    associations[id] = document.querySelector(`#blocks .block[blockid="${id}"]`).getAttribute("opcode");
  }
  return associations;
}

function getOpcodeAssociations(){
  var associations = {};
  for (var id of Object.keys(blocksOpcodes)){
    associations[document.querySelector(`#blocks .block[blockid="${id}"]`).getAttribute("opcode")] = id;
  }
  return associations;
}

/**
 * 
 * @typedef {{basic: object, blocks: object, menus: object, blocksOpcodes: object, blockIDs: object}} Save
 * @returns {Save}
 */
function getSave(){
  return {
    basic: getBasicSettings(),
    blocks: getAllBlocks(),
    menus: extensionMenus,
    blocksOpcodes,
    blockIDsAssociations: getIDsAssociations(),
    blockOpcodesAssociations: getOpcodeAssociations(),
  }
}

/**
 * 
 * @typedef {{basic: object, blocks: object, menus: object, blocksOpcodesAssociations: object, blockIDsAssociations: object}} Save
 * @argument {Save} save
 */
function loadSave(save){
  const list = (associations) => {
    var array = [];
    for (var key of Object.keys(associations)){
      array.push([key, associations[key]]);
    }
    return array;
  } 
  setBasicSettings(save.basic);
  window.extensionMenus = save.menus;

  var blocks = {};
  for (var block of save.blocks){
    blocks[block.opcode] = generateBlock(block);
  }

  for (var [opcode, block] of list(blocks)){
    block.setAttribute("blockid", save.blockOpcodesAssociations[opcode]);
  }

  window.blocksOpcodes = save.blocksOpcodes;
}

function downloadSave(){
  downloadText(JSON.stringify(getSave(), null, 2), `${getBasicSettings().ext_name}.tec`);
}

document.addEventListener("click", () => {loadCode()});
