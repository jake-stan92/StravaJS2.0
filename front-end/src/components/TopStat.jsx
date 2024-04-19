import React from "react";
import LoadingIcon from "./LoadingIcon";
import "./TopStat.css";

const TopStat = (props) => {
  return (
    <>
      {!props.loadingState ? (
        <div className="top-stat" id={props.id}>
          <div className="stat-icon">
            <img src={props.img}></img>
          </div>
          <div className="top-stat-content">
            <p className="stat-title">{props.title}</p>
            <p className="stat-figure">{props.figure}</p>
          </div>
        </div>
      ) : (
        <div className="top-stat-loading">
          <LoadingIcon />
        </div>
      )}
    </>
  );
};

export default TopStat;
