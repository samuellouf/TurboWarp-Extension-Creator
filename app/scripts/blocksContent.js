// Add block text
document.addEventListener('click', addBlockText);

function _addBlockText(block, text = "Text"){
  var input = document.createElement('span');
  input.setAttribute("type", "text");
  input.setAttribute("contenteditable", "");
  input.innerText = text;
  block.append(input);
}

function addBlockText ( event ) {
  var clicked_on_block = event.target.classList.contains('block');
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('edit-proprieties');
  var clicked_on_edit_opcode_function = event.target.id === 'code' || event.target.parentElement.id === 'code' || event.target.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.id === 'code';

  if (clicked_on_block && !(event.target.attributes.type.value === 'label' || event.target.attributes.type.value === 'xml' || event.target.attributes.type.value === 'button')){
    document.querySelector('div.edit-proprieties div.add-text').style.display = '';
    document.querySelector('div.edit-proprieties div.add-text button').onclick = function() {
      _addBlockText(event.target);
    };
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    document.querySelector('div.edit-proprieties div.add-text').style.display = 'none';
  }
}

document.querySelector('div.edit-proprieties div.add-text').style.display = 'none';

// Add block input

document.addEventListener( 'click', addBlockInput);

function _addBlockInput(block, type, name="", value = ""){
  var input = document.createElement('input');
  switch (type){
    case "boolean":
      input = document.createElement("span");
      input.classList.add("boolean");
      break;
    case "menu":
      input = document.createElement("select");
      input.setAttribute("menu", "");
      break;
  }
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  block.append(input);
  if (value) input.value = value;
  return input
}

function addBlockInput ( event ) {
  var clicked_on_block = event.target.classList.contains('block');
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('edit-proprieties');
  var clicked_on_edit_opcode_function = event.target.id === 'code' || event.target.parentElement.id === 'code' || event.target.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.id === 'code';
  
  if (clicked_on_block && !(event.target.attributes.type.value === 'label' || event.target.attributes.type.value === 'xml' || event.target.attributes.type.value === 'button')){
    document.querySelector('div.edit-proprieties div.add-input').style.display = '';
    document.querySelector('div.edit-proprieties div.add-input button').onclick = function() {
      var inputType = document.querySelector('div.edit-proprieties div.add-input select').value;
      _addBlockInput(event.target, inputType);
    };
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    document.querySelector('div.edit-proprieties div.add-input').style.display = 'none';
  }
}

document.querySelector('div.edit-proprieties div.add-input').style.display = 'none';

// Edit block inputs

document.querySelector("#blocks").addEventListener( 'click', editBlockInput);

var selectedInput = null;

function editBlockInput ( event ) {
  if (selectedInput == event.target){
    document.querySelector('div.edit-proprieties div.change-argument-name').style.display = '';
    return
  }
  var clicked_on_block = event.target.parentElement.classList.contains('block') || event.target.parentElement.parentElement.classList.contains('block');
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('edit-proprieties');
  var clicked_on_edit_opcode_function = event.target.id === 'code' || event.target.parentElement.id === 'code' || event.target.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id === 'code' || event.target.parentElement.id === 'code';
  var isBoolean = event.target.outerHTML.includes('type="boolean"');
  var isInput = event.target.tagName.toLowerCase() == 'input' || event.target.tagName.toLowerCase() == 'select';
  
  if (clicked_on_block && isInput) selectedInput = event.target;
  
  if (clicked_on_block && (isInput || isBoolean)){
    // Change argument name
    document.querySelector('div.edit-proprieties div.change-argument-name').style.display = '';
    if (isInput){
      document.querySelector('div.edit-proprieties div.change-argument-name input').value = event.target.name;
    } else if (isBoolean) {
      document.querySelector('div.edit-proprieties div.change-argument-name input').value = event.target.parentElement.attributes.name.value;
    }

    document.querySelector('div.edit-proprieties div.change-argument-name input').oninput = function() {
      if (isInput){
        event.target.setAttribute("name", document.querySelector('div.edit-proprieties div.change-argument-name input').value);
      } else if (isBoolean) {
        event.target.parentElement.attributes.name.value = document.querySelector('div.edit-proprieties div.change-argument-name input').value;
      }
    };

    if (event.target.tagName.toLowerCase() == 'select'){
      document.querySelector('div.edit-proprieties div.change-input-option').style.display = '';
      setSelectMenu(document.querySelector('div.edit-proprieties div.change-input-option select'), ...Object.keys(extensionMenus).map((item) => {return {text: item, value: item}}));
      
      // Accept Reporters
      document.querySelector('div.edit-proprieties div.change-input-option input.menuacceptreporters').oninput = function() {
        event.target.setAttribute('acceptreporters', document.querySelector('div.edit-proprieties div.change-input-option input.menuacceptreporters').checked);
      };
      
      document.querySelector('div.edit-proprieties div.change-input-option select').oninput = function(e) {
        setSelectMenu(event.target, ...extensionMenus[document.querySelector('div.edit-proprieties div.change-input-option select').value]);
        event.target.setAttribute("menu", e.target.value);
      };
      setSelectMenu(event.target, ...extensionMenus[document.querySelector('div.edit-proprieties div.change-input-option select').value]);
    }
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    document.querySelector('div.edit-proprieties div.change-argument-name').style.display = 'none';
    document.querySelector('div.edit-proprieties div.change-input-option').style.display = 'none';
  }
}

document.querySelector('div.edit-proprieties div.change-argument-name').style.display = 'none';
document.querySelector('div.edit-proprieties div.change-input-option').style.display = 'none';