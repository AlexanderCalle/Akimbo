import React from "react";
import MainLayout from "../layouts/MainLayout";
import ArticlesEssaysImage from "../assets/ArtlicesAndEssays.jpg";
import Tag from "../components/Tag";

const ArticlePage = () => {
  return (
    <MainLayout>
      <div className="w-full lg:w-10/12 mx-auto flex flex-col items-center gap-6">
        <img
          src={ArticlesEssaysImage}
          alt="article"
          className="w-full h-96 object-cover"
        />
        <h2 className="w-fit self-start bg-akimbo-light bg-opacity-80 backdrop-blur-sm text-3xl px-3 py-2 ml-6 lg:ml-16 -mt-12">
          Title
        </h2>
        <div className="w-5/6 md:w-4/6 -mt-5 md:-mt-10 flex flex-col gap-4">
          <Tag TagName={"Architecture"} Color={"Orange"} />
          <p className="text-sm font-light text-akimbo-dark-500">
            Aug 28, 2023, created by An-katrien Callebaut
          </p>
          <p className="">
            Donec dictum tristique porta. Etiam convallis lorem lobortis nulla
            molestie, nec tincidunt ex ullamcorper. Quisque ultrices lobortis
            elit sed euismod. Duis in ultrices dolor, ac rhoncus odio.
            Suspendisse tempor sollicitudin dui sed lacinia. Nulla quis enim
            posuere, congue libero quis, commodo purus. Cras iaculis massa ut
            elit tempor malesuada. Pellentesque dictum elit quis diam tristique,
            sed tincidunt velit ullamcorper. Suspendisse potenti. Nam varius
            varius erat. Aliquam pulvinar elit ut orci egestas tincidunt. Morbi
            ornare orci ante, mollis posuere lacus accumsan sit amet. Cras ut
            dignissim ipsum. Donec dictum tristique porta. Etiam convallis lorem
            lobortis nulla molestie, nec tincidunt ex ullamcorper. Quisque
            ultrices lobortis elit sed euismod. Duis in ultrices dolor, ac
            rhoncus odio. Suspendisse tempor sollicitudin dui sed lacinia.
            <br></br>
            <br></br>Nulla quis enim posuere, congue libero quis, commodo purus.
            Cras iaculis massa ut elit tempor malesuada. Pellentesque dictum
            elit quis diam tristique, sed tincidunt velit ullamcorper.
            Suspendisse potenti. Nam varius varius erat. Aliquam pulvinar elit
            ut orci egestas tincidunt. Morbi ornare orci ante, mollis posuere
            lacus accumsan sit amet. Cras ut dignissim ipsum. Donec dictum
            tristique porta. Etiam convallis lorem lobortis nulla molestie, nec
            tincidunt ex ullamcorper. Quisque ultrices lobortis elit sed
            euismod. Duis in ultrices dolor, ac rhoncus odio. Suspendisse tempor
            sollicitudin dui sed lacinia. Nulla quis enim posuere, congue libero
            quis, commodo purus. <br></br>
            <br></br>Cras iaculis massa ut elit tempor malesuada. Pellentesque
            dictum elit quis diam tristique, sed tincidunt velit ullamcorper.
            Suspendisse potenti. Nam varius varius erat. Aliquam pulvinar elit
            ut orci egestas tincidunt. Morbi ornare orci ante, mollis posuere
            lacus accumsan sit amet. Cras ut dignissim ipsum. Donec dictum
            tristique porta. Etiam convallis lorem lobortis nulla molestie, nec
            tincidunt ex ullamcorper. Quisque ultrices lobortis elit sed
            euismod. Duis in ultrices dolor, ac rhoncus odio. Suspendisse tempor
            sollicitudin dui sed lacinia. Nulla quis enim posuere, congue libero
            quis, commodo purus. Cras iaculis massa ut elit tempor malesuada.
            Pellentesque dictum elit quis diam tristique, sed tincidunt velit
            ullamcorper. Suspendisse potenti. Nam varius varius erat. Aliquam
            pulvinar elit ut orci egestas tincidunt. Morbi ornare orci ante,
            mollis posuere lacus accumsan sit amet. Cras ut dignissim ipsum.
          </p>

          <p className="text-tag-blue text-sm font-light">
            An-katrien Callebaut
            <br />A Master in Art History
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ArticlePage;
