import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [athletes, setAthletes] = useState([]);
  // const [activities, setActivities] = useState([]);
  // const [loadingState, setLoadingState] = useState(false);

  const getAthletes = async () => {
    const response = await fetch("http://localhost:3000/");
    const data = await response.json();
    setAthletes(data.payload);
  };

  useEffect(() => {
    if (athletes.length === 0) {
      getAthletes();
    }
    return () => {};
  }, [athletes]);

  console.log(athletes);

  return (
    <>
      <h1>StravaJS2.0</h1>
      <p>{athletes.length >= 1 ? `${athletes[0].distance}` : "Loading..."}</p>
    </>
  );
}

export default App;
