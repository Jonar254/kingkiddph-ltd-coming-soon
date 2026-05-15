import React from "react";
import { portfolio } from "../mock/mock";

const FeaturedWork = () => {
  return (
    <section id="portfolio" className="bg-cream py-24 md:py-32 px-6 md:px-12">
      <div className="text-center mb-14">
        <p className="eyebrow text-[#6b625b] mb-4">Featured Work</p>
        <h2 className="font-serif-display text-4xl md:text-5xl text-[#3d3935]">
          A glimpse into recent projects
        </h2>
      </div>

      <div className="max-w-[1500px] mx-auto grid grid-cols-12 gap-4 md:gap-6">
        {portfolio.map((p, i) => {
          const layouts = [
            "col-span-12 md:col-span-7 h-[400px] md:h-[560px]",
            "col-span-12 md:col-span-5 h-[400px] md:h-[560px]",
            "col-span-12 md:col-span-4 h-[300px] md:h-[420px]",
            "col-span-12 md:col-span-4 h-[300px] md:h-[420px]",
            "col-span-12 md:col-span-4 h-[300px] md:h-[420px]",
            "col-span-12 h-[420px] md:h-[600px]",
          ];
          return (
            <div key={i} className={`portfolio-card ${layouts[i]}`}>
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              <div className="portfolio-overlay">
                <p className="eyebrow text-[#f5f1ea]/80 mb-1">{p.category}</p>
                <h3 className="font-serif-display text-2xl md:text-3xl">{p.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedWork;
