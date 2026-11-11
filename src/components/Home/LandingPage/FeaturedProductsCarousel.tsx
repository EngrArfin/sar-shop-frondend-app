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
    <section className="w-full bg-[#F6E7ED] dark:bg-[#0E131F] py-16 sm:py-20 overflow-hidden select-none transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-[42px] font-faustina font-bold text-black dark:text-white tracking-tight leading-tight">
            Featured Products
          </h2>
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
                  />

                  {/* Top Floating Glass Circle Button */}
                  <div className="self-center mt-auto mb-auto w-[66px] h-[66px] rounded-full bg-[rgba(254,234,241,0.25)] backdrop-blur-[3px] flex items-center justify-center shadow-xs">
                    <div className="w-6 h-6 flex items-center justify-center text-white">
                      <ShoppingBag size={20} />
                    </div>
                  </div>

                  {/* Bottom Product Info Card */}
                  <div className="relative z-10 w-full bg-[#FFFDFD] dark:bg-gray-900/95 rounded-[12px] p-2 flex items-center gap-2 shadow-sm border border-transparent dark:border-gray-800">
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-[66px] h-[66px] rounded-[8px] object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-faustina font-semibold text-black dark:text-white truncate leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-sm sm:text-base font-faustina font-semibold text-[#5F6674] dark:text-gray-300">
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
            className="inline-flex items-center justify-center h-10 px-4 py-2.5 rounded-[8px] border-[1.5px] border-[#A20E4C] dark:border-[#FF4D82] text-[#A20E4C] dark:text-[#FF4D82] hover:bg-[#A20E4C] dark:hover:bg-[#FF4D82] hover:text-white font-inter font-semibold text-base transition-all duration-200"
          >
            See all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsCarousel;
