/* Menus menu */
window.extensionMenus = {};
function hideMenusMenu() {
  document.querySelector('.menus-list .menu').style.display = 'none';
}

function showMenusMenu() {
  resetMenu();
  loadMenus();
  if (document.querySelector(".menus-list .menusList").value) loadMenu(document.querySelector(".menus-list .menusList").value);
  document.querySelector('.menus-list .menu').style.display = '';
}

function isMenusMenuVisible() {
  return !document.querySelector('.menus-list .menu').style.display === 'none';
}

function saveItems(){
  var name = document.querySelector(".menus-list .menusList").value;
  if (name && extensionMenus[name]){
    extensionMenus[name] = toArray(document.querySelectorAll(".menuContent .container")).map((item) => {return {text: item.querySelector("input.text").value, value: item.querySelector("input.value").value}});
  }
  setSelectMenu(document.querySelector('div.edit-proprieties div.change-input-option select'), ...Object.keys(extensionMenus).map((item) => {return {text: item, value: item}}));
}

function addMenu(){
  var name = document.querySelector(".menus-list input").value;
  if (name){
    if (!window.extensionMenus){
      window.extensionMenus = {};
    }

    if (!extensionMenus[name] || (extensionMenus[name] && confirm(`The menu "${name}" already exists. Do you want to replace it?`))){
      saveItems();
      window.extensionMenus[name] = [];
      addMenus(name);
      document.querySelector(".menus-list .menusList").value = name;
      loadMenu(name);
    }
  }
}

function loadMenu(menu){
  if (!extensionMenus[menu]) throw Error(`The menu "${menu}" does not exists`);
  setMenuItem(...extensionMenus[menu]);
}

function loadMenus(){
  document.querySelector(".menus-list .menusList").innerHTML = "";
  for (var menu of Object.keys(extensionMenus)){
    var option = document.createElement("option");
    option.text = menu;
    option.value = menu;
    document.querySelector(".menus-list .menusList").appendChild(option);
  }
}

function addMenus(...menus){
  for (var menu of menus){
    var option = document.createElement("option");
    option.text = menu;
    option.value = menu;
    document.querySelector(".menus-list .menusList").appendChild(option);
  }
}

function addMenuItem(...items){
  var content = document.querySelector(".menus-list .menuContent");
  function _(text = "", value = ""){
    let container = document.createElement("div");
    container.classList.add("container");
    let _delete = document.createElement("div");
    _delete.classList.add("delete");
    let delete_btn = document.createElement("button");
    delete_btn.innerText = "🗑️";
    _delete.appendChild(delete_btn);
    delete_btn.addEventListener("click", (e) => {
      content.removeChild(container);
    });
    container.appendChild(_delete);
    let move = document.createElement("div");
    move.classList.add("move-buttons");
    container.appendChild(move);
    let moveup = document.createElement("button");
    moveup.innerText = "🔼";
    moveup.addEventListener("click", (e) => {
      if (content.children[0] === container) return;
      content.insertBefore(container, content.children[(toArray(content.children).indexOf(container) - 1)]);
    });
    move.appendChild(moveup);
    let movedown = document.createElement("button");
    movedown.innerText = "🔽";
    movedown.addEventListener("click", (e) => {
      if (content.children[(content.children.length-1)] === container) return;
      content.insertBefore(container, content.children[(toArray(content.children).indexOf(container) + 2)]);
    });
    move.appendChild(movedown);
    let item_container = document.createElement("div");
    item_container.classList.add("item-container");
    let text_ = document.createElement("input");
    text_.type = "text";
    text_.placeholder = "text";
    text_.classList.add("text");
    text_.value = text;
    text_.addEventListener("input", () => {saveItems();});
    item_container.appendChild(text_);
    let separator = document.createElement("span");
    separator.innerText = "=";
    item_container.appendChild(separator);
    let value_ = document.createElement("input");
    value_.type = "text";
    value_.placeholder = "value";
    value_.classList.add("value");
    value_.value = value;
    value_.addEventListener("input", () => {saveItems();});
    item_container.appendChild(value_);
    container.appendChild(item_container);
    content.appendChild(container);
  }
  for (var item of items){
    _(item.text, item.value);
  }
}

function resetMenu(){
  document.querySelector(".menus-list .menuContent").innerHTML = "";
}

function setMenuItem(...items){
  resetMenu();
  addMenuItem(...items);
}

function refreshOpenedMenu(...args){
  saveItems();
  loadMenu(document.querySelector(".menus-list .menusList").value);
}

function removeMenu(){
  var name = document.querySelector(".menus-list .menusList").value;
  if (name && extensionMenus[name]){
    delete extensionMenus[name];
    resetMenu();
  }
}

document.querySelector(".menus-list .menusList").addEventListener("input", refreshOpenedMenu);

window.addEventListener("load", (event) => {
  hideMenusMenu();
});
