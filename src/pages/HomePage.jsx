import React from "react";
import RecentPosts from "../components/RecentPosts";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomePage = () => {
  
  return (
    <div className="max-w-screen flex flex-col min-h-screen text-akimbo-dark-900">
      <div 
      className="fixed z-20 top-0 h-fit w-full bg-akimbo-light bg-opacity-80">
        <Navbar />
      </div>
      <HeroSection />
      <main className="flex-grow flex flex-col p-5" >
        <RecentPosts />
        <div className="w-full md:w-10/12 m-auto flex flex-col lg:flex-row items-center gap-6 my-4">
          <section className="w-full lg:w-3/6 flex flex-col items-center lg:items-start">
            <h2 className="text-2xl font-medium underline mb-4">Community</h2>
            <h3 className="mb-2 text-xl font-medium">Do you want to join?</h3>
            <p className="mb-2 text-center lg:text-start">
              Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
              molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
              elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
              Suspendisse tempor sollicitudin dui sed lacinia. Nulla quis enim
              posuere, congue libero quis, commodo purus. Cras iaculis massa ut
              elit tempor malesuada.
            </p>
            <button className="bg-akimbo-dark-900 px-3 py-2 text-akimbo-light">
              Contact us
            </button>
          </section>
          <section className="w-full lg:w-3/6 flex flex-col items-center lg:items-start">
            <h2 className="text-2xl font-medium underline mb-4">Over Akimbo</h2>
            <h3 className="mb-2 text-xl font-medium">What is our idea</h3>
            <p className="text-center lg:text-start">
              Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
              molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
              elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
              Suspendisse tempor sollicitudin dui sed lacinia.
            </p>
            <h3 className="my-2 text-xl font-medium">What can you find here</h3>
            <p className="text-center lg:text-start">
              Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
              molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
              elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
              Suspendisse tempor sollicitudin dui sed lacinia.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
