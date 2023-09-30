import React from "react";
import { logout } from "../services/Authentication";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <button onClick={logout}>sign out</button>
    </div>
  );
};

export default Dashboard;
