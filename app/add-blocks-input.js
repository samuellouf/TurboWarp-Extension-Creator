// Fully Operational

function if_then_else_return(condition, then_return, else_return){
  if(condition){ return then_return; } else { return else_return; }
}

document.addEventListener( 'click', addBlockInput);

function addBlockInput ( event ) {
  var clicked_on_block = event.target.classList.contains('turbowarp-block');
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('edit-proprieties');
  var clicked_on_edit_opcode_function = event.target.id == 'code' || event.target.parentElement.id == 'code' || event.target.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.id == 'code';
  
  if (clicked_on_block && !(event.target.attributes.type.value == 'label' || event.target.attributes.type.value == 'xml' || event.target.attributes.type.value == 'button')){
    document.querySelector('div.edit-proprieties div.add-input').style.display = '';
    document.querySelector('div.edit-proprieties div.add-input button').onclick = function() {
      var inputType = document.querySelector('div.edit-proprieties div.add-input select').value;
      var input = document.createElement('input');
      const inputBases = {
        text: '<input type="text" name=""/>',
        number: '<input type="number" name=""/>',
        color: '<input type="color" name=""/>',
        menu: '<select name="" type="menu" menu=""><option value="a">A</option><option value="b">B</option></select>',
        boolean: '<div class="turbowarp-input" type="boolean" name=""><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div></div>'
      };
      event.target.append(input);
      input.outerHTML = inputBases[inputType];
    };
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    document.querySelector('div.edit-proprieties div.add-input').style.display = 'none';
  }
}

document.querySelector('div.edit-proprieties div.add-input').style.display = 'none';