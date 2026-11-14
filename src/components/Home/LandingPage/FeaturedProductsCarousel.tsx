import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { FEATURED_ITEMS } from "@/data/shopData";

export const FeaturedProductsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Center card

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : FEATURED_ITEMS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < FEATURED_ITEMS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="w-full bg-surface-tint dark:bg-[#0E131F] py-16 sm:py-20 overflow-hidden select-none transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Heading - Left Aligned with Subtitle in <p> tag */}
        <div className="text-left mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-dark block mb-1 font-inter">
            Editor's Choice
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-faustina font-bold text-black dark:text-white tracking-tight leading-tight">
            Featured Products
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-1.5 max-w-2xl leading-relaxed">
            Handpicked iconic Korean skincare innovations and viral beauty highlights chosen for exceptional results.
          </p>
        </div>

        {/* 3D Perspective Card Stack Container */}
        <div className="relative flex items-center justify-center min-h-[480px] sm:min-h-[540px]">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-40 w-8 h-8 rounded-full bg-[#1B1E23] text-[#E9EBEE] flex items-center justify-center shadow-md hover:bg-black transition-all cursor-pointer"
            aria-label="Previous Featured Product"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Cards Deck */}
          <div className="relative w-full max-w-[1100px] h-[440px] sm:h-[520px] flex items-center justify-center">
            {FEATURED_ITEMS.map((item, index) => {
              const offset = index - activeIndex;
              const isCenter = offset === 0;
              const isLeft1 = offset === -1 || (activeIndex === 0 && index === FEATURED_ITEMS.length - 1);
              const isRight1 = offset === 1 || (activeIndex === FEATURED_ITEMS.length - 1 && index === 0);
              const isLeft2 = offset === -2;
              const isRight2 = offset === 2;

              let transform = "";
              let zIndex = 10;
              let width = "w-[220px] sm:w-[275px]";
              let height = "h-[360px] sm:h-[440px]";
              let shadow = "shadow-lg";

              if (isCenter) {
                transform = "translateX(0%) scale(1)";
                zIndex = 30;
                width = "w-[260px] xs:w-[280px] sm:w-[325px]";
                height = "h-[420px] sm:h-[520px]";
                shadow = "shadow-[0px_8px_90px_rgba(0,0,0,0.42)]";
              } else if (isLeft1) {
                transform = "translateX(-55%) sm:translateX(-65%) scale(0.95) sm:scale(1)";
                zIndex = 20;
                width = "w-[240px] sm:w-[300px]";
                height = "h-[390px] sm:h-[480px]";
              } else if (isRight1) {
                transform = "translateX(55%) sm:translateX(65%) scale(0.95) sm:scale(1)";
                zIndex = 20;
                width = "w-[240px] sm:w-[300px]";
                height = "h-[390px] sm:h-[480px]";
              } else if (isLeft2) {
                transform = "translateX(-110%) sm:translateX(-130%) scale(0.9) sm:scale(1)";
                zIndex = 10;
                width = "w-[220px] sm:w-[275px]";
                height = "h-[360px] sm:h-[440px]";
              } else if (isRight2) {
                transform = "translateX(110%) sm:translateX(130%) scale(0.9) sm:scale(1)";
                zIndex = 10;
                width = "w-[220px] sm:w-[275px]";
                height = "h-[360px] sm:h-[440px]";
              } else {
                transform = "scale(0.8)";
                zIndex = 0;
              }

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    transform,
                    zIndex,
                    transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                  className={`absolute ${width} ${height} rounded-[24px] overflow-hidden p-3 flex flex-col justify-between cursor-pointer ${shadow} ${
                    !isCenter && !isLeft1 && !isRight1 && !isLeft2 && !isRight2
                      ? "opacity-0 pointer-events-none"
                      : "opacity-100"
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80";
                    }}
                  />

                  {/* Top Floating Glass Circle Button */}
                  <div className="self-center mt-auto mb-auto w-[66px] h-[66px] rounded-full bg-[rgba(227,242,239,0.28)] backdrop-blur-[3px] flex items-center justify-center shadow-xs">
                    <div className="w-6 h-6 flex items-center justify-center text-white">
                      <ShoppingBag size={20} />
                    </div>
                  </div>

                  {/* Bottom Product Info Card */}
                  <div className="relative z-10 w-full bg-surface-card dark:bg-gray-900/95 rounded-[12px] p-2 flex items-center gap-2 shadow-md border border-black/[0.06] dark:border-gray-800">
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-[66px] h-[66px] rounded-[8px] object-cover shrink-0"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.onerror = null;
                        target.src = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-faustina font-semibold text-black dark:text-white truncate leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-sm sm:text-base font-faustina font-bold text-[#F85606]">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-40 w-8 h-8 rounded-full bg-[#1B1E23] text-[#E9EBEE] flex items-center justify-center shadow-md hover:bg-black transition-all cursor-pointer"
            aria-label="Next Featured Product"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* See all Outline Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop?filter=featured"
            className="inline-flex items-center justify-center h-10 px-4 py-2.5 rounded-[8px] border-[1.5px] border-primary dark:border-primary-dark text-primary dark:text-primary-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-white dark:hover:text-gray-950 font-inter font-semibold text-base transition-all duration-200"
          >
            See all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
