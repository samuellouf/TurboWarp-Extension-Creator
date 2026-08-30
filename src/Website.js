import { useRef } from 'react';
import snapshot from './website/images/snapshot.png';
import tryit from './website/images/tryit.svg';
import github_logo from './website/images/github-mark-white.svg';

function setActive(page){
  try {
    if (document.querySelector('header').innerHTML.includes('active')){
      var activepage = document.querySelector('header.topnav a.active');
      activepage.classList.remove('active');
    }
  } catch (error){}
  
  if (page === '' || page === '/'){
    document.querySelector('header.topnav a').classList.add('active');
  } else {
    document.querySelector('header.topnav a[href="#' + page + '"]').classList.add('active');
  }
}

function Home(){
  return (
    <section id="home">
      <br/>
      <div className="presentation">
        <div className="text">
          <p>Use TurboWarp Extension Creator to easily code TurboWarp extensions.</p>
          <a href={window.location.origin + "/TurboWarp-Extension-Creator/app"}><button className="stylizedbutton" style={{ color: "black", backgroundColor: "white" }}><img src={tryit} alt="" width="16"/>&nbsp;&nbsp;Try it</button></a>
        </div>
        <div className="snapshot">
          <img src={snapshot} width="800" alt=""/>
        </div>
      </div>
      <section id="links" className="centeritems">
        <a href="https://github.com/samuellouf/TurboWarp-Extension-Creator"><button className="stylizedbutton">See on GitHub</button></a>
        <a href="#download" onClick={() => { setActive('download'); }}><button className="stylizedbutton">Download</button></a>
      </section>
    </section>
  );
}

function Header(){
  var headerRef = useRef(null);
  var sticky = headerRef.current ? headerRef.current.offsetTop : Infinity;

  function refreshHeader(e) {
    if (sticky === Infinity){
      sticky = headerRef.current ? headerRef.current.offsetTop : Infinity;
    }

    if (window.pageYOffset > sticky) {
      headerRef.current.classList.add("sticky");
    } else {
      headerRef.current.classList.remove("sticky");
    }
  }

  window.addEventListener("scroll", refreshHeader);
  window.addEventListener("load", refreshHeader);

  return (
    <header className="topnav" ref={headerRef}>
      <a href="#home" onClick={() => { setActive('home'); }}>Home</a>
      <a href="#about" onClick={() => { setActive('about'); }}>About</a>
      <a href="#download" onClick={() => { setActive('download'); }}>Download</a>
      <a href="#lastestversionlog" onClick={() => { setActive('lastestversionlog'); }}>Lastest version log</a>
      <a href="#bugs" onClick={() => { setActive('bugs'); }}>Bugs and issues</a>
    </header>
  );
}

function Page(){
  return (
    <section id="page">
      <section id="about">
        <br/>
        <h1 className="title">About "TurboWarp Extension Creator"</h1>
        <br/>
        <p className="aboutparagraph">TurboWarp Extension Creator is free, can be downloaded and used offline.</p>
        <p className="aboutparagraph">TurboWarp Extension Creator is not affiliated with TurboWarp.</p>
        <p className="aboutparagraph">TurboWarp Extension Creator is an open-source project (registered under the MIT License).</p>
        <br/>
      </section>
      <section id="download">
        <br/>
        <h1 className="title">Download</h1>
        <br/>
        <div className="bigdownloadbutton">
          <a href="https://github.com/samuellouf/TurboWarp-Extension-Creator/releases" className="downloadbutton"><button className="stylizedbutton" style={{ backgroundColor: "#505050", outlineColor: "#707070", fontSize: "2em" }}>See the releases</button></a>
        </div>
        <br/>
      </section>
      <section id="lastestversionlog">
        <br/>
        <h1 className="title">Version Log</h1>
        <br/>
        <div className="log">
          <ul>
            <li>Updated the UI</li>
            <li>Renewed the code</li>
          </ul>
        </div>
        <br/>
      </section>
      <section id="bugs">
        <br/>
        <h1 className="title">Bugs and issues</h1>
        <br/>
        <p>If you have found any bug or issue in TurboWarp Extension Creator, please report it in issues.</p>
        <div className="centeritems">
          <a href="https://github.com/samuellouf/TurboWarp-Extension-Creator/issues/new?labels=bug&title=New+bug+report&assignees=samuellouf"><button className="stylizedbutton" style={{ backgroundColor: "#30a14e", outlineColor: "#3fc257", fontSize: "1.5em" }}>Report a bug</button></a>
        </div>
        <br/>
      </section>
      <a href="https://github.com/samuellouf/TurboWarp-Extension-Creator/" className="githubBTN" title="See on GitHub">
        <img src={github_logo} alt=""/>
      </a>
      <footer>
        <br/>
        <p>TurboWarp Extension Creator is not affiliated with TurboWarp.</p>
        <p>By @samuellouf - (on <a href="https://scratch.mit.edu/users/samuellouf/">Scratch</a>, <a href="https://github.com/samuellouf/">GitHub</a>)</p>
        <p><a href="https://samuellouf.github.io/">See my website</a></p>
        <p>Any problems? Report them <a href="https://github.com/samuellouf/TurboWarp-Extension-Creator/issues">here</a>.</p>
        <hr/>
        <div className="links"><a href="https://github.com/samuellouf/TurboWarp-Extension-Creator/">See the <i>source code</i> on GitHub</a></div>
        <br/>
        <br/>
      </footer>
    </section>
  );
}

function Website() {
  import('./website/styles/style.css');
  import('./website/styles/header.css');
  return (
    <div className="App">
      <Home />
      <Header />
      <Page />
    </div>
  );
}

export default Website;
