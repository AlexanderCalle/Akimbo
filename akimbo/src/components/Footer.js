import React from "react";

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
      </div>
      <div className=" flex flex-col items-center place-content-center">
        <h2 className="font-bold text-2xl">AKIMBO</h2>
        <p>An ABC of Art, Books & Culture</p>
      </div>
      <div className="justify-items-end grid grid-cols-3 gap-2">
        <a className="hover:underline" href="/">
          ARTICLES & ESSAYS
        </a>
        <a className="hover:underline" href="/">
          REVIEWS
        </a>
        <a className="hover:underline row-start-2 col-span-2" href="/">
          FEATURED // FURTHER READING
        </a>
        <a className="hover:underline" href="/">
          PODCAST
        </a>
        <a className="hover:underline" href="/">
          ABOUT US
        </a>
      </div>
    </div>
  );
};

export default Footer;
