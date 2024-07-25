import "./App.css";
import stravaButton from "../src/assets/images/strava-button.png";
import stravaButtonLarge from "../src/assets/images/strava-button-large.png";
import stravaLogo from "../src/assets/images/powered-by-strava-logo.png";

// Home page for my app - will re-direct to strava login upon login click
function App() {
  return (
    <div className="home-container">
      <img
        id="home-img"
        src="./src/assets/images/running-man.svg"
        alt="Running man logo"
      />
      <div className="home-content">
        <h1>The Run Club</h1>
        {/* // alter URL here when hosted */}
        <h4>What?</h4>
        <p>The Run Club helps you visualise your Strava activity data.</p>
        <h4>Why?</h4>
        <p>
          Born from a friendly 10km / week challenge, the app helps you track
          and monitor your weekly/monthly progress
        </p>
        <h4>How?</h4>
        <p>
          The Run Club connects directly to Strava and formats the data for you.
          No data is stored at any point :)
        </p>
        <p>Connect to the app using the strava button below</p>
        {/* Auth via my app */}
        <a
          href={`https://www.strava.com/oauth/authorize?client_id=113640&response_type=code&redirect_uri=http://localhost:5173/exchange_token&approval_prompt=force&scope=activity:read_all`}
        >
          <img id="connect-strava-button" src={stravaButtonLarge}></img>
          {/* Strava logos can appear near, but must be completely separate and apart from (and should not appear more prominently than) the name/logo of your application. */}
          <img id="strava-logo" src={stravaLogo}></img>
        </a>
      </div>
    </div>
  );
}

export default App;
