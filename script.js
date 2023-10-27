function setActive(page){
  try {
    if (document.querySelector('header').innerHTML.includes('active')){
      var activepage = document.querySelector('header.topnav a.active');
      activepage.classList.remove('active');
    }
  } catch (error){}
  
  if (page == '' || page == '/'){
    document.querySelector('header.topnav a').classList.add('active');
  } else {
    document.querySelector('header.topnav a[href="#' + page + '"]').classList.add('active');
  }
}

if (window.location.href.includes('#')){
  setActive(window.location.hash.replace('#', ''));
} else {
  setActive('home');
}