import { useState } from "react";
import BasicSettings from "./app/basic-settings";

function WebApp() {
  import('./app/styles/style.css');
  import('./app/styles/stylizedinputs.css');
  // const [basicSettings, setData] = useState({});
  const [page, setPage] = useState("basic-settings");

  function previousPage(){
    if (page === "blocks"){
      setPage("basic-settings");
    } else if (page === "exportation"){
      setPage("blocks");
    }
  }

  function nextPage(){
    if (page === "basic-settings"){
      setPage("blocks");
    } else if (page === "blocks"){
      setPage("exportation");
    }
  }


  return (
    <div className="App">
      {page === "basic-settings" && <BasicSettings />}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button disabled={page === "basic-settings"} onClick={previousPage}>Previous</button>
        <button disabled={page === "exportation"} onClick={nextPage}>Next</button>
      </div>
      <footer>
        <br/>
        <p>TurboWarp Extension Creator is not affiliated with TurboWarp.</p>
        <p>By @samuellouf - (on <a href="https://scratch.mit.edu/users/samuellouf/">Scratch</a>, <a href="https://github.com/samuellouf/">GitHub</a>)</p>
        <p><a href="https://samuellouf.github.io/">See my website</a></p>
        <p>Any problems? Report them <a href="https://github.com/samuellouf/TurboWarp-Extension-Creator/issues">here</a>.</p>
        <hr/>
        <div class="links"><a href="https://github.com/samuellouf/TurboWarp-Extension-Creator/">See the <i>source code</i> on GitHub</a></div>
        <br/><br/>
      </footer>
    </div>
  );
}

export default WebApp;