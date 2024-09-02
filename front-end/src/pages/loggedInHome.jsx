import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// does the reRouting to display results page
const LoggedInHome = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/display_results", {
      state: { code: params.code, scope: params.scope },
    });

    return () => {};
  }, []);
  return <></>;
};

export default LoggedInHome;
