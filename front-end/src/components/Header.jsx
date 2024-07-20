import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <h1>StravaJS</h1>
      <p>
        Viewing data for {props.athlete.firstName} {props.athlete.lastName}
      </p>
    </div>
  );
};

export default Header;
