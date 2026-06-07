"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../mock/mock";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          scrolled ? "bg-[#f5f1ea]/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-8 md:px-12 py-6">
          <a
            href="#home"
            className={`font-serif-display text-xl md:text-2xl tracking-[0.18em] transition-opacity duration-500 ${
              scrolled ? "opacity-100" : "opacity-0 md:opacity-100"
            }`}
            style={{ color: scrolled ? "#3d3935" : "#f5f1ea" }}
          >
            KINGKIDDPH LTD
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans-nav transition-opacity hover:opacity-60"
                style={{ color: scrolled ? "#3d3935" : "#f5f1ea" }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setMenuOpen(true)}
              className="ml-2 transition-opacity hover:opacity-60"
              style={{ color: scrolled ? "#3d3935" : "#f5f1ea" }}
              aria-label="open menu"
            >
              <Menu size={20} strokeWidth={1.2} />
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden"
            style={{ color: scrolled ? "#3d3935" : "#f5f1ea" }}
            aria-label="open menu"
          >
            <Menu size={22} strokeWidth={1.2} />
          </button>
        </div>
      </header>

      {/* Side drawer menu */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-[#3d3935]/40"
          onClick={() => setMenuOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-[#f5f1ea] shadow-xl transform transition-transform duration-500 ease-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-10 py-8">
            <span className="font-serif-display text-lg tracking-[0.18em] text-[#3d3935]">
              KINGKIDDPH LTD
            </span>
            <button onClick={() => setMenuOpen(false)} aria-label="close menu" className="text-[#3d3935]">
              <X size={22} strokeWidth={1.2} />
            </button>
          </div>
          <nav className="flex flex-col px-10 mt-10 gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif-display text-3xl text-[#3d3935] hover:opacity-60 transition-opacity"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="absolute bottom-10 left-10 right-10 text-[#6b625b]">
            <p className="eyebrow mb-3">Connect</p>
            <p className="text-sm tracking-wider">hello@kingkiddph.com</p>
            <p className="text-sm tracking-wider mt-1">Nairobi, Kenya</p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Header;
