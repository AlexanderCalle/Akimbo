import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { GetUsers } from "../services/Users";
import AboutProfile from "../components/AboutProfile";

const AboutUsPage = () => {

  const [users, setUsers] = useState([]);
  const [usersWildverband, setUsersWildVerband] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUsers().then(result => {

      const wildverband = result.filter(user => user.rol === "wildverband");
      console.log(wildverband);
      setUsersWildVerband(wildverband)

      setUsers(result.filter(user => user.rol !== "wildverband").sort((a, b) => a.rol === "editor-in-chief" ? -1 : 1))
      setLoading(false)
    })
  }, []);

  if (loading) {
    return (
      <div
        className="w-full md:w-10/12 my-20 flex flex-col items-center gap-2"
        role="status"
      >
        <svg
          aria-hidden="true"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-akimbo-dark-900"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="w-10/12 mx-auto flex flex-col gap-14 items-center my-24">
        <div className="w-full lg:w-3/6 flex flex-col items-center gap-5">
          <h2 className="text-2xl font-medium underline">What is Akimbo</h2>
          <p className="text-center">
          Akimbo is an online magazine and platform aiming to bring together <b>A</b>rt, <b>B</b>ooks, and <b>C</b>ulture.
          <br /><br />
          We are a small group of passionate readers, writers, critics, practitioners and artists based in Brussels who wanted to create an unpretentious, open space for young creatives to meet and exchange ideas. In the spirit of Virginia Woolf, we searched for <i>a room of one’s own</i> after the working hours. Pub talks, text chains, coffee breaks and unhinged dinner parties craved for a common place..
          Akimbo makes it possible to gather and publish texts and projects, making words and voices matter. We focus on contemporary complexities, riveting essays, aesthetic inspirations, the internal turmoil of 20-year-olds and other stories waiting to be told. 
          <br /><br />
          Akimbo is more than just an online publishing platform, it’s a vibrant community where <i>Art is theft, Art is armed robbery, Art is not pleasing your mother.</i> (Janet Malcolm)
          <br /><br />
          <h3 className="my-2 text-xl font-medium">Our Mission</h3> 
          Topics are always approached from various disciplines within the arts and cultural studies, and placed in both historical and contemporary perspectives. <br />
          <i>Lock up your libraries if you like; but there is no gate, no lock, no bolt that you can set upon the freedom of your mind. So long as you write what you wish to write, that is all that matters; and who cares whether it matters for ages or only for hours.</i> (Virginia Woolf)
          <br /><br />
          We are committed to opening up conversations on literature, contemporary art and popular culture, which should remain accessible to everybody regardless of their education and background. 
          <br /><br />
          Long live the unapologetic embrace of bad taste, grey zones, works in progress, web-weaving, and doodling. 
          <br /><br />
          Come in and take a seat. 
          </p>
        </div>
        <div className="w-full lg:10/12 2xl:w-9/12 flex flex-col items-center gap-5 mb-5 lg:items-stretch">
          <h2 className="text-2xl font-medium underline">Who are we</h2>
          {users.map((user, idx) => (
            <AboutProfile idx={idx} {...user} />
          ))} 
          {usersWildverband.map((user, idx) => (
            <AboutProfile idx={idx} {...user} />
          ))}
          <div className="w-full lg:w-4/6 mx-auto">
            <h3 className="text-lg font-bold">Wildverband</h3>
            <p>Wildverband is a modular and temporary collaboration between Leonie Overmeire and Anouk Meurice. Within this context, they explore the boundaries of architecture. The interplay arises from intuitive absurdities that they translate into spatial compositions. Their hunger for making is rooted in phenomenology and poetic thinking. Wildverband grew out of a love of brick and an aversion to regularity. Despite their background in architecture, they draw a lot of inspiration from performance and scenography.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutUsPage;
