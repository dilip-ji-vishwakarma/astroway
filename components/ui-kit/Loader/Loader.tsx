"use client";
import React from "react";

export const Loader = () => {
  const bars = Array.from({ length: 12 });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="relative w-[54px] h-[54px]">
        {bars.map((_, i) => {
          const rotation = i * 30; // 12 bars = 360/12 = 30deg
          const delay = -1.2 + i * 0.1;

          return (
            <div
              key={i}
              className="absolute left-1/2 top-[30%] w-[8%] h-[24%] bg-gray-500 rounded-full shadow-md"
              style={{
                transform: `rotate(${rotation}deg) translate(0, -130%)`,
                animation: `fade 1s linear infinite`,
                animationDelay: `${delay}s`,
              }}
            ></div>
          );
        })}

        <style jsx>{`
          @keyframes fade {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0.25;
            }
          }
        `}</style>
      </div>
    </div>
  );
};
