import React from "react";
import { aboutSection } from "../mock/mock";

const About = () => {
  return (
    <section id="about" className="bg-stone py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-center">
        <div className="order-2 md:order-1">
          <p className="eyebrow text-[#6b625b] mb-4">{aboutSection.eyebrow}</p>
          <h2 className="font-serif-display text-5xl md:text-6xl lg:text-7xl text-[#3d3935] leading-[1.05] mb-8">
            {aboutSection.title}
          </h2>
          {aboutSection.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-[0.88rem] leading-[1.95] text-[#6b625b] tracking-wider mb-5 max-w-md"
            >
              {p}
            </p>
          ))}
          <p className="font-serif-display italic text-3xl text-[#3d3935] mt-6">
            — {aboutSection.signature}
          </p>
          <a href="#about" className="btn-line mt-8 inline-flex">
            {aboutSection.cta}
          </a>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={aboutSection.image}
            alt={aboutSection.title}
            className="w-full h-[520px] md:h-[640px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
