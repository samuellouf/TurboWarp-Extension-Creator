import { useState, useRef } from "react";
import error_icon from './images/error.svg';
import valid_icon from './images/valid.svg';

var basic_settings = {};

function Input({ type, placeholder, name, required, value = "", text }){
  const inputRef = useRef(null);
  const [icon, setIcon] = useState(required && !value ? "error" : "valid");

  basic_settings[name] = "";

  function input(){
    setIcon(required && (!inputRef.current || (inputRef.current && inputRef.current.value === "")) ? "error" : "valid");
    basic_settings[name] = inputRef.current ? inputRef.current.value : value;
  }

  return (
    <>
      {text && <p className={required ? "required" : ""}>{placeholder} :</p>}
      <div style={{ display: "flex" }}>
        <input type={type} placeholder={placeholder} name={name} defaultValue={value} required={required} ref={inputRef} onInput={input}/>
        <img src={icon === "valid" ? valid_icon : error_icon} className="validity" height="20" alt=""/>
      </div>
    </>
  );
}

function Checkbox({ name, checked = false, onInput, forceblue, slider = false }){
  const inputRef = useRef(null);
  basic_settings[name] = "";

  function input(){
    basic_settings[name] = inputRef.current ? inputRef.current.checked : checked;
    if (onInput) onInput(inputRef.current ? inputRef.current.checked : checked);
  }

  return (
    <>
      {slider && <label className="switch">
        <input type="checkbox" name={name} ref={inputRef} onInput={input} defaultChecked={checked}/>
        <span className={"slider round" + (forceblue ? " forceblue" : "")}></span>
      </label>}
      {!slider && <label>
        <input type="checkbox" name={name} ref={inputRef} onInput={input} defaultChecked={checked}/>
      </label>}
    </>
  );
}

function ColorInput({ number, value, name, checked = false }){
  const inputRef = useRef(null);
  const [checked_, setChecked] = useState(checked);
  basic_settings[name] = "";

  function checkboxInput(ischecked){
    setChecked(ischecked);
  }

  function input(){
    basic_settings[name] = inputRef.current ? inputRef.current.value : value;
    document.body.style.setProperty("--color" + number, value);
  }

  input();

  return (
    <>
      <p>Extension color{number} :</p>
      <input type="color" defaultValue={value} name={name} ref={inputRef} onInput={input} disabled={!checked_}/>
      <Checkbox name={name + "_enabled"} checked={checked} onInput={checkboxInput} slider forceblue/>
    </>
  );
}

function IconInput(){
  const fileInputRef = useRef(null);
  const checkboxRef = useRef(null);

  function input(checked){
    fileInputRef.current.disabled = checked;
  }

  return (
    <div style={{ display: "flex" }}>
      <input type="file" name="icon_file" accept=".png,.jpg,.jpeg,.svg" disabled ref={fileInputRef}/>
      <span>Import file as icon</span>
      <span>&nbsp;&nbsp;</span>
      <Checkbox name="ext_icon" checked slider forceblue ref={checkboxRef} onInput={input}/>
      <span>&nbsp;&nbsp;</span>
      <span>Use extension colors</span>
      <span className="icon"></span>
    </div>
  );
}

function BasicSettings(){
  import('./styles/basic-settings.css');
  return (
    <div id="extension-manifest" className="page">
      <section id="basic-settings" className="form">
        <br/>
        <h1>Basic settings</h1>
        <p className="required">Red = Required</p>
        <form>
          <div className="extension-name">
            <Input type="text" placeholder="Extension name" name="ext_name" required text/>
          </div>
          <br/>
          <div className="extension-id">
            <Input type="text" placeholder="Extension ID" name="ext_id" required text/>
          </div>
          <br/>
          <div className="extension-description">
            <Input type="text" placeholder="Extension description" name="ext_description" required text/>
          </div>
          <br/>
          <div className="extension-creator">
            <Input type="text" placeholder="Extension creator" name="ext_creator" text/>
          </div>
          <br/>
          <div className="extension-creator-account">
            <p>Extension creator account URL:</p>
            <div style={{ display: "flex" }}>
              <span>https://scratch.mit.edu/users/</span>
              <Input type="text" placeholder="Scratch username" name="ext_creator_profile"/>
            </div>
          </div>
          <br/>
          <br/>
          <div className="extension-color1">
            <ColorInput value="#0fbd8c" name="ext_color1" number="1" checked/>
          </div>
          <br/>
          <div className="extension-color2">
            <ColorInput value="#0b8e69" name="ext_color2" number="2" checked/>
          </div>
          <br/>
          <div className="extension-color3">
            <ColorInput value="#0c9770" name="ext_color3" number="3" checked/>
          </div>
          <br/>
          <div className="extension-icon">
            <IconInput />
          </div>
          <br/>
          <div className="isunsandboxed">
            <p>Is extension unsandboxed :</p>
            <Checkbox name="ext_unsandboxed" slider checked/>
          </div>
          <br/>
          <br/>
        </form>
      </section>
    </div>
  );
}

export default BasicSettings;