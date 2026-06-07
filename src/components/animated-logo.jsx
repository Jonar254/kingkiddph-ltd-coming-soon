"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export function AnimatedLogo() {
  const logoRef = useRef(null);

  useEffect(() => {
    const node = logoRef.current;
    if (node) {
      node.classList.add("opacity-100", "scale-100");
    }
  }, []);

  return (
    <div
      ref={logoRef}
      className="opacity-0 scale-95 transition-all duration-1000"
    >
      <div className="relative animate-logo-float">
        <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src="/images/kingkidd-logo-webp/logo-white.webp"
              alt="Kingkiddph Ltd logo"
              fill
              sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 160px, 192px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
