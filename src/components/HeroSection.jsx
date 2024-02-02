import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const HeroSection = () => {
  const targetRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: targetRef,
    offset: ["center end", "end center"]
  });

  const translate = useTransform(scrollYProgress, [0, 1], [200, 80]);
  const translateX = useTransform(scrollYProgress, [0, 1], [1350, -460]);

  const scale = useTransform(scrollYProgress, [0,1], [1.5, .35]);
  const opacity = useTransform(scrollYProgress, [0.9,1], [100,0]);
  
  return (
    <div className="w-full h-screen bg-hero-image bg-cover bg-center bg-no-repeat p-5 flex items-end justify-center" ref={targetRef}>
        <motion.h1 style={{
          translateX: translateX,
          translateY: translate,
          scale: scale,
          opacity: opacity          
        }} className="absolute top-[400px] left-[400px] text-7xl font-black">AKIMBO</motion.h1>
        <div className="mb-10 flex flex-col items-center gap-2">
          <p className="font-bold text-2xl">Discover</p>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight - 72, behavior: "smooth" })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
          <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
        </svg>
        </button>
        </div>
    </div>
  );
};

export default HeroSection;
