import React, { useEffect, useState } from "react";
import { GetUser } from "../services/Users";
import { logout } from "../services/Authentication";
import { Link } from "react-router-dom";

const DashboardNavbar = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
      setUserData(await GetUser());
    }
    fetchData();
  }, []);

  return (
    <div className="w-full flex justify-between items-center px-8 py-5">
      <h1 className="font-bold font-sans text-2xl">AKIMBO</h1>
      <section className="flex gap-4">
        <Link to={"/dashboard/overview"} className="hover:underline">
          Overview
        </Link>
        <Link to={"/dashboard/writing"} className="hover:underline">
          Writing
        </Link >
        <Link to={"/dashboard/dairy"} className="hover:underline">
          Dear Digital Dairy
        </Link>
        {userData.is_admin && (
          <>
            <Link className="hover:underline">Users</Link>
            <Link className="hover:underline">Aproval</Link>
          </>
        )}
      </section>
      <section className="flex gap-2 items-center">
        <p>
          {userData.firstname} {userData.lastname}
          {userData.is_admin && " (admin)"}
        </p>
        <button
          className="bg-akimbo-dark-900 text-akimbo-light px-2 py-1"
          onClick={logout}
        >
          sign out
        </button>
      </section>
    </div>
  );
};

export default DashboardNavbar;
