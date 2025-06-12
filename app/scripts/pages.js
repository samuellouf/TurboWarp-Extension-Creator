function openPage(id){
  const toArray = (list) => {
    var array = [];
    for (var e of list){
      array.push(e);
    }
    return array;
  }

  toArray(document.querySelectorAll(".page")).forEach((element) => {
    if (element.id === id){
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });
}
