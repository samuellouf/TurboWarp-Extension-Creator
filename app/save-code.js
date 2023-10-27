/**
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
 * @param {Blob} blob
 * @param {string} file
 */
const downloadBlob = (blob, file) => {
  const url = URL.createObjectURL(blob);
  downloadURL(url, file);
  URL.revokeObjectURL(url);
};

/**
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
 * @param {string} url
 * @param {string} file
 */
function downloadFileFromURL(url, file) {
  return downloadFromURL(
    String(url),
    String(file)
  );
}

function downloadCode(){
  downloadText(
    document.querySelector('section#result code').innerText,
    document.querySelector('section#result div').innerText
  );
}