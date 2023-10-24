function itemOfFromString(number, from_string, splitby) {
  return String(from_string).split(String(splitby))[(Number(number) - 1)] || "";
}

document.addEventListener( 'click', editBlockOpcodeFunction);

function editBlockOpcodeFunction ( event ) {
  var clicked_on_block = event.target.classList.contains('turbowarp-block');
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('edit-proprieties');
  var clicked_on_edit_opcode_function = event.target.id == 'code' || event.target.parentElement.id == 'code' || event.target.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.id == 'code';
  
  if (clicked_on_block && !(event.target.getAttribute('type') == 'label')){
    document.querySelector('section#code div').style.display = '';
    document.querySelector('section#code p').style.display = 'none';
    var bID = JSON.parse(localStorage.getItem('blockIDsOPCODE'));
    document.querySelector('section#code div input[type="checkbox"]').checked = (bID[event.target.getAttribute('blockid')].isAsync == 'true');
    document.querySelector('section#code div input[type="text"]').value = bID[event.target.getAttribute('blockid')].additionalParameters;
    document.querySelector('section#code div textarea').value = bID[event.target.getAttribute('blockid')].code;
    document.querySelector('section#code div p span.opcode').innerText = event.target.getAttribute('opcode');
    document.querySelector('section#code button').onclick = function() {
      var bID = JSON.parse(localStorage.getItem('blockIDsOPCODE'));
      bID[event.target.getAttribute('blockid')].isAsync = document.querySelector('section#code div input[type="checkbox"]').checked
      bID[event.target.getAttribute('blockid')].additionalParameters = document.querySelector('section#code div input[type="text"]').value
      bID[event.target.getAttribute('blockid')].code = document.querySelector('section#code div textarea').value;
      localStorage.setItem('blockIDsOPCODE',JSON.stringify(bID));
    };
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    document.querySelector('section#code div').style.display = 'none';
    document.querySelector('section#code p').style.display = '';
  }
}

document.querySelector('section#code div').style.display = 'none';
document.querySelector('section#code p').style.display = '';