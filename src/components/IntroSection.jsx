import React from "react";
import { introSection } from "../mock/mock";

const IntroSection = () => {
  return (
    <section id="intro" className="bg-cream py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6 items-center">
        <div className="col-span-12 md:col-span-3 hidden md:block">
          <img
            src={introSection.imageLeft}
            alt="Living room with neutral tones"
            className="w-full h-[340px] object-cover"
          />
        </div>

        <div className="col-span-12 md:col-span-6 text-center px-2">
          <div className="divider-arc mb-8" />
          <h2 className="font-serif-display text-4xl md:text-[2.7rem] lg:text-[3rem] leading-[1.15] text-[#3d3935] whitespace-pre-line">
            {introSection.smallTitle}
          </h2>
          <p className="mt-8 text-[0.85rem] md:text-[0.9rem] leading-[1.95] text-[#6b625b] tracking-wider max-w-xl mx-auto">
            {introSection.body}
          </p>
          <a href="#services" className="btn-line mt-10">
            {introSection.cta}
          </a>
        </div>

        <div className="col-span-12 md:col-span-3 hidden md:block">
          <img
            src={introSection.imageRight}
            alt="Bright modern living space"
            className="w-full h-[260px] object-cover mt-24"
          />
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
