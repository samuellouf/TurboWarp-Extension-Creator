import four_o_four from './404.svg';

function NotFound() {
  import('./404.css');
  import('./website/styles/style.css');
  return (
    <>
      <h1>Error 404</h1>
      <div className="image">
        <img src={four_o_four} alt=""/>
      </div>
      <p>The page <code></code> was not found</p>
      <p>
        <a href={window.location.origin + "/TurboWarp-Extension-Creator"}><button>Return to main page</button></a>
      </p>
    </>
  );
}

export default NotFound;
