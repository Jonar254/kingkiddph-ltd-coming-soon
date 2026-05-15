import React from "react";
import { testimonial } from "../mock/mock";

const Testimonial = () => {
  return (
    <section className="relative h-[80vh] min-h-[520px] flex items-center justify-center overflow-hidden">
      <img
        src={testimonial.image}
        alt="Warm interior background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <p className="font-serif-display italic text-[#f5f1ea] text-3xl md:text-4xl lg:text-5xl leading-[1.3]">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <p className="eyebrow text-[#f5f1ea]/80 mt-10">— {testimonial.author}</p>
      </div>
    </section>
  );
};

export default Testimonial;
