import React from "react";
import { Link } from "react-router-dom";
import ArticlesEssaysImage from "../assets/ArtlicesAndEssays.jpg";

const Spotlight = () => {
  return (
    <div className="flex justify-between w-screen items-center h-[600px] gap-2">
      <button className="w-10 h-10 bg-akimbo-dark-900 text-akimbo-light p-2 rounded">
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="flex flex-col h-full gap-2 items-center flex-grow">
        <section className="h-full w-full flex items-center justify-center">
          <div className="flex flex-col p-5 w-2/5 items-end gap-3 -mr-20 z-10 bg-akimbo-light bg-opacity-80 backdrop-blur-sm">
            <h2 className="text-xl font-semibold">Page name</h2>
            <p className="text-end">
              Donec vitae mi vulputate, suscipit urna in, malesuada nisl.
              Pellentesque laoreet pretium nisl, et pulvinar massa eleifend sed.
              Curabitur maximus mollis diam, vel varius sapien suscipit eget.
              Cras sollicitudin ligula at volutpat ultrices. Nunc arcu enim,
              rhoncus eu maximus id, malesuada eu neque. Nunc aliquet cursus
              tortor id pellentesque. Quisque tempus arcu sed felis tempus, vel
              rutrum diam egestas. Suspendisse non magna nisi. Duis quis risus
              mi. Morbi velit leo, pellentesque nec odio sit amet, fringilla
              sollicitudin nulla. Sed consectetur eu leo sed sodales. Quisque
              porta, ante vitae auctor pellentesque, dolor neque vestibulum
              urna, sit amet consectetur ex lectus vel enim. Maecenas tellus
              erat, interdum vel tristique ac, rhoncus id ante.
            </p>
            <Link
              className="px-3 py-2 bg-akimbo-dark-900 text-akimbo-light rounded"
              to="/"
            >
              Go to page
            </Link>
          </div>
          <img
            className="w-6/10 h-full object-cover"
            src={ArticlesEssaysImage}
            alt="Image of page"
          />
        </section>
        <div className="flex gap-1">
          <div className="rounded-full w-3 h-3 border-akimbo-dark-900 border-solid border-2 bg-akimbo-dark-900"></div>
          <div className="rounded-full w-3 h-3 border-akimbo-dark-900 border-solid border-2"></div>
          <div className="rounded-full w-3 h-3 border-akimbo-dark-900 border-solid border-2"></div>
          <div className="rounded-full w-3 h-3 border-akimbo-dark-900 border-solid border-2"></div>
        </div>
      </div>
      <button className="w-10 h-10 bg-akimbo-dark-900 text-akimbo-light p-2 rounded">
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Spotlight;
