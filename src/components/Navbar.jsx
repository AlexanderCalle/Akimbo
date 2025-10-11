import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/Navbar.css";
import AkimboLogo from "../assets/akimbo_logo.png";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row justify-between items-center p-5 w-full text-lg">
        <Link className="font hover:underline active:underline" to="/">
          <img className="object-cover max-h-10 font-sans text-2xl font-bold" src={AkimboLogo} alt="The logo of akimbo" />
        </Link>
        
        <div className="hidden gap-10 font-sans lg:flex lg:visible">
          <Link className="hover:underline active:underline" to="/">
            home
          </Link>
          <Link className="hover:underline active:underline" to="/articles/features">
            features
          </Link>
          <Link className="hover:underline active:underline" to="/articles/reviews">
            reviews
          </Link>
          <Link
            className="hover:underline active:underline"
            to="/diary"
          >
            dear digital diary
          </Link>
          <Link className="hover:underline active:underline" to="/aboutus">
            about us
          </Link>
        </div>
        <div className="flex gap-3">
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
            className="absolute top-0 right-0 px-5 py-5 cursor-pointer text-akimbo-dark-900"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="w-10 h-10 text-gray-600"
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
          <ul className="flex flex-col gap-5 items-end list-none justify-between min-h-[250px] text-akimbo-dark-900 text-lg font-sans">
            <li className="hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline">
              <Link to="/articles/features">Features</Link>
            </li>
            <li className="hover:underline">
              <Link to="/articles/reviews">Reviews</Link>
            </li>
            <li className="hover:underline">
              <Link to="/diary">Dear Digital Diary</Link>
            </li>
            <li className="hover:underline">
              <Link to="/aboutus">About us</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
