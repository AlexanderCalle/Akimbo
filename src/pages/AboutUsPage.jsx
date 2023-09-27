import React from "react";
import MainLayout from "../layouts/MainLayout";
import ArticlesEssaysImage from "../assets/ArtlicesAndEssays.jpg";

const AboutUsPage = () => {
  return (
    <MainLayout>
      <div className="w-10/12 mx-auto flex flex-col gap-14 items-center">
        <div className="w-full lg:w-3/6 flex flex-col items-center gap-5">
          <h2 className="text-2xl font-medium underline">What is Akimbo</h2>
          <p className="text-center">
            Aliquam a dui vel justo fringilla euismod id id enim. Nunc non
            semper tellus. Pellentesque vitae tellus non dui fermentum
            hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras dapibus
            orci eu eros tempus efficitur. Nulla rhoncus arcu nec dictum
            condimentum. Aenean sapien leo, maximus nec magna vel, gravida
            auctor quam. Cras congue massa massa, id luctus elit ultricies at.
            Maecenas in neque justo. Ut ac tincidunt lorem, non posuere metus.
            Sed vulputate pellentesque lectus, id luctus turpis interdum vel.
            Fusce aliquet condimentum arcu id elementum.
          </p>
        </div>
        <div className="w-full lg:w-8/12 flex flex-col items-center lg:items-start gap-5">
          <h2 className="text-2xl font-medium underline">Who are we</h2>
          <section className="w-full lg:h-60 flex flex-col lg:flex-row gap-5 items-center">
            <img
              src={ArticlesEssaysImage}
              alt="An-katrien Callebaut"
              className="h-full object-cover"
            />
            <div className="flex flex-col gap-3 items-center lg:items-start">
              <h3 className="text-lg">An-katrien Callebaut</h3>
              <p className="font-light text-center lg:text-start">
                Aliquam a dui vel justo fringilla euismod id id enim. Nunc non
                semper tellus. Pellentesque vitae tellus non dui fermentum
                hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras
                dapibus orci eu eros tempus efficitur.
              </p>
              <p>CONTACT: callebautak@hotmail.com</p>
            </div>
          </section>
          <section className="w-full lg:h-60 flex flex-col lg:flex-row-reverse gap-5 items-center">
            <img
              src={ArticlesEssaysImage}
              alt="Eleonoor Kenis"
              className="h-full object-cover"
            />
            <div className="flex flex-col gap-3 items-center lg:items-end">
              <h3 className="text-lg">Eleonoor Kenis</h3>
              <p className="font-light text-center lg:text-end">
                Aliquam a dui vel justo fringilla euismod id id enim. Nunc non
                semper tellus. Pellentesque vitae tellus non dui fermentum
                hendrerit. In vel imperdiet mi. Aliquam erat volutpat. Cras
                dapibus orci eu eros tempus efficitur.
              </p>
              <p>CONTACT: kenis.eleonoor@gmail.com</p>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUsPage;
