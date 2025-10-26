'use client'
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import AkimboLogo from "@assets/akimbo_logo.png";
import AkimboLogoMobile from "@assets/akimbo_logo_mobile.png";
import { useScreenDetector } from "@hooks/useScreenDetector";

const HeroSection = () => {
  const targetRef = useRef(null);
  
  // Default values that will work for SSR
  const [windowDimensions, setWindowDimensions] = useState({ width: 1200, height: 800 });
  
  useEffect(() => {
    // Update dimensions after component mounts (client-side only)
    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  const {scrollYProgress} = useScroll({
    target: targetRef,
    offset: ["center end", "end center"]
  });

  const { scrollY } = useScroll()

  const initialValue = windowDimensions.height/4
  const finalValue = 0

  const initValueX = windowDimensions.width;
  const finalValueX = -windowDimensions.width;

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
  const { isMobile } = useScreenDetector();
  const scale = useTransform(scrollYProgress, [0.2, 0.8], [(isMobile ? 3 : 1), .05]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [100,0]);
  const getHeroImage = () => {
    if (isMobile) {
      return AkimboLogoMobile.src;
    }
    return AkimboLogo.src;
  };

  return (
    <div className="flex justify-center items-end w-full h-screen bg-center bg-no-repeat bg-cover bg-hero-image" ref={targetRef}>
        <motion.img style={{
          x: translateX,
          y: translate,
          scale: scale,
          opacity: opacity          
        }} className="absolute top-0 w-full font-black" src={getHeroImage()} alt="The logo of Akimbo" />
        <div className="flex flex-col gap-2 items-center mb-10">
          <p className="font-sans text-2xl font-bold">discover</p>
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight - 72, behavior: "smooth" })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>

        </button>
        </div>
    </div>
  );
};

export default HeroSection;
