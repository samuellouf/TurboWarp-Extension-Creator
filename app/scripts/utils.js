const getPromiseFromEvent = (event, ...elements) => {
  return new Promise((resolve) => {
    const end = (e) => {
      for (var element of elements){
        element.removeEventListener(event, end);
      }
      resolve(e);
    }
    for (var element of elements){
      element.addEventListener(event, end);
    }
  });
}

const getPromiseFromEvents = (element, ...events) => {
  return new Promise((resolve) => {
    const end = (e) => {
      for (var event of events){
        element.removeEventListener(event, end);
      }
      resolve(e);
    }
    for (var event of events){
      element.addEventListener(event, end);
    }
  });
}

/**
 * Get a random integrer
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const getRandomIntegrerBetween = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Convert an officious array into an actual array
 * @param {*} array 
 * @returns {Array}
 */
const toArray = (array) => {
  var final_array = [];
  for (var item of array){
    final_array.push(item);
  }
  return final_array;
}

/**
 * Get a Blob's base64 URL
 * @param {Blob} blob
 * @returns {string}
 */
function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

/**
 * Download a file from an URL
 * @param {string} url
 * @param {string} file
 */
const downloadURL = (url, file) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = file;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

/**
 * Download a file from a Blob object
 * @param {Blob} blob
 * @param {string} file
 */
const downloadBlob = (blob, file) => {
  const url = URL.createObjectURL(blob);
  downloadURL(url, file);
  URL.revokeObjectURL(url);
};

/**
 * Knows if the URL is a data url
 * @param {string} url
 * @returns {boolean}
 */
const isDataURL = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "data:";
  } catch (e) {
    return false;
  }
};

/**
 * Download a file from an URL
 * @param {string} url
 * @param {string} file
 */
const downloadFromURL = (url, file) => {
  if (isDataURL(url)) {
    downloadURL(url, file);
  } else {
    return fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        downloadBlob(blob, file);
      });
  }
};

/**
 * Download some text
 * @param {string} text
 * @param {string} file
 */
function downloadText(text, file) {
  downloadBlob(
    new Blob([String(text)]),
    String(file)
  );
}

/**
 * @param {Node|HTMLElement|Element} element
 * @returns {{query: string, queryAll: number}}
 */
function getQueryOfElement(element){
  var attributeNames = element.getAttributeNames();
  if (attributeNames.includes('class')){
    var classes = '.' + element.className.replaceAll(' ', '.');
  } else {
    var classes = '';
  }

  if (attributeNames.includes('id')){
    var id = '#' + element.id;
  } else {
    var id = '';
  }

  var query = element.tagName.toLowerCase() + id + classes;

  return {
    query: query,
    queryAll: toArray(document.querySelectorAll(query)).findIndex(query),
  };
}

/**
 * Displays returns string as you would se it in a console
 * @param {string} string
 * @returns {string}
 */
function stringify(string){
  if (string.includes('\'') && string.includes('\"') && string.includes('\`')){
    return `\`${string.replaceAll('\`', '\\\`')}\``;
  } else if (string.includes('\'') && string.includes('\"')){
    return `\`${string}\``;
  } else if (string.includes('\'')){
    return `"${string}"`;
  } else if (string.includes('\"')){
    return `'${string}'`;
  } else if (string.includes('\`')){
    return `'${string}'`;
  }
  return `'${string}'`;
}

function initThereBefore(){
  window.thereBefore = Object.keys(window);
  if (thereBefore.includes("thereBefore")) thereBefore.push("thereBefore");
}

function wasItThereBefore(object){
  if (!thereBefore) throw Error("You have to init \"thereBefore\" first");
  return thereBefore.includes(object);
}

function listDifferences(){
  if (!thereBefore) throw Error("You have to init \"thereBefore\" first");
  var different = [];
  for (var object of Object.keys(window)){
    if (!wasItThereBefore(object)){
      different.push(object);
    }
  }
  return different;
}

function resetSelectMenu(menu){
  menu.innerHTML = "";
}

function addToSelectMenu(menu, ...items){
  for (var item of items){
    let item_ = document.createElement("option");
    item_.text = item.text;
    item_.value = item.value;
    menu.appendChild(item_);
  }
}

function setSelectMenu(menu, ...items){
  resetSelectMenu(menu);
  addToSelectMenu(menu, ...items);
}

function range(a, b = null, step = 1){
  var array = [];
  if (b == null){
    b = a;
    a = 0;
  }
  var i = a;
  while (i < b){
    array.push(i);
    i += step;
  }
  return array;
}

function generateBlockID(){
  var base64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var code = '';
  for (var i in range(16)){
    code = code + base64[getRandomIntegrerBetween(0, 64)];
  }
  return code;
}
