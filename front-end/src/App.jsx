// import "./App.css";
import stravaButton from "../src/assets/images/strava-button.png";
import stravaButtonLarge from "../src/assets/images/strava-button-large.png";
import stravaLogo from "../src/assets/images/powered-by-strava-logo.png";

// Home page for my app - will re-direct to strava login upon login click
function App() {
  return (
    <div className="home-content">
      <h2>The Run Club</h2>
      {/* // alter URL here when hosted */}
      <p>Connect to app using the strava button below</p>
      {/* Auth via my app */}
      <a
        href={`https://www.strava.com/oauth/authorize?client_id=113640&response_type=code&redirect_uri=http://localhost:5174/exchange_token&approval_prompt=force&scope=activity:read_all`}
      >
        <img id="connect-strava-button" src={stravaButtonLarge}></img>
        {/* Strava logos can appear near, but must be completely separate and apart from (and should not appear more prominently than) the name/logo of your application. */}
        <img id="strava-logo" src={stravaLogo}></img>
      </a>
    </div>
  );
}

export default App;
