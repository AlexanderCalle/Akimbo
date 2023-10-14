import React from "react";
import { Link } from "react-router-dom";
import { Carousel, ThemeProvider } from "@material-tailwind/react";
import ArticlesEssaysImage from "../assets/ArtlicesAndEssays.jpg";

const pageDescriptions = [
  {
    PageName: "Articles & Essays",
    Description:
      "On this page you can find all blog posts about articles we have written. \nThis can contain all kinds of topics.",
    LinkToPage: "/articles/Articles & essays",
    ImageUrl: ArticlesEssaysImage,
  },
  {
    PageName: "Reviews",
    Description:
      "On this page we post reviews of musea, books and so on.\nWe want to share our expercience of everything we do.",
    LinkToPage: "/articles/Reviews",
    ImageUrl: ArticlesEssaysImage,
  },
  {
    PageName: "Featured // Further reading",
    Description:
      "On this page you can find posts about what we are reading, ...\nIt is to give you some great recommendations.",
    LinkToPage: "/articles/Featured %2F%2F Further reading",
    ImageUrl: ArticlesEssaysImage,
  },
  // {
  //   PageName: "Podcast",
  //   Description:
  //     "This is the link to our podcast.\nWe discuss here all kind of topics that pop into our head.",
  //   LinkToPage: "/podcast",
  //   ImageUrl: ArticlesEssaysImage,
  // },
];

const theme = {
  carousel: {
    defaultProps: {
      prevArrow: ({ loop, handlePrev, firstIndex }) => {
        return (
          <button
            onClick={handlePrev}
            disabled={!loop && firstIndex}
            className="!absolute z-20 top-2/4 left-4 -translate-y-2/4 select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[48px] h-10 max-h-[48px] text-akimbo-light bg-akimbo-dark-900 grid place-items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        );
      },
      nextArrow: ({ loop, handleNext, lastIndex }) => (
        <button
          onClick={handleNext}
          disabled={!loop && lastIndex}
          className="!absolute z-20 top-2/4 right-4 -translate-y-2/4 select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[48px] h-10 max-h-[48px] text-akimbo-light bg-akimbo-dark-900 grid place-items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      ),
      navigation: ({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i
                  ? "w-8 bg-akimbo-dark-900"
                  : "w-4 bg-akimbo-dark-900/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      ),
      autoplay: true,
      autoplayDelay: 6000,
      transition: {
        type: "tween",
        duration: 1,
      },
      loop: true,
      className: "",
    },
    styles: {
      base: {
        carousel: {
          position: "relative",
          width: "w-full",
          height: "h-max-[600px] lg:h-[500px]",
          overflowX: "overflow-x-hidden",
          display: "flex",
        },

        slide: {
          width: "w-full",
          height: "h-full",
          display: "inline-block",
          flex: "flex-none",
        },
      },
    },
  },
};

const Spotlight = () => {
  return (
    <ThemeProvider value={theme}>
      <Carousel className="py-8 w-full sm:w-10/12 m-auto ">
        {pageDescriptions.map((item) => (
          <section className="relative w-full h-full flex flex-col-reverse 2xl:flex-row items-center justify-center px-20">
            <div className="flex flex-col p-5 w-full sm:w-4/5 items-center lg:items-end gap-3">
              <h2 className="text-xl font-semibold">{item.PageName}</h2>
              <p className="text-center lg:text-end">{item.Description}</p>
              <Link
                className="px-3 py-2 bg-akimbo-dark-900 text-akimbo-light"
                to={item.LinkToPage}
              >
                Go to page
              </Link>
            </div>
            <img
              className="w-full h-full 2xl:w-6/10 object-cover"
              src={item.ImageUrl}
              alt="page"
            />
          </section>
        ))}
      </Carousel>
    </ThemeProvider>
  );
};

export default Spotlight;
