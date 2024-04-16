import React from "react";
import "./last5RunsTable.css";
import LoadingIcon from "./LoadingIcon";

const Last5RunsTable = (props) => {
  let runNum = 0;
  return (
    <div className="last5-table">
      {!props.loadingState ? (
        <table>
          <caption>
            <h3>Last 5 runs</h3>
          </caption>
          <tbody>
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
            {props.data.map((run) => (
              <tr key={runNum++}>
                <td>{new Date(run.start_date).toLocaleDateString("en-uk")}</td>
                <td>{(run.distance / 1000).toFixed(2)}</td>
                <td>{(run.elapsed_time / 60).toFixed(2)}</td>
                <td>{(run.average_speed * 3.6).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <LoadingIcon />
      )}
    </div>
  );
};

export default Last5RunsTable;
