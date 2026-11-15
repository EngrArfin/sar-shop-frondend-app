import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { TOP_BRANDS_GRID, TopBrandItem } from "@/data/data";

// Extended Brand Interface with rich metadata
export interface BrandDetailItem extends TopBrandItem {
  origin: string;
  specialty: string;
  productCount: number;
  featured?: boolean;
  description: string;
  tagline: string;
}

// Enriched Brand Directory
const EXTENDED_BRANDS: BrandDetailItem[] = [
  {
    id: 9,
    name: "COSRX",
    slug: "cosrx",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "cosrx")?.logo || "",
    link: "/shop?brand=COSRX",
    origin: "Seoul, South Korea",
    specialty: "Snail Mucin & Acne Solutions",
    productCount: 24,
    featured: true,
    tagline: "Expecting Tomorrow",
    description: "World-renowned Korean skincare brand famous for high-concentration active formulations, low pH cleansers, and iconic Snail 96 Mucin Essence.",
  },
  {
    id: 6,
    name: "Beauty of Joseon",
    slug: "beauty-of-joseon",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "beauty-of-joseon")?.logo || "",
    link: "/shop?brand=Beauty%20of%20Joseon",
    origin: "Seoul, South Korea",
    specialty: "Hanbang Herbal & Sun Care",
    productCount: 18,
    featured: true,
    tagline: "Modern Hanbang Wisdom",
    description: "Reinterprets traditional Korean traditional herbal medicine (Hanbang) with modern clean ingredients. Home of the global #1 Relief Sun Rice Sunscreen.",
  },
  {
    id: 1,
    name: "Anua",
    slug: "anua",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "anua")?.logo || "",
    link: "/shop?brand=Anua",
    origin: "Seoul, South Korea",
    specialty: "Heartleaf Soothing & Calming",
    productCount: 16,
    featured: true,
    tagline: "Calm Your Troubled Skin",
    description: "Specializes in pure Heartleaf and Peach Niacin formulations designed to calm sensitive, acne-prone barriers and restore healthy moisture balance.",
  },
  {
    id: 18,
    name: "SKIN1004",
    slug: "skin1004",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "skin1004")?.logo || "",
    link: "/shop?brand=SKIN1004",
    origin: "Seoul, South Korea",
    specialty: "Madagascar Centella Extract",
    productCount: 20,
    featured: true,
    tagline: "Untouched Nature of Madagascar",
    description: "Formulates pure Centella Asiatica harvested from untouched Madagascar habitats to soothe inflamed skin, repair compromised barriers, and treat blemishes.",
  },
  {
    id: 15,
    name: "Medicube",
    slug: "medicube",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "medicube")?.logo || "",
    link: "/shop?brand=medicube",
    origin: "Seoul, South Korea",
    specialty: "Clinical Dermacosmetics & Pores",
    productCount: 15,
    featured: true,
    tagline: "Proven Clinical Results",
    description: "Leading medical-grade Korean skincare focused on deep pore tightening, zero-pore pads, and collagen-boosting professional treatments.",
  },
  {
    id: 11,
    name: "Dr. Althea",
    slug: "dr-althea",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "dr-althea")?.logo || "",
    link: "/shop?brand=Dr.%20Althea",
    origin: "Seoul, South Korea",
    specialty: "Gentle Barrier & Relief Creams",
    productCount: 12,
    featured: true,
    tagline: "Pure Aesthetics for Sensitive Skin",
    description: "Hypoallergenic clean beauty known for its 345 Relief Cream and vitamin-rich barrier recovery solutions for reactive skin types.",
  },
  {
    id: 4,
    name: "AXIS-Y",
    slug: "axis-y",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "axis-y")?.logo || "",
    link: "/shop?brand=AXIS-Y",
    origin: "Seoul, South Korea",
    specialty: "Dark Spot Glow & Climate Care",
    productCount: 14,
    featured: false,
    tagline: "Climate-Inspired Skincare (6+1+1)",
    description: "Formulates climate-specific skincare combining nutrient-rich plant extracts with gentle actives, world-famous for its Dark Spot Correcting Glow Serum.",
  },
  {
    id: 16,
    name: "MISSHA",
    slug: "missha",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "missha")?.logo || "",
    link: "/shop?brand=Missha",
    origin: "Seoul, South Korea",
    specialty: "Fermented Essences & BB Creams",
    productCount: 22,
    featured: false,
    tagline: "Time Revolution",
    description: "One of Korea's pioneer beauty brands famed for luxury fermented essences, ampoules, and the legendary M Perfect Cover BB Cream.",
  },
  {
    id: 17,
    name: "Purito",
    slug: "purito",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "purito")?.logo || "",
    link: "/shop?brand=Purito",
    origin: "Seoul, South Korea",
    specialty: "100% Vegan & Clean Formulations",
    productCount: 14,
    featured: false,
    tagline: "Pure, Safe & Eco-Conscious",
    description: "Cruelty-free vegan skincare utilizing natural Centella and Oat extracts packaged in eco-friendly biodegradable materials.",
  },
  {
    id: 8,
    name: "celimax",
    slug: "celimax",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "celimax")?.logo || "",
    link: "/shop?brand=celimax",
    origin: "Seoul, South Korea",
    specialty: "Noni Energy & Deep Hydration",
    productCount: 12,
    featured: false,
    tagline: "Honest Skincare that Works",
    description: "Famous for its Noni Energy Ampoule and gentle cleansing oils that deeply replenish cellular moisture without artificial irritants.",
  },
  {
    id: 2,
    name: "APLB",
    slug: "aplb",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "aplb")?.logo || "",
    link: "/shop?brand=APLB",
    origin: "Seoul, South Korea",
    specialty: "Glutathione & Niacinamide Care",
    productCount: 16,
    featured: false,
    tagline: "Advanced Brightening Formulations",
    description: "Specialized brightening and skin repair brand combining concentrated Glutathione, Centella, and Niacinamide for radiant skin.",
  },
  {
    id: 3,
    name: "Arencia",
    slug: "arencia",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "arencia")?.logo || "",
    link: "/shop?brand=Arencia",
    origin: "Seoul, South Korea",
    specialty: "Artisanal Fresh Cleansers",
    productCount: 8,
    featured: false,
    tagline: "Handcrafted Rice & Mochi Cleansers",
    description: "Trending artisanal beauty lab creating mochi-textured rice cake cleansers enriched with botanical superfoods for glass skin.",
  },
  {
    id: 5,
    name: "BEAUTÉ",
    slug: "beaute",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "beaute")?.logo || "",
    link: "/shop?brand=BEAUTÉ",
    origin: "Seoul, South Korea",
    specialty: "Luxury Moisture & Anti-Aging",
    productCount: 10,
    featured: false,
    tagline: "Timeless Parisian-Korean Fusion",
    description: "Elegant cosmetic formulations balancing French aesthetic standards with Korean active dermatological technology.",
  },
  {
    id: 7,
    name: "CARE:NEL",
    slug: "carenel",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "carenel")?.logo || "",
    link: "/shop?brand=CARE:NEL",
    origin: "Seoul, South Korea",
    specialty: "Lip Sleeping Masks & Peptides",
    productCount: 11,
    featured: false,
    tagline: "Gentle Nighttime Care",
    description: "Widely loved for deeply nourishing Berry Lip Sleeping Masks and revitalizing overnight intensive skin therapy.",
  },
  {
    id: 10,
    name: "DABO",
    slug: "dabo",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "dabo")?.logo || "",
    link: "/shop?brand=Dabo",
    origin: "Seoul, South Korea",
    specialty: "Eco-Friendly Foam & Sun Creams",
    productCount: 14,
    featured: false,
    tagline: "Eco-Life Daily Essentials",
    description: "Value-focused authentic daily skincare offering botanical cleansers, soothing aloe gels, and broad-spectrum sunscreens.",
  },
  {
    id: 12,
    name: "Nature Skin",
    slug: "nature-skin",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "nature-skin")?.logo || "",
    link: "/shop?brand=Nature%20Skin",
    origin: "Seoul, South Korea",
    specialty: "Charcoal & Plant-Derived Care",
    productCount: 10,
    featured: false,
    tagline: "Pure Natural Extracts",
    description: "Formulates deep pore peeling gels, charcoal pore cleansers, and plant-based grooming essentials.",
  },
  {
    id: 13,
    name: "I'm from",
    slug: "im-from",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "im-from")?.logo || "",
    link: "/shop?brand=I%27m%20from",
    origin: "Seoul, South Korea",
    specialty: "Rice, Mugwort & Honey Extracts",
    productCount: 14,
    featured: false,
    tagline: "Transparent Sourcing from Nature",
    description: "Directly sources pure Mugwort from Ganghwa Island and raw Jirisan honey to craft single-origin, hyper-effective natural beauty.",
  },
  {
    id: 14,
    name: "iUNIK",
    slug: "iunik",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "iunik")?.logo || "",
    link: "/shop?brand=iUNIK",
    origin: "Seoul, South Korea",
    specialty: "Centella, Tea Tree & Beta-Glucan",
    productCount: 15,
    featured: false,
    tagline: "Ideal, Unique, Natural, Innovative",
    description: "Minimalist skincare brand focusing on high percentages of natural actives with zero artificial fragrances or filler ingredients.",
  },
  {
    id: 19,
    name: "DECIEM",
    slug: "deciem",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "deciem")?.logo || "",
    link: "/shop?brand=DECIEM",
    origin: "Toronto & Global Labs",
    specialty: "Clinical Formulation Science",
    productCount: 18,
    featured: false,
    tagline: "The Abnormal Beauty Company",
    description: "The umbrella powerhouse behind The Ordinary and NIOD, pioneering transparency in high-potency functional active skincare.",
  },
  {
    id: 20,
    name: "THE FACE SHOP",
    slug: "the-face-shop",
    logo: TOP_BRANDS_GRID.find((b) => b.slug === "the-face-shop")?.logo || "",
    link: "/shop?brand=THE%20FACE%20SHOP",
    origin: "Seoul, South Korea",
    specialty: "Rice Water Bright & Cleansing",
    productCount: 22,
    featured: false,
    tagline: "Natural Story from Korea",
    description: "Iconic K-Beauty brand celebrated globally for Rice Water Bright Light Cleansing Oil, Jeju volcanic cleansers, and herbal sheet masks.",
  },
];

