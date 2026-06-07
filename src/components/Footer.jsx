import React from "react";
import { AnimatedLogo } from "./animated-logo";
import { footerContent } from "../mock/mock";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="w-32 md:w-40">
          <AnimatedLogo />
        </div>
        <p className="text-base md:text-lg leading-relaxed tracking-wide mt-2 max-w-3xl">
          {footerContent.tagline}
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-white/15 text-center text-sm tracking-[0.25em]">
        <p>{footerContent.credit}</p>
      </div>
      {footerContent.photoCredit && (
        <div className="max-w-4xl mx-auto mt-4 text-gray-400 text-center text-xs tracking-[0.3em] uppercase">
          <p>{footerContent.photoCredit}</p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
