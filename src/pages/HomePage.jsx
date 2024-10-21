import React from "react";
import RecentPosts from "../components/Articles/RecentPosts";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CtaPosts from "../components/CTA/CtaPosts";

const HomePage = () => {
  
  return (
    <div className="max-w-screen flex flex-col min-h-screen text-akimbo-dark-900">
      <div 
      className="fixed z-20 top-0 h-fit w-full bg-akimbo-light bg-opacity-80">
        <Navbar />
      </div>
      <HeroSection />
      <main className="flex-grow flex flex-col p-5" >
        <CtaPosts />
        <RecentPosts />
        <div className="w-full md:w-10/12 m-auto flex flex-col lg:flex-row items-start lg:items-start justify-start gap-6 my-4">
          <section className="w-full lg:w-3/6 flex flex-col items-start">
            <h2 className="text-2xl font-medium mb-4">community</h2>
            <p className="mb-2 lg:text-start">
              Akimbo is more than just an online publishing platform, it’s a vibrant community. Passionate readers, writers, critics, practitioners and artists, mostly based in Brussels, wanted to create an unpretentious, open space for young creatives to meet and exchange ideas.
            </p>
            <h3 className="mb-2 text-lg font-medium">want to join?</h3>
            <p className="mb-2 lg:text-start">
              We would love to meet other young, like-minded writers or practitioners.
              Send us an email with your idea or even a simple introduction. Hope to hear from you!
            </p>
            <a className="bg-akimbo-dark-900 font-sans px-3 py-2 text-akimbo-light" href="mailto:akimbo-mag@outlook.com">
              contact us
            </a>
          </section>
          <section className="w-full lg:w-3/6 flex flex-col items-start">
            <h2 className="text-2xl font-medium mb-4">about akimbo</h2>
            <p>
              Akimbo is an online magazine and platform aiming to bring together <b>A</b>rt, <b>B</b>ooks, and <b>C</b>ulture.
              We focus on contemporary complexities, riveting essays, aesthetic inspirations, the internal turmoil of 20-year-olds and other stories waiting to be told.
            </p>
            <h3 className="my-2 text-lg font-medium">our mission</h3>
            <p>
              Through an interdisciplinary and transhistorical approach we are committed to open up conversations on literature, contemporary art and popular culture, which should remain accessible to everybody regardless of their education and background. 
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
