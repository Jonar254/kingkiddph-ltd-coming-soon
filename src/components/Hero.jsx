"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { AnimatedLogo } from "./animated-logo";
import { heroContent, heroImages } from "../mock/mock";

const Hero = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.35]);

  useEffect(() => {
    if (heroImages.length <= 1) return undefined;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleScrollToInquire = (event) => {
    event.preventDefault();
    const target = document.querySelector("#inquire");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-black text-white"
    >
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        {heroImages.map((src, index) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            initial={{ opacity: index === 0 ? 1 : 0 }}
            animate={{ opacity: activeIdx === index ? 1 : 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={src}
              alt="Kingkiddph cinematic storytelling"
              className="h-full w-full object-cover"
              initial={{ scale: index === 0 ? 1 : 1.08 }}
              animate={{ scale: activeIdx === index ? 1 : 1.08 }}
              transition={{ duration: 4.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ filter: "brightness(0.78)" }}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/45" />
          </motion.div>
        ))}
      </motion.div>

      <header className="absolute top-10 left-0 right-0 z-30 px-6">
        <div className="mx-auto flex max-w-6xl justify-center">
          <AnimatedLogo />
        </div>
      </header>

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
        <div className="relative w-full max-w-4xl">
          <div className="relative aspect-[16/9] w-full max-w-4xl mx-auto flex items-center justify-center">
            {[
              "absolute top-0 left-0 w-12 h-12 border-l border-t border-white/60",
              "absolute top-0 right-0 w-12 h-12 border-r border-t border-white/60",
              "absolute bottom-0 left-0 w-12 h-12 border-l border-b border-white/60",
              "absolute bottom-0 right-0 w-12 h-12 border-r border-b border-white/60",
            ].map((cls, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className={cls}
              />
            ))}

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
              <p className="eyebrow mb-6 text-sm uppercase tracking-[0.35em] text-white">
                {heroContent.eyebrow}
              </p>
              <h1 className="font-serif-display whitespace-pre-line text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
                <span className="font-black">{heroContent.title}</span>
              </h1>
              <div className="mt-10">
                <a
                  href="#inquire"
                  className="inline-flex items-center gap-3 rounded-none border border-white/40 bg-white/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white transition-all hover:border-white/70 hover:bg-white/20"
                  onClick={handleScrollToInquire}
                >
                  {heroContent.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.a
        href="#inquire"
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-white"
        aria-label="scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        onClick={handleScrollToInquire}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default Hero;
