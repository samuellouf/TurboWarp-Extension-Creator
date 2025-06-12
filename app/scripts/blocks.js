// Add Blocks

window.blocksOpcodes = {};

function hideCreateBlockMenu() {
  document.querySelector('.add-block .menu').style.display = 'none';
}

function showCreateBlockMenu() {
  document.querySelector('.add-block .menu').style.display = '';
}

function isCreateBlockMenuVisible() {
  return !document.querySelector('.add-block .menu').style.display === 'none';
}

function hideInputDefaultValue(){
  document.querySelector('section#blocks .blocks_spawnzone div.edit-proprieties div.change-default-value').style.display = 'none';
  document.querySelector('section#blocks .blocks_spawnzone div.edit-proprieties div.change-default-value-number').style.display = 'none';
  document.querySelector('section#blocks .blocks_spawnzone div.edit-proprieties div.change-default-value-color').style.display = 'none';
}

function addBlock(type, originalText = true){
  var block = document.createElement('div');
  block.classList.add("block");
  block.setAttribute("type", type);
  block.setAttribute("opcode", "");

  var blockID = generateBlockID();

  while (blocksOpcodes[blockID]){
    blockID = generateBlockID();
  }
  
  block.setAttribute("blockid", blockID);

  switch (type){
    case "label":
      block.setAttribute("contenteditable", "");
      if (originalText) block.innerText = originalText == true ? "Text" : originalText;
      break;
    case "command":
    case "reporter":
    case "boolean":
      if (originalText) {
        var span = document.createElement("span");
        span.setAttribute("contenteditable", "");
        span.setAttribute("type", "text");
        span.innerText = originalText == true ? "Text" : originalText;
        block.appendChild(span);
      }
      break;
    case "xml":
      var textarea = document.createElement("textarea");
      textarea.placeholder = "Enter your XML Here";
      block.appendChild(textarea);
      break;
    case "button":
      var button = document.createElement("button");
      button.setAttribute("type", "button");
      button.classList.add("button");
      block.appendChild(button);
      break;
  }
  
  document.querySelector('section#blocks div.blocks_spawnzone div').append(block);
  document.querySelector('section#blocks div.blocks_spawnzone div').append(document.createElement("br"));
  blocksOpcodes[blockID] = {isAsync:false, additionalParameters:"", code:""};
  return {block, blockID}
}

function createBlock() {
  hideCreateBlockMenu();
  var blocktype = document.querySelector('.add-block .menu select').value;
  addBlock(blocktype);
}

window.addEventListener("load", (event) => {
  hideCreateBlockMenu();
});

// Delete blocks (text)

function hideAllBlocksEditTools() {
  try {
    document.querySelector('div.edit-proprieties div.change-text').style.display = 'none';
  } catch {}
}

function showAllBlocksEditTools() {
  try {
    document.querySelector('div.edit-proprieties div.change-text').style.display = '';
  } catch {}
}

document.addEventListener( 'click', deleteBlockText);

function deleteBlockText ( event ) {
  var clicked_on_block = event.target.classList.contains('block') || event.target.parentElement.classList.contains('block') || event.target.parentElement.parentElement.classList.contains('block');
  if (clicked_on_block){
    document.querySelector('div.edit-proprieties div.deleteblock .deleteblockbutton').disabled = false;
    document.querySelector('div.edit-proprieties div.delete .deletebutton').disabled = false;
    document.querySelector('div.edit-proprieties div.delete .deletebutton').onclick = function() {
      if (event.target.classList.contains('block')) return;
      if (event.target.outerHTML.includes('textarea') && event.target.outerHTML.includes('XML')){
        event.target.parentElement.outerHTML = '';
      } else {
        event.target.outerHTML = '';
      }
      
      hideAllBlocksEditTools();
      document.querySelector('div.edit-proprieties div.deleteblock .deleteblockbutton').disabled = true;
      document.querySelector('div.edit-proprieties div.delete .deletebutton').disabled = true;
    };

    document.querySelector('div.edit-proprieties div.deleteblock .deleteblockbutton').onclick = function() {
      if (event.target.classList.contains('block')){
        delete blocksOpcodes[event.target.getAttribute("blockid")];
        event.target.outerHTML = '';
      } else if (event.target.parentElement.classList.contains('block')){
        delete blocksOpcodes[event.target.parentElement.getAttribute("blockid")];
        event.target.parentElement.outerHTML = '';
      } else if (event.target.parentElement.parentElement.classList.contains('block')){
        delete blocksOpcodes[event.target.parentElement.parentElement.getAttribute("blockid")];
        event.target.parentElement.parentElement.outerHTML = '';
      }
      hideAllBlocksEditTools();
      document.querySelector('div.edit-proprieties div.deleteblock .deleteblockbutton').disabled = true;
      document.querySelector('div.edit-proprieties div.delete .deletebutton').disabled = true;
    };
  } else {
    document.querySelector('div.edit-proprieties div.deleteblock .deleteblockbutton').disabled = true;
    document.querySelector('div.edit-proprieties div.delete .deletebutton').disabled = true;
  }
}

