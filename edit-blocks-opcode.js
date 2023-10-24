// Fully Operational
document.addEventListener( 'click', editBlockOpcode);

function if_then_else_return(condition, then_return, else_return){
  if (condition){
    return then_return;
  } else {
    return else_return;
  }
}

function editBlockOpcode ( event ) {
  var clicked_on_block = event.target.classList.contains('turbowarp-block');
  var clicked_on_edit_opcode_function = event.target.id == 'code' || event.target.parentElement.id == 'code' || event.target.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.id == 'code';
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('edit-proprieties');
  
  if (clicked_on_block){
    document.querySelector('div.edit-proprieties div.change-block-opcode').style.display = '';
    document.querySelector('div.edit-proprieties div.change-block-opcode input').value = if_then_else_return(event.target.getAttribute('opcode') == undefined, '', event.target.getAttribute('opcode'));
    document.querySelector('div.edit-proprieties div.change-block-opcode button').onclick = function() {
      event.target.setAttribute('opcode', document.querySelector('div.edit-proprieties div.change-block-opcode input').value);
    };
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    document.querySelector('div.edit-proprieties div.change-block-opcode').style.display = 'none';
  }
}

document.querySelector('div.edit-proprieties div.change-block-opcode').style.display = 'none';