// Fully operational

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

document.addEventListener( 'click', editBlockText);

function editBlockText ( event ) {
  var clicked_on_block = (event.target.classList.contains('turbowarp-block') && event.target.outerHTML.includes('type="label"'))|| event.target.parentElement.classList.contains('turbowarp-block') || event.target.parentElement.parentElement.classList.contains('turbowarp-block');
  var clicked_on_edit_opcode_function = event.target.id == 'code' || event.target.parentElement.id == 'code' || event.target.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.id == 'code';
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties');

  if (!(clicked_on_block || clicked_on_edit_proprieties)){
    hideAllBlocksEditTools();
  }

  var isText = (event.target.outerHTML.includes('type="button"') || event.target.outerHTML.includes('type="label"') || (event.target.outerHTML.includes('type="text"') && event.target.outerHTML.includes('div')));

  if (clicked_on_block && isText){
    document.querySelector('div.edit-proprieties div.change-text input').value = event.target.innerText;
    if ((event.target.classList.contains('turbowarp-block') || event.target.parentElement.classList.contains('turbowarp-block')) || !event.target.outerHTML.includes('type="xml"')) {
      if (event.target.outerHTML.includes('type="label"') || (event.target.outerHTML.includes('type="text"') && event.target.outerHTML.includes('div')) || event.target.outerHTML.includes('type="button"')){
        document.querySelector('div.edit-proprieties div.change-text').style.display = '';
        if (event.target.outerHTML.includes('type="label"') || event.target.outerHTML.includes('type="button"') || (event.target.outerHTML.includes('type="text"') && event.target.outerHTML.includes('div'))){
          document.querySelector('div.edit-proprieties div.change-text input').value = event.target.innerText;
        } else if (!event.target.classList.contains('turbowarp-block')){
          document.querySelector('div.edit-proprieties div.change-text input').value = event.target.value;
        } else if (event.target.classList.contains('turbowarp-block')) {
          document.querySelector('div.edit-proprieties div.change-text input').value = event.target.children[0].value;
        }
        document.querySelector('div.edit-proprieties div.change-text button').onclick = function() {
          event.target.innerText = document.querySelector('div.edit-proprieties div.change-text input').value;
        };
      }
    } else if (event.target.outerHTML.includes('type="button"')){
      document.querySelector('div.edit-proprieties div.change-text input').value = event.target.innerText;
      document.querySelector('div.edit-proprieties div.change-text button').onclick = function() {
        event.target.innerText = document.querySelector('div.edit-proprieties div.change-text input').value;
      };
    }
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    hideAllBlocksEditTools();
  }
}

window.onload = hideAllBlocksEditTools();