import React from "react";
import { featuredIn } from "../mock/mock";

const FeaturedIn = () => {
  // duplicate for seamless loop
  const items = [...featuredIn, ...featuredIn];
  return (
    <section className="bg-cream py-20 px-6 md:px-12 border-t border-[#d8d0c4]">
      <p className="eyebrow text-center text-[#6b625b] mb-10">Featured In</p>
      <div className="overflow-hidden no-scrollbar">
        <div className="marquee-track">
          {items.map((name, i) => (
            <span
              key={i}
              className="font-serif-display italic text-2xl md:text-3xl text-[#6b625b] whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
