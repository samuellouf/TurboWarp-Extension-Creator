// Fully operational

function hideAllBlocksEditTools() {
  try {
    document.querySelector('div.edit-proprieties div.change-text').style.display = 'none';
  } catch {}
}

document.addEventListener( 'click', deleteBlockText);

function deleteBlockText ( event ) {
  var clicked_on_block = event.target.classList.contains('turbowarp-block') || event.target.parentElement.classList.contains('turbowarp-block') || event.target.parentElement.parentElement.classList.contains('turbowarp-block');
  if (clicked_on_block){
    document.querySelector('div.edit-proprieties div.deleteblock .deleteblockbutton').disabled = false;
    document.querySelector('div.edit-proprieties div.delete .deletebutton').disabled = false;
    document.querySelector('div.edit-proprieties div.delete .deletebutton').onclick = function() {
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
      if (event.target.classList.contains('turbowarp-block')){
        event.target.outerHTML = '';
      } else if (event.target.parentElement.classList.contains('turbowarp-block')){
        event.target.parentElement.outerHTML = '';
      } else if (event.target.parentElement.parentElement.classList.contains('turbowarp-block')){
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