window.onload = document.querySelector('div.edit-proprieties div.deleteblock .deleteblockbutton').disabled = true;
window.onload = document.querySelector('div.edit-proprieties div.delete .deletebutton').disabled = true;

// Opcode
document.addEventListener( 'click', editBlockOpcode);

function editBlockOpcode ( event ) {
  var clicked_on_block = event.target.classList.contains('block');
  var clicked_on_edit_opcode_function = event.target.id === 'code' || event.target.parentElement.id === 'code' || event.target.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.id === 'code';
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('edit-proprieties');
  
  if (clicked_on_block){
    document.querySelector('div.edit-proprieties div.change-block-opcode').style.display = '';
    document.querySelector('div.edit-proprieties div.change-block-opcode input').value = (event.target.getAttribute('opcode') === undefined ? '' : event.target.getAttribute('opcode'));
    document.querySelector('div.edit-proprieties div.change-block-opcode input').oninput = function() {
      event.target.setAttribute('opcode', document.querySelector('div.edit-proprieties div.change-block-opcode input').value);
      document.querySelector('section#code div p span.opcode').innerText = event.target.getAttribute('opcode');
    };
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    document.querySelector('div.edit-proprieties div.change-block-opcode').style.display = 'none';
  }
}

document.querySelector('div.edit-proprieties div.change-block-opcode').style.display = 'none';

// Edit the block's function
document.addEventListener( 'click', editBlockOpcodeFunction);

function editBlockOpcodeFunction ( event ) {
  var clicked_on_block = event.target.classList.contains('block');
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('edit-proprieties');
  var clicked_on_edit_opcode_function = event.target.id === 'code' || event.target.parentElement.id === 'code' || event.target.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.id === 'code';

  if (clicked_on_block && !(event.target.getAttribute('type') === 'label')){
    document.querySelector('section#code div').style.display = '';
    document.querySelector('section#code p').style.display = 'none';
    document.querySelector('section#code div input[type="checkbox"]').checked = (blocksOpcodes[event.target.getAttribute('blockid')].isAsync == true);
    document.querySelector('section#code div input[type="text"]').value = blocksOpcodes[event.target.getAttribute('blockid')].additionalParameters;
    document.querySelector('section#code div textarea').value = blocksOpcodes[event.target.getAttribute('blockid')].code;
    document.querySelector('section#code div p span.opcode').innerText = event.target.getAttribute('opcode');
    const saveCode = function() {
      blocksOpcodes[event.target.getAttribute('blockid')].isAsync = document.querySelector('section#code div input[type="checkbox"]').checked
      blocksOpcodes[event.target.getAttribute('blockid')].additionalParameters = document.querySelector('section#code div input[type="text"]').value
      blocksOpcodes[event.target.getAttribute('blockid')].code = document.querySelector('section#code div textarea').value;
      loadCode();
    };
    document.querySelector('section#code div input[type="checkbox"]').oninput = saveCode;
    document.querySelector('section#code div input[type="text"]').oninput = saveCode;
    document.querySelector('section#code div textarea').oninput = saveCode;
    // Update Prism Live
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    document.querySelector('section#code div').style.display = 'none';
    document.querySelector('section#code p').style.display = '';
  }
}

document.querySelector('section#code div').style.display = 'none';
document.querySelector('section#code p').style.display = '';

// Block generator
function generateBlock(block){
  const getType = (type) => {
    switch (type){
      case "Boolean":
        return "boolean";
      case "string":
        return "text";
      case "color":
      case "number":
      default:
        return type;
    }
  }
  const block_result = addBlock(block.blockType, false);
  var block_ = block_result.block;
  block_.setAttribute("opcode", block.opcode);
  for (var argument of block.text.match(/\[.*?\]|[^\[\]]+/g).map(part => part.trim())){
    if (argument.startsWith("[") && argument.endsWith("]")){
      var argname = argument.replace("[", "").replace("]", "");
      var arg = block.arguments[argname];
      if (arg.menu){
        _addBlockInput(block_, "menu", argname, arg.defaultValue || "");
      } else {
        _addBlockInput(block_, getType(arg.type), argname, arg.defaultValue || "");
      }
    } else {
      _addBlockText(block_, argument);
    }
  }
  return block_;
}