export const Brands: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("ALL");

  // Alphabet letters list
  const alphabet = ["ALL", "A", "B", "C", "D", "I", "M", "N", "P", "S", "T"];

  // Filtered brands based on search & alphabet
  const filteredBrands = useMemo(() => {
    return EXTENDED_BRANDS.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLetter =
        selectedLetter === "ALL" ||
        brand.name.toUpperCase().startsWith(selectedLetter);

      return matchesSearch && matchesLetter;
    });
  }, [searchQuery, selectedLetter]);

  const featuredBrands = useMemo(() => {
    return EXTENDED_BRANDS.filter((b) => b.featured);
  }, []);

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-[#090D14] min-h-screen py-10 sm:py-16 transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. HERO HEADER (Aligned with Royal Navy & Electric Orange) */}
        <div className="text-left mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft dark:bg-[#182552] border border-primary-soft-border/70 dark:border-[#22336B] mb-3">
            <ShieldCheck size={14} className="text-primary dark:text-primary-dark" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-ink dark:text-[#93C5FD] font-inter">
              100% Direct South Korean Imports
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-faustina font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                Official Brand Partners
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400 font-inter mt-2 max-w-2xl leading-relaxed">
                Explore 20+ authentic Korean skincare and cosmetic brands directly sourced from verified Seoul laboratories. Every batch is certified with official certificates of origin.
              </p>
            </div>

            {/* Total Brand Count Counter Pill */}
            <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-[#111726] border border-black/[0.08] dark:border-gray-800 shadow-2xs">
              <Sparkles size={16} className="text-[#F85606]" />
              <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white font-inter">
                {EXTENDED_BRANDS.length} Authorized Brands
              </span>
            </div>
          </div>
        </div>

        {/* 2. TOP FEATURED SPOTLIGHT BRANDS */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold font-inter text-gray-900 dark:text-white flex items-center gap-2">
              <span>Trending Flagship Brands</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F85606]/10 text-[#F85606]">
                Top Sellers
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featuredBrands.map((brand) => (
              <Link
                key={brand.id}
                to={brand.link}
                className="group relative bg-white dark:bg-[#111726] rounded-2xl p-5 sm:p-6 border border-black/[0.08] dark:border-gray-800 shadow-2xs hover:shadow-xl hover:border-primary/50 dark:hover:border-primary-dark/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Brand Header: Logo & Origin */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="h-12 w-28 sm:w-32 flex items-center justify-start">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain drop-shadow-2xs"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {brand.origin}
                    </span>
                  </div>

                  {/* Brand Title & Tagline */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-dark transition-colors font-inter">
                    {brand.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#F85606] block mt-0.5 mb-2 font-inter">
                    {brand.specialty}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-inter line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                    {brand.productCount}+ Authentic Products
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary dark:text-primary-dark group-hover:underline">
                    <span>Shop Collection</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. INTERACTIVE FILTER & SEARCH BAR */}
        <div className="bg-white dark:bg-[#111726] rounded-2xl p-4 sm:p-5 border border-black/[0.08] dark:border-gray-800 shadow-2xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands by name, specialty, or ingredients..."
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 focus:border-primary dark:focus:border-primary-dark focus:bg-white dark:focus:bg-[#0D1424] text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 transition-all outline-none font-inter"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Alphabetical A-Z Filter Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span className="text-xs font-bold text-gray-400 uppercase mr-1 hidden sm:inline-block">
                Letter:
              </span>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setSelectedLetter(letter)}
                  className={`h-8 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedLetter === letter
                      ? "bg-primary text-white shadow-2xs dark:bg-primary-dark dark:text-slate-950"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. ALL BRANDS GRID (4-column responsive) */}
        {filteredBrands.length === 0 ? (
          <div className="bg-white dark:bg-[#111726] rounded-2xl p-12 text-center border border-black/[0.08] dark:border-gray-800 shadow-2xs">
            <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
              No brands found matching "{searchQuery}"
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
              Try searching with a different keyword or reset the letter filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedLetter("ALL");
              }}
              className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-14">
            {filteredBrands.map((brand) => (
              <Link
                key={brand.id}
                to={brand.link}
                className="group relative bg-white dark:bg-[#111726] rounded-2xl p-4 sm:p-5 border border-black/[0.08] dark:border-gray-800 shadow-2xs hover:shadow-lg hover:border-primary/50 dark:hover:border-primary-dark/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Brand Logo Container */}
                <div className="h-14 sm:h-16 w-full flex items-center justify-center p-2 mb-3 bg-slate-50/70 dark:bg-slate-900/50 rounded-xl">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-full max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
                    loading="lazy"
                  />
                </div>

                {/* Brand Info */}
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-dark transition-colors font-inter truncate">
                    {brand.name}
                  </h4>
                  <p className="text-[11px] font-medium text-[#F85606] truncate mt-0.5">
                    {brand.specialty}
                  </p>
                </div>

                {/* Bottom link */}
                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
                  <span>{brand.productCount}+ items</span>
                  <ArrowRight
                    size={12}
                    className="text-primary dark:text-primary-dark group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* 5. AUTHENTICITY ASSURANCE BADGE BANNER */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-primary/10 via-primary-soft/50 to-primary/10 dark:from-[#111726] dark:via-[#182552]/40 dark:to-[#111726] border border-primary/20 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-inter">
                  100% Genuine Batch Authentic
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-inter mt-1 leading-relaxed">
                  Every cosmetic item comes with verified barcode and manufacturer batch certification.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#F85606] text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-inter">
                  Authorized Direct Importer
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-inter mt-1 leading-relaxed">
                  No middlemen or grey market items. Directly imported from official Korean brand warehouses.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles size={20} />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-inter">
                  7-Day Seal Guarantee
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-inter mt-1 leading-relaxed">
                  Hassle-free replacement if package seal is damaged or tamper detected during delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
