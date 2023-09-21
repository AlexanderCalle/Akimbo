import React from "react";
import MainLayout from "../layouts/MainLayout";
import Spotlight from "../components/Spotlight";
import RecentPosts from "../components/RecentPosts";

const HomePage = () => {
  return (
    <MainLayout>
      <Spotlight />
      <RecentPosts />
      <div className="w-10/12 m-auto flex gap-6 my-4">
        <section className="w-3/6">
          <h2 className="text-2xl font-medium underline mb-4">Podcast</h2>
          <h3 className="mb-2 text-xl font-medium">
            What is our podcast about
          </h3>
          <p>
            Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
            molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
            elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
            Suspendisse tempor sollicitudin dui sed lacinia. Nulla quis enim
            posuere, congue libero quis, commodo purus. Cras iaculis massa ut
            elit tempor malesuada. Pellentesque dictum elit quis diam tristique,
            sed tincidunt velit ullamcorper. Suspendisse potenti. Nam varius
            varius erat. Aliquam pulvinar elit ut orci egestas tincidunt. Morbi
            ornare orci ante, mollis posuere lacus accumsan sit amet. Cras ut
            dignissim ipsum.
          </p>
        </section>
        <section className="w-3/6">
          <h2 className="text-2xl font-medium underline mb-4">Over Akimbo</h2>
          <h3 className="mb-2 text-xl font-medium">What is our idea</h3>
          <p>
            Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
            molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
            elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
            Suspendisse tempor sollicitudin dui sed lacinia.
          </p>
          <h3 className="my-2 text-xl font-medium">What can you find here</h3>
          <p>
            Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
            molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
            elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
            Suspendisse tempor sollicitudin dui sed lacinia.
          </p>
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;
