import React from "react";
import "./last5RunsTable.css";
import LoadingIcon from "./LoadingIcon";

const Last5RunsTable = (props) => {
  let activityNum = 0;
  return (
    <div className="last5-table bordered">
      {!props.loadingState ? (
        <table>
          <caption>
            <p className="subtitle">Last 5 {props.currentlyDisplaying}</p>
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
            {/* sliced here to limit output */}
            {props.activities.slice(0, 5).map((activity) => (
              <tr key={activityNum++}>
                <td>
                  {new Date(activity.start_date).toLocaleDateString("en-uk")}
                </td>
                <td>{(activity.distance / 1000).toFixed(2)}</td>
                <td>{(activity.elapsed_time / 60).toFixed(2)}</td>
                <td>{(activity.average_speed * 3.6).toFixed(2)}</td>
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
