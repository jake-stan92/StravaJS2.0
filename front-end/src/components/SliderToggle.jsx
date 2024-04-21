import React from "react";
import "./SliderToggle.css";

const SliderToggle = ({ populateRuns, populateWalks }) => {
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
    <div className="slider-container">
      <label className="switch">
        <input type="checkbox" onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default SliderToggle;
