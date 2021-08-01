import React from "react";
import { useApi } from "./context/ApiContext";
import Food from "./Food";

const DashBoard = () => {
  const { data } = useApi();
  return (
    <div className="dashboard">
      <h3 className="header">Dashboard</h3>
      <Food data={data} />
    </div>
  );
};

export default DashBoard;
