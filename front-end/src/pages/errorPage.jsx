import React from "react";
import { useLocation } from "react-router-dom";
import "../pages/errorPage.css";

const ErrorPage = () => {
  const location = useLocation();
  return (
    <div className="error-content">
      <h2>Error!</h2>
      <p id="error-message">{location.state.message}</p>
      <a href="http://localhost:5173/">Go Home</a>
    </div>
  );
};

export default ErrorPage;
