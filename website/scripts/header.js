// When the user scrolls the page, execute myFunction
window.addEventListener("scroll", refreshHeader);
window.addEventListener("load", refreshHeader);

// Get the header
var header = document.querySelector("header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function refreshHeader(e) {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}