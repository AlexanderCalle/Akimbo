import React from "react";
import AkimboLogo from "../assets/akimbo_logo.png";
import { FaSpotify } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col gap-4 justify-start items-start p-5 max-w-full font-sans text-sm md:items-center md:justify-between md:grid md:grid-cols-3 bg-akimbo-dark-900 text-akimbo-light">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-bold">CONTACT</h3>
        <div className="flex flex-col gap-2 items-start md:flex-row">
          <div className="flex flex-col">
            <a className="col-span-2" href="mailto:akimbo-mag@outlook.com">
              akimbo-mag@outlook.com
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start place-content-center md:items-center">
        <img className="object-cover max-h-14 text-2xl font-bold" src={AkimboLogo} alt="The logo of akimbo" />
      </div>
      <div className="flex flex-col gap-3 justify-self-end">
        <a
          href="https://www.instagram.com/akimbo.mag?igsh=MTAwMXB1NnY2Mzk1bA==" target="_blank" rel="noreferrer">
          <button className="flex gap-2 items-center group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <p className="group-hover:underline">INSTAGRAM</p>
          </button>
        </a>
        <a href="https://open.spotify.com/user/31bdvnddxa7nl7t23au2rhqn4jmm?si=1L6u6ozHS3iloBfX120TfA&nd=1&dlsi=c2176aea6a974eda" target="_blank" rel="noreferrer">
          <button className="flex gap-2 items-center group">
            <FaSpotify className="w-5 h-5" />
            <p className="group-hover:underline">SPOTIFY</p>
          </button>
        </a>
        <p className="text-xs">Website by Alexander Callebaut</p>
      </div>
    </div>
  );
};

export default Footer;
