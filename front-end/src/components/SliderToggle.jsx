import React from "react";
import "./SliderToggle.css";
import runningIcon from "../assets/images/running-man.svg";
import walkingIcon from "../assets/images/person-walking.svg";

const SliderToggle = ({ populateRuns, populateWalks, loadingState }) => {
  const handleToggle = (e) => {
    if (e.target.value === "on") {
      e.target.value = "off";
      populateWalks();
    } else if (e.target.value === "off") {
      e.target.value = "on";
      populateRuns();
    }
  };
  return (
    <>
      {!loadingState ? (
        <>
          <div className="slider-container">
            <img src={runningIcon} alt="running-icon" />
            <label className="switch" htmlFor="toggle-input">
              <input
                type="checkbox"
                onChange={handleToggle}
                id="toggle-input"
              />
              <span className="slider round"></span>
            </label>
            <img src={walkingIcon} alt="walking-icon" />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SliderToggle;
