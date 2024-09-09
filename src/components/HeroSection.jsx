import React, { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { getEnv } from "../utils/getEnv";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const HeroSection = () => {
  const targetRef = useRef(null);
  const {scrollYProgress} = useScroll({
    target: targetRef,
    offset: ["center end", "end center"]
  });

  const { scrollY } = useScroll()

  const initialValue = getWindowDimensions().height/4
  const finalValue = 0

  const initValueX = getWindowDimensions().width;
  const finalValueX = -getWindowDimensions().width;

  const speed = 1
  const scrollDistance = (initialValue - finalValue) / speed

  const startY = 0 // scroll position when transition starts
  const endY = startY + scrollDistance

  const startX = 0;
  const endX = 1;

  const translate = useTransform(
    scrollY,
    [startY, endY, endY],
    [initialValue, finalValue, finalValue],
    {
        clamp: false,
    }
  )

  const translateX = useTransform(
    scrollYProgress,
    [startX, endX, endX],
    [initValueX, finalValueX, finalValueX],
    {
        clamp: false,
    }
  )
  const scale = useTransform(scrollYProgress, [0.2, .8], [1, .05]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [100,0]);

  return (
    <div className="w-full h-screen bg-[#418413] bg-cover bg-center bg-no-repeat flex items-end justify-center" ref={targetRef}>
        <motion.h1 style={{
          x: translateX,
          y: translate,
          scale: scale,
          opacity: opacity          
        }} className="absolute top-28 text-[200px] font-black">AKIMBO</motion.h1>
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
