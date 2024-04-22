import React from "react";
import { useState } from "react";
import "./SliderToggle.css";
import runningIcon from "../assets/images/running-man.svg";
import walkingIcon from "../assets/images/person-walking.svg";

const SliderToggle = ({ populateRuns, populateWalks, loadingState }) => {
  const [runActive, setRunActive] = useState(true);
  const [walkActive, setWalkActive] = useState(false);
  const handleToggle = (e) => {
    if (e.target.value === "on") {
      e.target.value = "off";
      populateWalks();
      setRunActive(false);
      setWalkActive(true);
    } else if (e.target.value === "off") {
      e.target.value = "on";
      populateRuns();
      setRunActive(true);
      setWalkActive(false);
    }
  };
  return (
    <>
      {!loadingState ? (
        <>
          <div className="slider-container">
            <img
              className={runActive ? "active" : ""}
              src={runningIcon}
              alt="running-icon"
            />
            <label className="switch" htmlFor="toggle-input">
              <input
                type="checkbox"
                onChange={handleToggle}
                id="toggle-input"
              />
              <span className="slider round"></span>
            </label>
            <img
              className={walkActive ? "active" : ""}
              src={walkingIcon}
              alt="walking-icon"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SliderToggle;
