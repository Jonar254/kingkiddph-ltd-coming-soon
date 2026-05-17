import React from "react";
import { AnimatedLogo } from "./animated-logo";
import { footerContent } from "../mock/mock";

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="w-48 md:w-60">
          <AnimatedLogo />
        </div>
        <p className="text-base md:text-lg leading-relaxed tracking-wide mt-2 max-w-3xl">
          From factory floors in China to finished rooms in Nairobi, Form & Finish is your material and fit-out partner, from concept to completion.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-white/20 text-center text-sm tracking-[0.25em] ">
        <p>&copy; 2026 Form & Finish | All rights reserved</p>
      </div>
      <div className="max-w-4xl mx-auto mt-8 p  text-gray-400 text-center text-sm tracking-[0.25em]">
        <p> Website designed by Jonathan M</p>
      </div>
    </footer>
  );
};

export default Footer;
