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
          <p>{new Date(run.start_date).toLocaleDateString("en-uk")}</p>
          {/* <p>{run.location}</p> */}
          <p>{(run.distance / 1000).toFixed(2)}</p>
          <p>{(run.elapsed_time / 60).toFixed(2)}</p>
          <p>{(run.average_speed * 3.6).toFixed(2)}</p>
        </>
      ))}
    </div>
  );
};

export default Last5RunsTable;
