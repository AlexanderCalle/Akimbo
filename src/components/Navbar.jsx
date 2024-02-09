import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Navbar.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div className="w-full flex flex-row justify-between p-5 items-center text-lg">
        <Link className="hover:underline active:underline" to="/">
          <h1 className="font-bold font-sans text-2xl">AKIMBO</h1>
        </Link>
        
        <div className="hidden lg:flex gap-4 lg:visible">
          <Link className="hover:underline active:underline" to="/">
            Home
          </Link>
          <Link className="hover:underline active:underline" to="/articles/Features">
            Features
          </Link>
          <Link className="hover:underline active:underline" to="/articles/Reviews">
            Reviews
          </Link>
          <Link
            className="hover:underline active:underline"
            to="/dairy"
          >
            Dear Digital Dairy
          </Link>
          {/* <Link className="hover:underline" to="/">
            PODCAST
          </Link> */}
          <Link className="hover:underline active:underline" to="/aboutus">
            About us
          </Link>
        </div>
        <div className="flex gap-3">
          {/* <button className="flex gap-2 items-center px-3 py-2 bg-akimbo-dark-900 text-akimbo-light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>SEARCH</p>
          </button> */}
          <button
            className="text-akimbo-dark-900 lg:hidden"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
          <div
            className="absolute top-0 right-0 px-5 py-5 text-akimbo-dark-900 cursor-pointer"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-10 w-10 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <ul className="flex flex-col items-center justify-between min-h-[250px] text-akimbo-dark-900 text-lg">
            <li className="my-8 hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li className="my-8 hover:underline">
              <Link to="/articles/Features">Features</Link>
            </li>
            <li className="my-8 hover:underline">
              <Link to="/articles/Reviews">Reviews</Link>
            </li>
            <li className="my-8 hover:underline">
              <Link to="/">Podcast</Link>
            </li>
            <li className="my-8 hover:underline">
              <Link to="/aboutus">About us</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
