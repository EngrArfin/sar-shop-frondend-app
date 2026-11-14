import React from "react";
import { Link } from "react-router-dom";
import {
  FIGMA_CATEGORIES_ROW_1,
  FIGMA_CATEGORIES_ROW_2,
  ALL_FIGMA_CATEGORIES,
  FigmaCategoryItem as CategoryItem,
} from "@/data/shopData";

export { FIGMA_CATEGORIES_ROW_1, FIGMA_CATEGORIES_ROW_2, ALL_FIGMA_CATEGORIES };
export type { CategoryItem };

// Default professional short descriptions for each category
export const DEFAULT_CATEGORY_SUBTITLES: Record<string, string> = {
  "Skin Care": "Cleansers, Toners & Serums",
  "Personal Care": "Daily Bath & Hygiene",
  "Makeup": "Foundations, Blush & Lips",
  "Lip Care": "Balms, Tints & Masks",
  "Hair Care": "Shampoo & Scalp Care",
  "Fragrance": "Eau De Parfum & Mists",
  "Food & Supps": "Collagen & Daily Vitamins",
  "Combo Set": "Curated Gift Bundles",
  "Body Care": "Lotions & Body Wash",
  "Bags": "Chic Handbags & Totes",
  "Baby Product": "Mild & Gentle Formulas",
  "Accessories": "Jewellery & Daily Styling",
};

// Backwards compatibility types & exports
export interface CategoryCardProps {
  id?: number | string;
  title: string;
  image: string;
  bgColor?: string;
  link?: string;
  subtitle?: string;
  itemCount?: string | number;
  badge?: string;
  className?: string;
  onClick?: () => void;
}
export type BrandCategoryCardProps = CategoryCardProps;

export interface CategorySectionHeaderProps {
  badgeText?: string;
  title?: string;
  description?: string;
  viewAllLink?: string;
  viewAllText?: string;
}

export interface BrandCategoriesProps {
  categories?: CategoryItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const brandCategoriesData = ALL_FIGMA_CATEGORIES;

export const CategorySectionHeader: React.FC<CategorySectionHeaderProps> = ({
  badgeText = "Curated Collections",
  title = "Jewellery & Accessories",
  description = "Explore our hand-picked authentic beauty, skincare essentials, and trending styles curated for you.",
}) => {
  const displayTitle = title.replace(/&amp;/g, "&");
  return (
    <div className="text-left mb-6 sm:mb-8">
      {badgeText && (
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-dark block mb-1 font-inter">
          {badgeText}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-faustina font-bold text-black dark:text-white tracking-tight leading-tight">
        {displayTitle}
      </h2>
      {description && (
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-2xl font-inter leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

// Square Category Card (বর্গাকার aspect-square) with Left-Aligned Title and Short Subtitle
export interface FigmaCategoryCardProps extends Partial<CategoryCardProps> {
  item?: CategoryItem;
}

export const FigmaCategoryCard: React.FC<FigmaCategoryCardProps> = ({
  item,
  title,
  image,
  bgColor,
  link,
  subtitle,
  className = "",
  onClick,
}) => {
  const finalTitle = item?.title ?? title ?? "";
  const finalImage = item?.image ?? image ?? "";
  const finalBgColor = item?.bgColor ?? bgColor ?? "#DCFCE7";
  const finalLink = item?.link ?? link ?? "#";
  const finalSubtitle =
    item?.subtitle ??
    subtitle ??
    DEFAULT_CATEGORY_SUBTITLES[finalTitle] ??
    "Explore Collection";

  return (
    <Link
      to={finalLink}
      onClick={onClick}
      className={`w-full max-w-[210px] flex flex-col justify-start items-start gap-2.5 group cursor-pointer select-none transition-transform duration-300 hover:-translate-y-1.5 ${className}`}
    >
      {/* Square Container (বর্গাকার: aspect-square rounded-2xl sm:rounded-3xl) */}
      <div
        style={{ backgroundColor: finalBgColor }}
        className="w-full aspect-square rounded-2xl sm:rounded-3xl relative flex items-center justify-center p-3 sm:p-4 transition-all duration-300 group-hover:shadow-lg border border-black/5 dark:border-white/10 overflow-hidden"
      >
        {/* Category Image inside square container */}
        <img
          src={finalImage}
          alt={finalTitle}
          className="w-[84%] h-[84%] object-contain transition-transform duration-500 group-hover:scale-110 pointer-events-none select-none drop-shadow-xs"
          loading="lazy"
        />
      </div>

      {/* Category Info below square card - Left-aligned with short professional p tag */}
      <div className="w-full text-left px-0.5">
        <h3 className="text-sm sm:text-base font-semibold font-faustina text-black dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-dark transition-colors line-clamp-1 leading-snug">
          {finalTitle}
        </h3>
        <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 font-inter line-clamp-1 mt-0.5 leading-tight">
          {finalSubtitle}
        </p>
      </div>
    </Link>
  );
};

export const FigmaCategoryCapsule = FigmaCategoryCard;
export const CategoryCard = FigmaCategoryCard;
export const BrandCategoryCard = FigmaCategoryCard;

export default function BrandCategories({
  title = "Jewellery & Accessories",
  subtitle,
  categories,
  className = "",
}: BrandCategoriesProps) {
  const displayTitle = title.replace(/&amp;/g, "&");

  // If explicit categories array provided, render that. Otherwise render Row 1 (or both)
  const itemsToRender = categories ?? (
    title.toLowerCase().includes("jewellery") || title.toLowerCase().includes("accessories")
      ? FIGMA_CATEGORIES_ROW_1
      : FIGMA_CATEGORIES_ROW_2
  );

  return (
    <section className={`w-full bg-surface-page dark:bg-[#090D14] py-10 sm:py-14 md:py-16 transition-colors duration-200 ${className}`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - Left Aligned with short professional <p> tag */}
        <div className="text-left mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-dark block mb-1 font-inter">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-faustina font-['Faustina'] font-bold text-black dark:text-white tracking-tight leading-tight">
            {displayTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-1.5 max-w-2xl leading-relaxed">
            {subtitle || "Explore our hand-picked authentic beauty, skincare essentials, and trending styles curated for you."}
          </p>
        </div>

        {/* Square Cards Grid: 6 Columns on Laptops (lg:grid-cols-6), 3 on tablets (sm:grid-cols-3), 2 on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5 justify-items-center">
          {itemsToRender.map((item) => (
            <FigmaCategoryCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
