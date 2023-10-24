// Fully operational

const hasOwn = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);

function json_array_filter(key, json) {
  try {
    json = JSON.parse(json);
    return JSON.stringify(
      json.map((x) => {
        if (hasOwn(x, key)) {
          return x[key];
        }
        return null;
      })
    );
  } catch (e) {
    return "";
  }
}

document.addEventListener( 'click', editBlockInput);

function editBlockInput ( event ) {
  var clicked_on_block = event.target.parentElement.classList.contains('turbowarp-block') || event.target.parentElement.parentElement.classList.contains('turbowarp-block');
  var clicked_on_edit_proprieties = event.target.classList.contains('edit-proprieties') || event.target.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.classList.contains('edit-proprieties') || event.target.parentElement.parentElement.parentElement.parentElement.classList.contains('edit-proprieties');
  var clicked_on_edit_opcode_function = event.target.id == 'code' || event.target.parentElement.id == 'code' || event.target.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.parentElement.parentElement.parentElement.id == 'code' || event.target.parentElement.id == 'code';
  var isBoolean = (event.target.parentElement.outerHTML.includes('class="turbowarp-input"') && event.target.parentElement.outerHTML.includes('type="boolean"')) || (event.target.outerHTML.includes('class="turbowarp-input"') && event.target.outerHTML.includes('type="boolean"'));
  var isInput = event.target.outerHTML.includes('input') || event.target.outerHTML.includes('select');
  
  if (clicked_on_block && (isInput || isBoolean)){
    // Change argument name
    document.querySelector('div.edit-proprieties div.change-argument-name').style.display = '';
    if (isInput){
      document.querySelector('div.edit-proprieties div.change-argument-name input').value = event.target.name;
    } else if (isBoolean) {
      document.querySelector('div.edit-proprieties div.change-argument-name input').value = event.target.parentElement.attributes.name.value;
    }

    document.querySelector('div.edit-proprieties div.change-argument-name button').onclick = function() {
      if (isInput){
        event.target.name = document.querySelector('div.edit-proprieties div.change-argument-name input').value;
      } else if (isBoolean) {
        event.target.parentElement.attributes.name.value = document.querySelector('div.edit-proprieties div.change-argument-name input').value;
      }
    };

    if (event.target.outerHTML.includes('select')){
      var values = [];
      for (var i in event.target.options){
        values.push(event.target.options[i].value);
      }
      try{
        document.querySelector('div.edit-proprieties div.change-input-option span.option').innerText = document.querySelector('div.edit-proprieties div.change-input-option select').options[values.indexOf(document.querySelector('div.edit-proprieties div.change-input-option select').value)].innerHTML;
      } catch{}
      document.querySelector('div.edit-proprieties div.change-input-option input.menuacceptreporters').value = (event.target.getAttribute('acceptreporters') == 'true');
      document.querySelector('div.edit-proprieties div.change-input-option select').innerHTML = event.target.innerHTML;
      document.querySelector('div.edit-proprieties div.change-input-option').style.display = '';
      // Refresh Option Selector
      document.querySelector('div.edit-proprieties div.change-input-option select').onclick = function() {
        var values = [];
        for (var i in event.target.options){
          values.push(event.target.options[i].value);
        }
        document.querySelector('div.edit-proprieties div.change-input-option span.option').innerText = document.querySelector('div.edit-proprieties div.change-input-option select').options[values.indexOf(document.querySelector('div.edit-proprieties div.change-input-option select').value)].innerText;
        document.querySelector('div.edit-proprieties div.change-input-option span.value').innerText = document.querySelector('div.edit-proprieties div.change-input-option select').value;
      };

      // New Option
      document.querySelector('div.edit-proprieties div.change-input-option button.new').onclick = function() {
        const sel = document.querySelector('div.edit-proprieties div.change-input-option select');
        const sel_original = event.target;
        const opt = document.createElement("option");
        const opt_2 = document.createElement("option");
        var value = document.querySelector('div.edit-proprieties div.change-input-option p input.value').value;
        var text = document.querySelector('div.edit-proprieties div.change-input-option p input.option').value;
        opt.value = value;
        opt.text = text;
        opt_2.value = value;
        opt_2.text = text;
        sel.add(opt, null);
        sel_original.add(opt_2, null);
      };
      
      // Delete Option
      document.querySelector('div.edit-proprieties div.change-input-option button.delete').onclick = function() {
        var values = [];
        for (var i in event.target.options){
          values.push(event.target.options[i].value);
        }
        var vtd = document.querySelector('div.edit-proprieties div.change-input-option select').value;
        event.target.options[values.indexOf(vtd)].outerHTML='';
        document.querySelector('div.edit-proprieties div.change-input-option select').options[values.indexOf(vtd)].outerHTML='';
      };
      
      // Accept Reporters
      document.querySelector('div.edit-proprieties div.change-input-option input.menuacceptreporters').onchange = function() {
        event.target.setAttribute('acceptreporters', document.querySelector('div.edit-proprieties div.change-input-option input.menuacceptreporters').checked);
      };


      // -----------
      // Menu Name
      document.querySelector('div.edit-proprieties div.change-input-option input.setmenuname').value = event.target.getAttribute('menu');
      document.querySelector('div.edit-proprieties div.change-input-option button.setmenuname').onclick = function() {
        let setmenunameinput = document.querySelector('div.edit-proprieties div.change-input-option input.setmenuname');
        event.target.setAttribute('menu', setmenunameinput.value);
      };
    }
  } else if (!clicked_on_edit_proprieties && !clicked_on_edit_opcode_function){
    document.querySelector('div.edit-proprieties div.change-argument-name').style.display = 'none';
    document.querySelector('div.edit-proprieties div.change-input-option').style.display = 'none';
  }
}

document.querySelector('div.edit-proprieties div.change-argument-name').style.display = 'none';
document.querySelector('div.edit-proprieties div.change-input-option').style.display = 'none';