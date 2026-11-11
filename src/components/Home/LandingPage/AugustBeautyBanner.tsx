import React from "react";
import { Link } from "react-router-dom";
import augustBannerImg from "@/assets/banners/banner-august-deals.jpg";

export const AugustBeautyBanner: React.FC = () => {
  return (
    <section className="w-full bg-[#FFF9FB] dark:bg-[#090D14] pt-14 sm:pt-20 pb-4 transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        <Link
          to="/shop?category=skin-care"
          className="group block relative w-full h-[180px] sm:h-[234px] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500"
        >
          {/* Banner Graphic (Figma: width 1360, height 234, borderRadius 24) */}
          <img
            src={augustBannerImg}
            alt="August Beauty Deals"
            className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
            loading="lazy"
          />
        </Link>
      </div>
    </section>
  );
};

export default AugustBeautyBanner;
