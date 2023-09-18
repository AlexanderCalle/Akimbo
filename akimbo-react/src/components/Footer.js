import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-between bg-akimbo-dark-900 text-akimbo-light p-5">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">CONTACT</h3>
        <div className="grid grid-cols-3">
          <h5 className="w-auto">EMAIL:</h5>
          <a className="col-span-2" href="mailto:callebautak@hotmail.com">
            callebautak@hotmail.com
          </a>
          <a
            className="col-start-2 col-span-2"
            href="mailto:kenis.eleonoor@gmail.com"
          >
            kenis.eleonoor@gmail.com
          </a>
        </div>
        <button className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <p>INSTAGRAM</p>
        </button>
      </div>
      <div className=" flex flex-col items-end lg:items-center place-content-center">
        <h2 className="font-bold text-2xl">AKIMBO</h2>
        <p>An ABC of Art, Books & Culture</p>
      </div>
      <div className="justify-items-end hidden lg:grid grid-cols-3 gap-2">
        <Link className="hover:underline" to="/">
          ARTICLES & ESSAYS
        </Link>
        <Link className="hover:underline" to="/">
          REVIEWS
        </Link>
        <Link className="hover:underline row-start-2 col-span-2" to="/">
          FEATURED // FURTHER READING
        </Link>
        <Link className="hover:underline" to="/">
          PODCAST
        </Link>
        <Link className="hover:underline" to="/aboutus">
          ABOUT US
        </Link>
      </div>
    </div>
  );
};

export default Footer;
