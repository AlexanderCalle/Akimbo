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

  const scale = useTransform(scrollYProgress, [0,1], [1.5, .05]);
  const opacity = useTransform(scrollYProgress, [0.9,1], [100,0]);
  
  return (
    <div className="w-full h-screen bg-hero-image bg-cover bg-center bg-no-repeat p-5 flex items-end justify-center" ref={targetRef}>
        <motion.h1 style={{
          translateX: translateX,
          translateY: translate,
          scale: scale,
          opacity: opacity          
        }} className="absolute top-[200px] left-[180px] text-[200px] font-black">AKIMBO</motion.h1>
        <div className="mb-10 flex flex-col items-center gap-2">
          <p className="font-bold text-2xl">Discover</p>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight - 72, behavior: "smooth" })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>

        </button>
        </div>
    </div>
  );
};

export default HeroSection;
