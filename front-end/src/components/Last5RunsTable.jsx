import React from "react";
import "./last5RunsTable.css";

const Last5RunsTable = (props) => {
  return (
    <div className="last5-table">
      <h4>Date</h4>
      <h4>Location</h4>
      <h4>Distance</h4>
      <h4>Time</h4>
      <h4>Average Speed</h4>
      {props.data.map((run) => (
        <>
          <p>{run.date}</p>
          <p>{run.location}</p>
          <p>{run.distance}</p>
          <p>{run.time}</p>
          <p>{run.avgSpeed}</p>
        </>
      ))}
    </div>
  );
};

export default Last5RunsTable;
