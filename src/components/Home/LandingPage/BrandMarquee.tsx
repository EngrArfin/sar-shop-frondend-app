import React from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { BRAND_MARQUEE_ITEMS } from "@/data/shopData";

export const BrandMarquee: React.FC = () => {
  return (
    <section className="relative w-full bg-surface-tint dark:bg-[#090D14] py-4 sm:py-6 overflow-hidden select-none transition-colors duration-200 border-y border-primary-border/70 dark:border-gray-800/60">
      {/* Outer Left Edge Deep Shadow Fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 sm:w-48 md:w-64 lg:w-80 z-20 bg-gradient-to-r from-surface-tint via-surface-tint/90 via-35% via-surface-tint/40 via-70% to-transparent dark:from-[#090D14] dark:via-[#090D14]/90 dark:via-35% dark:via-[#090D14]/40 dark:via-70% dark:to-transparent" />

      {/* Outer Right Edge Deep Shadow Fade */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 sm:w-48 md:w-64 lg:w-80 z-20 bg-gradient-to-l from-surface-tint via-surface-tint/90 via-35% via-surface-tint/40 via-70% to-transparent dark:from-[#090D14] dark:via-[#090D14]/90 dark:via-35% dark:via-[#090D14]/40 dark:via-70% dark:to-transparent" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 relative">
        <Marquee speed={32} pauseOnHover={true} gradient={false} autoFill={true}>
          {BRAND_MARQUEE_ITEMS.map((brand) => (
            <Link
              key={brand.id}
              to={`/brands?brand=${brand.slug}`}
              title={`View ${brand.name} Collection`}
              onClick={() => {
                toast.info(`Exploring ${brand.name}`, {
                  description: `Browsing official authentic products from ${brand.name}.`,
                });
              }}
              className="w-[84px] sm:w-[96px] h-[40px] sm:h-[44px] px-3 py-1.5 mx-2.5 sm:mx-3 bg-white dark:bg-gray-800/90 rounded-[6px] flex items-center justify-center shrink-0 shadow-2xs hover:shadow-md hover:border-primary dark:hover:border-primary-dark hover:-translate-y-0.5 active:scale-95 border border-gray-200/80 dark:border-gray-700 transition-all duration-200 cursor-pointer group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-200"
                loading="lazy"
              />
            </Link>
          ))}
        </Marquee>

        {/* Inner Left Edge Container Shadow Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 md:w-52 z-10 bg-gradient-to-r from-surface-tint via-surface-tint/80 to-transparent dark:from-[#090D14] dark:via-[#090D14]/80 dark:to-transparent" />

        {/* Inner Right Edge Container Shadow Fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 md:w-52 z-10 bg-gradient-to-l from-surface-tint via-surface-tint/80 to-transparent dark:from-[#090D14] dark:via-[#090D14]/80 dark:to-transparent" />
      </div>
    </section>
  );
};

export default BrandMarquee;
