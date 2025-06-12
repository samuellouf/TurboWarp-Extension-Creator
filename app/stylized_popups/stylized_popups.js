class StylizedPopups {
  constructor(theme) {
    this.style = document.createElement("style");
    document.head.appendChild(this.style);

    this.div = document.createElement("div");
    this.div.id = "stylized_popups";
    document.body.appendChild(this.div);

    this.confirm_div = document.querySelector(
      "#stylized_popups .popup.confirm",
    );
    this.prompt_div = document.querySelector("#stylized_popups .popup.prompt");

    this.themes = {
      light: {
        text: "black",
        background: "white",
        placeholder: "#bcbcbc",
        highlight: "#2b6195",
        secondary_highlight: "#9ecaff",
      },
    };

    this.selectedTheme = null;

    const watchFunction = async (func, listener) => {
      const delay = ms => new Promise(res => setTimeout(res, ms));
      var f, f_, event;
      class FunctionEvent{
        constructor(type, new_value, old_value){
          this.type = type;
          this.new_value = new_value;
          this.old_value = old_value;
        }
      }
      while (true){
        f = f_ = await func();
        while (f == f_){
          await delay(125);
          f_ = (await func());
        }
        event = new FunctionEvent('change', f_, f);
        listener(event);
      }
    }

    watchFunction(
      () => this.selectedTheme,
      (event) => {
        this.style.innerText = `:root{\n  --stylized-popups-color: ${this.themes[this.selectedTheme].text};\n  --stylized-popups-background-color: ${this.themes[this.selectedTheme].background};\n  --stylized-popups-input-placeholder-color: ${this.themes[this.selectedTheme].placeholder};\n  --stylized-popups-highlight: ${this.themes[this.selectedTheme].highlight};\n  --stylized-popups-secondary-highlight: ${this.themes[this.selectedTheme].secondary_highlight};\n}`;
      },
    );

    this.selectedTheme = theme || "light";
  }

  selectTheme(name) {
    if (this.themes[name]) {
      this.selectedTheme = name;
    } else {
      throw Error(`The theme "${name}" doesn't exists.`);
    }
  }

  _(title, subtitle = "", input = false, ...buttons) {
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

    return new Promise(async (resolve) => {
      var popup = document.createElement("div");
      popup.classList.add("popup");
      var title_ = document.createElement("h3");
      title_.innerText = title;
      popup.appendChild(title_);
      var subtitle_ = document.createElement("p");
      subtitle_.innerText = subtitle;
      popup.appendChild(subtitle_);
      if (input){
        var input_ = document.createElement("input");
        input_.type = typeof input == "object" ? (input.type || "text") : "text";
        input_.value = typeof input == "object" ? (input.value || "") : "";
        input_.placeholder = typeof input == "object" ? (input.placeholder || "") : "";
        input_.name = "prompt-input";
        popup.appendChild(input_);
      }
      var buttons__ = [];
      var buttons_ = document.createElement("div");
      buttons_.classList.add("buttons");
      for (var button of buttons){
        var button_ = document.createElement("button");
        button_.innerText = button.text;
        button_.setAttribute("returns", button.returns);
        buttons__.push(button_);
        buttons_.appendChild(button_);
      }
      popup.appendChild(buttons_);
      this.div.appendChild(popup);
      var event = await getPromiseFromEvent("click", ...buttons__);
      this.div.removeChild(popup);
      if (input){
        resolve({button: event.target.getAttribute("returns"), input: input_.value});
      }
      resolve({button: event.target.getAttribute("returns")});
    });
  }

  alert(title, subtitle = ""){
    return this._(title, subtitle, false, {text: "OK", returns: ""});
  }

  confirm(title, subtitle = "") {
    return this._(title, subtitle, false, {text: "OK", returns: true}, {text: "Cancel", returns: false});
  }

  prompt(title, subtitle = "", placeholder = "", value = "", type = "text"){
    return this._(title, subtitle, {placeholder, value, type}, {text: "OK", returns: true}, {text: "Cancel", returns: false})
  }
}

let popups = new StylizedPopups();
