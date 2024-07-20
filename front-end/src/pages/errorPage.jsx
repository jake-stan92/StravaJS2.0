import React from "react";
import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  return (
    <div>
      <p>Error Page</p>
      <p>{location.state.message}</p>
      <a href="http://localhost:5174/">Go Home</a>
    </div>
  );
};

export default ErrorPage;
