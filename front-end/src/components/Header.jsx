import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <h1>The Run Club</h1>
      <p>
        Viewing data for{" "}
        <span id="athlete-name">
          {props.athlete.firstName} {props.athlete.lastName}
        </span>
      </p>
      <p>
        Want more?{" "}
        <a href="https://www.strava.com/athlete/training" target="_blank">
          View On Strava
        </a>
      </p>
    </div>
  );
};

export default Header;
