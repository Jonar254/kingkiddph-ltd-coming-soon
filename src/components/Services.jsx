import React from "react";
import { services } from "../mock/mock";

const Services = () => {
  return (
    <section id="services" className="bg-stone py-24 md:py-32 px-6 md:px-12">
      <div className="text-center mb-16">
        <p className="eyebrow text-[#6b625b]">Our Services</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {services.map((service, idx) => (
          <div key={idx} className="text-center group">
            <div className="overflow-hidden mb-10">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-[420px] object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            <h3 className="font-serif-display text-3xl md:text-[2.6rem] text-[#3d3935] mb-6 leading-tight">
              {service.title}
            </h3>
            <p className="text-[0.85rem] leading-[1.95] text-[#6b625b] tracking-wider max-w-md mx-auto mb-8">
              {service.description}
            </p>
            <a href="#inquire" className="btn-line">
              {service.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="text-center mt-20">
        <a href="#inquire" className="btn-line">
          Let&apos;s Work Together
        </a>
      </div>
    </section>
  );
};

export default Services;
