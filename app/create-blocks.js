// Fully operational

localStorage.setItem('blockIDsOPCODE', '{}');

function if_then_else_return(condition, then_return, else_return){
    if(condition){ return then_return; } else { return else_return; }
}

function hideCreateBlockMenu() {
    document.querySelector('.add-block .menu').style.display = 'none';
}

function showCreateBlockMenu() {
    document.querySelector('.add-block .menu').style.display = '';
}

function isCreateBlockMenuVisible() {
    return !document.querySelector('.add-block .menu').style.display == 'none';
}

function hideInputDefaultValue(){
    document.querySelector('section#blocks .blocks_spawnzone div.edit-proprieties div.change-default-value').style.display = 'none';
    document.querySelector('section#blocks .blocks_spawnzone div.edit-proprieties div.change-default-value-number').style.display = 'none';
    document.querySelector('section#blocks .blocks_spawnzone div.edit-proprieties div.change-default-value-color').style.display = 'none';
}

function addBlock(type){
  const getRandomIntegrerBetween = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function generateBlockID(){
    var base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var code = '';
    for (var i in 'special-code'){
      code = code + base64[getRandomIntegrerBetween(0, 64)];
    }
    return code;
  }

  var block = document.createElement('div');

  var blockID = generateBlockID();

  while (localStorage.getItem('blockIDsOPCODE').includes(blockID)){
    blockID = generateBlockID();
  }

  var blockBases = {
    label: '<div class="turbowarp-block" type="label" opcode="" blockid="' + blockID + '">\nText\n</div>',
    command: '<div class="turbowarp-block" type="command" opcode="" blockid="' + blockID + '">\n<div type="text">Text</div>\n</div>',
    reporter: '<div class="turbowarp-block" type="reporter" opcode="" blockid="' + blockID + '">\n<div type="text">Text</div>\n</div>',
    boolean: '<div class="turbowarp-block" type="boolean" opcode="" blockid="' + blockID + '">\n<div type="text">Text</div>\n</div>',
    xml: '<div class="turbowarp-block" type="xml" opcode="" blockid="' + blockID + '">\n<textarea placeholder="Enter your XML Here"></textarea>\n</div>',
    button: '<div class="turbowarp-block" type="button" opcode="" blockid="' + blockID + '">\n<button type="button" class="buttonstylized">Button</button>\n</div>'
  }
  document.querySelector('section#blocks div.blocks_spawnzone div').append(block);
  block.outerHTML = blockBases[type] + '<br>';
  var bID = JSON.parse(localStorage.getItem('blockIDsOPCODE'));
  bID[blockID] = {isAsync:false, additionalParameters:"", code:""};
  localStorage.setItem('blockIDsOPCODE', JSON.stringify(bID));
}

function createBlock() {
  hideCreateBlockMenu();
  var blocktype = document.querySelector('.add-block .menu select').value;
  addBlock(blocktype);
}

window.addEventListener("load", (event) => {
  hideCreateBlockMenu();
});