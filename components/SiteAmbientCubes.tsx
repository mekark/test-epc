"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

type CubeConfig = {
  className: string;
  size: number;
  top: string;
  left?: string;
  right?: string;
  duration: string;
  floatDuration: string;
  floatDistance: string;
  delay: string;
  rotation: string;
  opacity: number;
  tone: "steel" | "accent" | "ghost";
  reverse?: boolean;
};

const CUBES = [
  {
    className: "hidden md:block",
    size: 154,
    top: "8%",
    left: "2.5%",
    duration: "26s",
    floatDuration: "14s",
    floatDistance: "-18px",
    delay: "-5s",
    rotation: "8deg",
    opacity: 0.62,
    tone: "steel",
  },
  {
    className: "hidden md:block",
    size: 104,
    top: "12%",
    right: "5%",
    duration: "20s",
    floatDuration: "11s",
    floatDistance: "14px",
    delay: "-8s",
    rotation: "-12deg",
    opacity: 0.74,
    tone: "accent",
    reverse: true,
  },
  {
    className: "hidden lg:block",
    size: 118,
    top: "24%",
    left: "7%",
    duration: "24s",
    floatDuration: "15s",
    floatDistance: "-12px",
    delay: "-10s",
    rotation: "14deg",
    opacity: 0.58,
    tone: "ghost",
  },
  {
    className: "hidden xl:block",
    size: 94,
    top: "28%",
    right: "10%",
    duration: "18s",
    floatDuration: "10s",
    floatDistance: "10px",
    delay: "-6s",
    rotation: "-6deg",
    opacity: 0.7,
    tone: "accent",
  },
  {
    className: "hidden md:block",
    size: 138,
    top: "42%",
    left: "1.75%",
    duration: "28s",
    floatDuration: "16s",
    floatDistance: "16px",
    delay: "-14s",
    rotation: "10deg",
    opacity: 0.56,
    tone: "steel",
    reverse: true,
  },
  {
    className: "hidden md:block",
    size: 86,
    top: "38%",
    right: "3.5%",
    duration: "16s",
    floatDuration: "9s",
    floatDistance: "-10px",
    delay: "-3s",
    rotation: "-8deg",
    opacity: 0.76,
    tone: "accent",
    reverse: true,
  },
  {
    className: "hidden lg:block",
    size: 114,
    top: "54%",
    left: "10.5%",
    duration: "23s",
    floatDuration: "14s",
    floatDistance: "-14px",
    delay: "-12s",
    rotation: "12deg",
    opacity: 0.64,
    tone: "ghost",
  },
  {
    className: "hidden md:block",
    size: 146,
    top: "58%",
    right: "7.5%",
    duration: "30s",
    floatDuration: "17s",
    floatDistance: "18px",
    delay: "-7s",
    rotation: "-10deg",
    opacity: 0.6,
    tone: "steel",
  },
  {
    className: "hidden lg:block",
    size: 76,
    top: "66%",
    left: "4.5%",
    duration: "14s",
    floatDuration: "8s",
    floatDistance: "8px",
    delay: "-4s",
    rotation: "5deg",
    opacity: 0.82,
    tone: "accent",
  },
  {
    className: "hidden md:block",
    size: 98,
    top: "74%",
    right: "13%",
    duration: "22s",
    floatDuration: "12s",
    floatDistance: "-12px",
    delay: "-11s",
    rotation: "-14deg",
    opacity: 0.68,
    tone: "ghost",
    reverse: true,
  },
  {
    className: "hidden lg:block",
    size: 132,
    top: "82%",
    left: "6%",
    duration: "27s",
    floatDuration: "18s",
    floatDistance: "15px",
    delay: "-13s",
    rotation: "9deg",
    opacity: 0.58,
    tone: "steel",
  },
  {
    className: "hidden md:block",
    size: 88,
    top: "86%",
    right: "4%",
    duration: "17s",
    floatDuration: "10s",
    floatDistance: "-9px",
    delay: "-9s",
    rotation: "-7deg",
    opacity: 0.76,
    tone: "accent",
  },
  {
    className: "block md:hidden",
    size: 66,
    top: "16%",
    left: "3%",
    duration: "16s",
    floatDuration: "10s",
    floatDistance: "-10px",
    delay: "-6s",
    rotation: "8deg",
    opacity: 0.72,
    tone: "accent",
  },
  {
    className: "block md:hidden",
    size: 82,
    top: "42%",
    right: "3%",
    duration: "20s",
    floatDuration: "12s",
    floatDistance: "12px",
    delay: "-9s",
    rotation: "-8deg",
    opacity: 0.62,
    tone: "steel",
    reverse: true,
  },
  {
    className: "block md:hidden",
    size: 72,
    top: "77%",
    left: "4%",
    duration: "18s",
    floatDuration: "11s",
    floatDistance: "-8px",
    delay: "-12s",
    rotation: "6deg",
    opacity: 0.74,
    tone: "ghost",
  },
] as const satisfies readonly CubeConfig[];

function getCubeStyle(cube: CubeConfig): CSSProperties {
  return {
    width: cube.size,
    height: cube.size,
    top: cube.top,
    left: cube.left,
    right: cube.right,
    opacity: cube.opacity,
    ["--cube-duration" as string]: cube.duration,
    ["--cube-float-duration" as string]: cube.floatDuration,
    ["--cube-float-distance" as string]: cube.floatDistance,
    ["--cube-delay" as string]: cube.delay,
    ["--cube-rotate-start" as string]: cube.rotation,
  };
}

export default function SiteAmbientCubes() {
  const [showCubes, setShowCubes] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setShowCubes(window.scrollY > window.innerHeight * 0.78);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[6] overflow-hidden transition-opacity duration-500 ${
        showCubes ? "opacity-100" : "opacity-0"
      }`}
    >
      {CUBES.map((cube, index) => (
        <div
          key={`${cube.tone}-${index}`}
          style={getCubeStyle(cube)}
          className={`ambient-cube-wrap ${"reverse" in cube && cube.reverse ? "ambient-cube-wrap--reverse" : ""} ${cube.className}`}
        >
          <div className={`ambient-cube ambient-cube--${cube.tone}`}>
            <span className="ambient-cube__inner" />
            <span className="ambient-cube__core" />
            <span className="ambient-cube__accent-bar ambient-cube__accent-bar--x" />
            <span className="ambient-cube__accent-bar ambient-cube__accent-bar--y" />
          </div>
        </div>
      ))}
    </div>
  );
}
