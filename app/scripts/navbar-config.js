const emptySave = {
  basic: {
    ext_name: "",
    ext_id: "",
    ext_description: "",
    ext_creator: "",
    ext_creator_url_prefix: "https",
    ext_creator_url_suffix: "",
    ext_color1: "#0fbd8c",
    ext_color2: "#0b8e69",
    ext_color3: "#0c9770",
    ext_icon: true,
    icon: "colors"
  },
  blocks: [],
  menus: {},
  blocksOpcodes: {},
  blockIDsAssociations: {},
  blockOpcodesAssociations: {}
};

window.lastSave = emptySave;

async function newProject(){
  if (!_.isEqual(getSave(), emptySave) && !_.isEqual(lastSave, getSave())){
    switch ((await popups._("Unsaved changes", "This project has changes that haven't been saved. How do you want to proceed.", false, {text: "Save and continue", returns: "save"}, {text: "Continue anyways", returns: "continue"}, {text: "Cancel", returns: "cancel"})).button){
      case "save":
        await _saveProject();
      case "continue":
        break;
      case "cancel":
        return;
    }
  }
  
  loadSave(emptySave);

  document.querySelector('#blocks .blocks').innerHTML = "";

  openPage("extension-manifest");
}

async function openProject(){
  if (!_.isEqual(getSave(), emptySave) && !_.isEqual(lastSave, getSave())){
    switch ((await popups._("Unsaved changes", "This project has changes that haven't been saved. How do you want to proceed.", false, {text: "Save and continue", returns: "save"}, {text: "Continue anyways", returns: "continue"}, {text: "Cancel", returns: "cancel"})).button){
      case "save":
        await _saveProject();
      case "continue":
        break;
      case "cancel":
        return;
    }
  }
  
  if (window.showOpenFilePicker){
    var picker_ = await window.showOpenFilePicker({
      types: [
        {
          description: "TurboWarp Extension Creator Save File",
          accept: {
            "*/*": [".tec"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    window.picker = picker_[0];
    var file = await picker_[0].getFile();
  } else {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".tec";
    input.click();
    await getPromiseFromEvent("input", input);
    var file = input.files[0];
  }

  var text = await file.text();
  loadSave(JSON.parse(text));
}

async function _saveProject(newfile = false){
  if (window.showSaveFilePicker){
    if (!window.picker || newfile){
      window.picker = await window.showSaveFilePicker({
        excludeAcceptAllOption: true,
        suggestedName: `${getBasicSettings().ext_name}.tec`,
        types: [
          {
            description: "TurboWarp Extension Creator Save File",
            accept: {
              "*/*": [".tec"],
            },
          },
        ],
      });
    }
    const writable = await window.picker.createWritable();
    writable.write(JSON.stringify(getSave(), null, 2));
    writable.close();
    window.lastSave = getSave();
  } else {
    downloadText(JSON.stringify(getSave(), null, 2), `${getBasicSettings().ext_name}.tec`);
    window.lastSave = getSave();
  }
}

function saveProject(){
  _saveProject();
}

function saveProjectAs(){
  _saveProject(true);
}

async function exit(){
  if (!_.isEqual(getSave(), emptySave) && !_.isEqual(lastSave, getSave())){
    switch ((await popups._("Unsaved changes", "This project has changes that haven't been saved. How do you want to proceed.", false, {text: "Save and continue", returns: "save"}, {text: "Continue anyways", returns: "continue"}, {text: "Cancel", returns: "cancel"})).button){
      case "save":
        await _saveProject();
      case "continue":
        break;
      case "cancel":
        return;
    }
  }

  location.href = location.href + "close.html";
}

const navbar_config = [
  {
    label: "File",
    submenu: [
      {
        label: "New project",
        onclick: newProject
      },
      { type: "separator" },
      {
        label: "Open project",
        onclick: () => {
          openProject();
        }
      },
      { type: "separator" },
      {
        label: "Save",
        onclick: saveProject
      },
      {
        label: "Save as",
        onclick: saveProjectAs
      },
      { type: "separator" },
      {
        label: "Exit",
        onclick: exit
      }
    ]
  }
];

const navbar = new NavBar(navbar_config);
document.querySelector("header").appendChild(navbar.navbar);