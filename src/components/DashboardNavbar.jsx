import React, { useEffect, useState } from "react";
import { GetUser } from "../services/Users";
import { logout } from "../services/Authentication";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HiCog6Tooth } from "react-icons/hi2";

const DashboardNavbar = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchData() {
      GetUser().then(result => {

        if(result) {
          setUserData(result);
        }
        else {
          toast.error('No user found')
        }

      }).catch(err => {
        toast.error(`Something went wrong while fetching user data`)
      })
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
        <Link to={"/dashboard/articles"}>
          Articles
        </Link>
        {/* <Link to={"/dashboard/writing"} className="hover:underline">
          Writing
        </Link > */}
        <Link to={"/dashboard/diary"} className="hover:underline">
          Dear Digital Dairy
        </Link>
        <Link to={"/dashboard/cta"}>
          CTA
        </Link>
        {userData.is_admin && (
          <>
            <Link to={"/dashboard/users"} className="hover:underline">Users</Link>
          </>
        )}
      </section>
      <section className="flex gap-2 items-center">
        <Link className="hover:underline" to={`/dashboard/users/update/${userData.id}`}>
          {userData.firstname} {userData.lastname}
          {userData.is_admin && " (admin)"}
        </Link>
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
