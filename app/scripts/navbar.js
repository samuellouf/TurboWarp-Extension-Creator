class NavBar{
  #config = [];
  #theme = "grey";
  constructor(config, position = ["absolute", "top", "left"], theme = "grey", size = '16px'){
    this.navbar = null;
    this.config = config;
    this.theme = theme;
    this.position = position;
    this.fontSize = size;
  }
  
  set config(config){
    this.navbar = this.createNavbar(config);
  }

  get config(){
    return this.#config;
  }

  createNavbar(config, level = 0) {
    function canFetch(url){
      return new Promise((resolve) => {
        fetch(url).then((response) => {
          resolve(response.status === 200);
        }).catch(() => {
          resolve(false);
        });
      });
    }

    const navbar = document.createElement("div");
    navbar.classList.add("navbar");
  
    const ul = document.createElement("ul");
  
    config.forEach((item) => {
      const li = document.createElement("li");

      li.setAttribute('name', 'li')

      if (item.icon){
        const icon = document.createElement("img");
        icon.src = item.icon;
        li.appendChild(icon);
        (async ()=> {
          if (!(await canFetch(item.icon))){
            li.removeChild(icon);
          }
        })();
      }
  
      if (item.label) {
        const span = document.createElement("span");
        span.textContent = item.label;
        li.appendChild(span);
      }
  
      Object.keys(item).forEach((key) => {
        if (key !== "label" && key !== "icon" && key !== "submenu") {
          if (key.startsWith("on")){
            li.addEventListener(key.replace("on", ""), item[key]);
          }
        }
      });
  
      if (item.open){
        li.addEventListener("click", () => {const a = document.createElement("a"); a.href=item.open.url; if (item.open.target) {a.target = item.open.target;} a.click();});
      }

      if (item.download){
        li.addEventListener("click", () => {const a = document.createElement("a"); a.href=item.download.url; if (item.download.name) {a.download = item.download.name;} else {a.setAttribute("download", "")} a.click();});
      }

      if (item.type === "separator") {
        li.classList.add("separator");
      }

      if (item.element){
        li.appendChild(item.element);
      }
      
      // Handle submenu
      if (item.submenu) {
        const subUl = document.createElement("ul");
        subUl.setAttribute('name', 'subUl');
        subUl.style.zIndex = level + 1;
  
        item.submenu.forEach((subItem) => {
          const subLi = document.createElement("li");
          subLi.setAttribute('name', 'subLi')
  
          Object.keys(subItem).forEach((key) => {
            if (key !== "label" && key !== "icon" && key !== "submenu") {
              if (key.startsWith("on")){
                subLi.addEventListener(key.replace("on", ""), subItem[key]);
              }
            }
          });

          if (subItem.icon && subItem.type !== "separator"){
            const subIcon = document.createElement("img");
            subIcon.src = subItem.icon;
            subLi.appendChild(subIcon);
            (async ()=> {
              if (!(await canFetch(subItem.icon))){
                subLi.removeChild(subIcon);
              }
            })();
          }
  
          if (subItem.open){
            subLi.addEventListener("click", ()=> {const a = document.createElement("a"); a.href=subItem.open.url; if (subItem.open.target) {a.target = subItem.open.target  ;} a.click();});
          }

          if (subItem.download){
            subLi.addEventListener("click", () => {const a = document.createElement("a"); a.href=subItem.download.url; if (subItem.download.name) {a.download = subItem.download.name;} else {a.setAttribute("download", "")} a.click();});
          }

          if (subItem.type === "separator") {
            subLi.classList.add("separator");
          } else if (subItem.label) {
            const subLiText = document.createElement("span");
            subLiText.textContent += subItem.label;
            subLi.appendChild(subLiText);
          }

          if (subItem.element){
            subLi.appendChild(subItem.element);
          }
  
          // Handle nested submenu
          if (subItem.submenu) {
            const nestedSubUl = this.createNavbar(subItem.submenu, level + 1);
            nestedSubUl.setAttribute('name', 'nestedSubUl');
            nestedSubUl.style.zIndex = level + 2;
            subLi.appendChild(nestedSubUl.querySelector("ul"));
          }
          subUl.appendChild(subLi);
        });
  
        li.appendChild(subUl);
      }
  
      ul.appendChild(li);
    });
  
    navbar.appendChild(ul);
    return navbar;
  }

  set theme(theme){
    if (!this.navbar) return;
    this.#theme = theme;
    const themes = {
      grey: {
        background: "#d3d3d3",
        submenuBackground: "#909090",
        hoveredBackground: "#aeaeae",
        color: "#000000"
      },
    };
    this.navbar.style.setProperty("--navbar-background", themes[theme].background);
    this.navbar.style.setProperty("--navbar-submenu-background", themes[theme].submenuBackground);
    this.navbar.style.setProperty("--navbar-hovered-background", themes[theme].hoveredBackground);
    this.navbar.style.setProperty("--navbar-color", themes[theme].color);
  }

  get theme(){
    return this.#theme;
  }

  set position(position){
    this.navbar.classList.remove("top", "bottom", "left", "right");
    this.navbar.style.position = position[0];
    this.navbar.classList.add(position[1]);
    this.navbar.classList.add(position[2]);
  }

  get position(){
    return [
      this.navbar.style.position,
      this.navbar.classList.contains("bottom") ? "bottom": "top",
      this.navbar.classList.contains("right") ? "right": "left"
    ]
  }

  set fontSize(size = '16px'){
    this.navbar.style.setProperty("--navbar-font-size", size);
  }

  get fontSize(){
    return this.navbar.style.getProperty("--navbar-font-size") || "inherited";
  }
}
