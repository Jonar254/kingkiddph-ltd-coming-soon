import React from "react";
import { processSteps } from "../mock/mock";

const Process = () => {
  return (
    <section className="bg-cream py-24 md:py-32 px-6 md:px-12">
      <div className="text-center mb-16">
        <p className="eyebrow text-[#6b625b] mb-3">The Process</p>
        <h2 className="font-serif-display text-4xl md:text-5xl text-[#3d3935]">
          A thoughtful path to your finished home
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
        {processSteps.map((step) => (
          <div key={step.number} className="text-center px-4">
            <p className="font-serif-display italic text-[#a89c8e] text-3xl mb-4">
              {step.number}
            </p>
            <h3 className="font-serif-display text-3xl md:text-[2rem] text-[#3d3935] mb-5">
              {step.title}
            </h3>
            <p className="text-[0.85rem] leading-[1.95] text-[#6b625b] tracking-wider max-w-sm mx-auto">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Process;
