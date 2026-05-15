"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatedLogo } from "./animated-logo";
import { heroContent } from "../mock/mock";

const Hero = () => {
  const handleScrollToInquire = (event) => {
    event.preventDefault();
    const target = document.querySelector("#inquire");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 kenburns">
        <img
          src={heroContent.image}
          alt="Beautifully designed interior with mirror and warm tones"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40" />

      <header className="absolute top-10 left-0 right-0 z-20 px-6">
        <div className="max-w-6xl mx-auto flex justify-center">
          <AnimatedLogo />
        </div>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
        <p
          className="eyebrow text-[#f5f1ea]  mb-6"
          style={{ fontSize: "1rem" }}
        >
          {heroContent.eyebrow}
        </p>
        <h1 className="font-serif-display text-[#f5f1ea] text-5xl md:text-7xl lg:text-7xl leading-[1.05] max-w-5xl whitespace-pre-line">
          {heroContent.title}
        </h1>
        <a
          href="#inquire"
          className="btn-line btn-line-light mt-12"
          onClick={handleScrollToInquire}
        >
          {heroContent.cta}
        </a>
      </div>

      <a
        href="#intro"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[#f5f1ea] animate-bounce"
        aria-label="scroll down"
      >
        <ChevronDown size={28} strokeWidth={1.2} />
      </a>
    </section>
  );
};

export default Hero;
