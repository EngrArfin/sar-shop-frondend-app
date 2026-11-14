import React from "react";
import { Link } from "react-router-dom";
import { MOCK_PRODUCTS, Product } from "@/data/shopData";
import { FigmaProductCard } from "./NewArrivalsSection";

export const TopSellingSection: React.FC<{
  onQuickView?: (product: Product) => void;
}> = ({ onQuickView }) => {
  const topSelling = MOCK_PRODUCTS.slice(5, 15);

  return (
    <section className="w-full bg-surface-tint dark:bg-[#090D14] py-12 sm:py-16 transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Heading - Left Aligned with Subtitle in <p> tag */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 text-left">
          <div>
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#F85606] block mb-1 font-inter">
              Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-faustina font-bold text-black dark:text-white tracking-tight leading-tight">
              Top Selling
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-1.5 max-w-2xl leading-relaxed">
              Our most-loved bestsellers trusted by thousands across Bangladesh for proven radiance and authentic glow.
            </p>
          </div>
          <Link
            to="/top-selling"
            className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-inter font-semibold transition-all duration-200 shadow-xs shrink-0 self-start sm:self-auto"
          >
            See All Bestsellers
          </Link>
        </div>

        {/* 5-Column x 2-Row Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-10 sm:mb-12">
          {topSelling.map((product) => (
            <FigmaProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* See all Button */}
        <div className="text-center">
          <Link
            to="/top-selling"
            className="inline-flex items-center justify-center h-10 px-6 sm:px-8 rounded-[8px] bg-primary-soft hover:bg-primary-soft-hover dark:bg-[#182552] dark:hover:bg-[#1E2D63] text-primary-ink dark:text-[#93C5FD] border border-primary-soft-border/60 dark:border-[#22336B] font-inter font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-2xs"
          >
            See all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopSellingSection;
