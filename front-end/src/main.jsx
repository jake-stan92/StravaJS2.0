import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import LoggedInHome from "../src/pages/loggedInHome.jsx";
import DisplayResults from "../src/pages/displayResult.jsx";
import ErrorPage from "./pages/errorPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="exchange_token" element={<LoggedInHome />} />
      <Route path="display_results" element={<DisplayResults />} />
      <Route path="error" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
  // {/* </React.StrictMode> */}
);
