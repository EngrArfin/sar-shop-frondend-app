import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { toast } from "sonner";

import { BRAND_MARQUEE_ITEMS } from "@/data/shopData";

export const BrandMarquee: React.FC = () => {
  const [prevBtn, setPrevBtn] = useState<HTMLButtonElement | null>(null);
  const [nextBtn, setNextBtn] = useState<HTMLButtonElement | null>(null);

  return (
    <section className="relative w-full bg-surface-page dark:bg-[#090D14] py-10 sm:py-14 select-none transition-colors duration-200 border-b border-black/[0.06] dark:border-gray-800/80">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - Left Aligned with Professional Subtitle & Slider Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-9 text-left">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-dark block mb-1 font-inter">
              Official Brand Partners
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-faustina font-bold text-black dark:text-white tracking-tight leading-tight">
              Authentic Global Brands
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-1.5 max-w-2xl leading-relaxed">
              100% genuine skincare, cosmetics &amp; personal care products directly sourced from verified authorized Korean manufacturers.
            </p>
          </div>

          {/* Slider Navigation Arrows & View All */}
          <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
            <Link
              to="/brands"
              className="text-xs font-bold text-primary dark:text-primary-dark hover:underline flex items-center gap-1 mr-1"
            >
              <span>View All Brands</span>
              <ArrowRight size={13} />
            </Link>
            <div className="flex items-center gap-1.5">
              <button
                ref={setPrevBtn}
                className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-200 shadow-2xs cursor-pointer active:scale-90"
                aria-label="Previous Brands"
                title="Previous Brands"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                ref={setNextBtn}
                className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-200 shadow-2xs cursor-pointer active:scale-90"
                aria-label="Next Brands"
                title="Next Brands"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Proper Brand Slider with Large Cards & Logos */}
        <div className="w-full relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: prevBtn,
              nextEl: nextBtn,
            }}
            autoplay={{
              delay: 2400,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            speed={600}
            slidesPerView={2.2}
            spaceBetween={12}
            breakpoints={{
              480: {
                slidesPerView: 3.2,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 4.2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 5.5,
                spaceBetween: 18,
              },
              1280: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
            }}
            className="w-full !py-2"
          >
            {BRAND_MARQUEE_ITEMS.map((brand) => (
              <SwiperSlide key={brand.id}>
                <Link
                  to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                  title={`View ${brand.name} Collection`}
                  onClick={() => {
                    toast.info(`Exploring ${brand.name}`, {
                      description: `Browsing official authentic products from ${brand.name}.`,
                    });
                  }}
                  className="w-full h-24 sm:h-28 md:h-32 px-3 sm:px-4 py-2.5 sm:py-3 bg-white dark:bg-[#111726] rounded-2xl border border-black/[0.08] dark:border-gray-800 shadow-2xs hover:shadow-lg hover:border-primary/50 dark:hover:border-primary-dark/60 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer relative overflow-hidden"
                >
                  {/* Logo Container - Large & Crisp */}
                  <div className="h-10 sm:h-12 md:h-14 w-full flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-h-full max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-2xs"
                      loading="lazy"
                    />
                  </div>

                  {/* Brand Name Text */}
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors line-clamp-1 mt-1 font-inter">
                    {brand.name}
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
