import React from "react";

export const Navbar = () => {
  return (
    <div className=" flex flex-row justify-between p-5 items-center text-lg">
      <h1 className="font-bold font-sans text-2xl">AKIMBO</h1>
      <div className="flex gap-4">
        <a className="hover:underline" href="/">
          HOME
        </a>
        <a className="hover:underline" href="/">
          ARTICLES & ESSAYS
        </a>
        <a className="hover:underline" href="/">
          REVIEWS
        </a>
        <a className="hover:underline" href="/">
          FEATURED // FURTHER READING
        </a>
        <a className="hover:underline" href="/">
          PODCAST
        </a>
        <a className="hover:underline" href="/">
          ABOUT US
        </a>
      </div>
      <button className="flex gap-2 items-center p-3 bg-akimbo-dark-900 text-akimbo-light rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p>SEARCH</p>
      </button>
    </div>
  );
};
