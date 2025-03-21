"use client";
import React from "react";
import { motion } from "framer-motion"; // ✅ Correct import

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
}: SpotlightProps = {}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {/* Left Spotlight */}
      <motion.div
        animate={{ x: [0, xOffset, 0] }}
        transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none"
      >
        {[gradientFirst, gradientSecond, gradientThird].map((gradient, index) => (
          <div
            key={index}
            style={{
              transform: `translateY(${translateY}px) rotate(-45deg)`,
              background: gradient,
              width: index === 0 ? `${width}px` : `${smallWidth}px`,
              height: `${height}px`,
            }}
            className={`absolute top-0 left-0 ${index === 0 ? "" : "origin-top-left"}`}
          />
        ))}
      </motion.div>

      {/* Right Spotlight */}
      <motion.div
        animate={{ x: [0, -xOffset, 0] }}
        transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        className="absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none"
      >
        {[gradientFirst, gradientSecond, gradientThird].map((gradient, index) => (
          <div
            key={index}
            style={{
              transform: `translateY(${translateY}px) rotate(45deg)`,
              background: gradient,
              width: index === 0 ? `${width}px` : `${smallWidth}px`,
              height: `${height}px`,
            }}
            className={`absolute top-0 right-0 ${index === 0 ? "" : "origin-top-right"}`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
