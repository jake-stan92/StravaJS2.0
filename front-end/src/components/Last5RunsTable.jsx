import React from "react";
import "./last5RunsTable.css";

const Last5RunsTable = (props) => {
  return (
    <div className="last5-table">
      <h5>Date</h5>
      {/* <h5>Location</h5> */}
      <h5>
        Distance<br></br>(km)
      </h5>
      <h5>
        Time<br></br>(mins)
      </h5>
      <h5>
        Avg Speed<br></br>(km/h)
      </h5>
      {props.data.map((run) => (
        <>
          <p>{run.date}</p>
          {/* <p>{run.location}</p> */}
          <p>{run.distance}</p>
          <p>{run.time}</p>
          <p>{run.avgSpeed}</p>
        </>
      ))}
    </div>
  );
};

export default Last5RunsTable;
