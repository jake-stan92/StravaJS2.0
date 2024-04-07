import React from "react";
import "./last5RunsTable.css";

const Last5RunsTable = (props) => {
  return (
    <table className="last5-table">
      <tr>
        <th>Date</th>
        <th>
          Distance<br></br>(km)
        </th>
        <th>
          Time<br></br>(mins)
        </th>
        <th>
          Avg Speed<br></br>(km/h)
        </th>
      </tr>
      {/* <h5>Date</h5> */}
      {/* <h5>Location</h5> */}
      {/* <h5>
        Distance<br></br>(km)
      </h5>
      <h5>
        Time<br></br>(mins)
      </h5>
      <h5>
        Avg Speed<br></br>(km/h)
      </h5> */}
      {props.data.map((run) => (
        <tr>
          <td>{new Date(run.start_date).toLocaleDateString("en-uk")}</td>
          <td>{(run.distance / 1000).toFixed(2)}</td>
          <td>{(run.elapsed_time / 60).toFixed(2)}</td>
          <td>{(run.average_speed * 3.6).toFixed(2)}</td>
        </tr>
      ))}
    </table>
  );
};

export default Last5RunsTable;
