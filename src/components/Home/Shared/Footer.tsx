import React from "react";
import { Link } from "react-router-dom";
import {
  Smartphone,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
import SSLCommerzPaymentSection from "./SSLCommerzPaymentSection";
import shobNowLogo from "@/assets/Logo/shobnow-logo.jpg";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0C1326] dark:bg-[#070B16] text-[#E2E8F0] pt-12 sm:pt-16 pb-12 font-inter border-t border-[#1C2C5E] dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Main Content Grid: Brand Info on Left + 3 Columns of Links */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 pb-12">
          {/* Column 1: Brand Info & Mobile App Box */}
          <div className="w-full lg:max-w-[340px] flex flex-col justify-start items-start gap-8">
            <div className="space-y-4">
              {/* Logo */}
              <Link to="/" className="inline-flex items-center select-none group" aria-label="SHOB Now Home">
                <div className="relative flex items-center bg-white/95 px-3 py-1.5 rounded-2xl shadow-xs transition-all">
                  <img
                    src={shobNowLogo}
                    alt="SHOB Now"
                    className="h-9 sm:h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
              </Link>

              {/* Tagline */}
              <p className="text-slate-300 text-base font-normal leading-6">
                Design amazing digital experiences that create more happy in the world.
              </p>
            </div>

            {/* Install Web-app Badge */}
            <div className="w-full sm:w-auto p-3 rounded-xl border border-[#1E2E5C] dark:border-slate-700 flex items-center gap-3 bg-[#141E3D] dark:bg-slate-800/80 shadow-2xs hover:border-primary-dark transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#1C2B54] dark:bg-slate-800 text-primary-dark flex items-center justify-center shrink-0">
                <Smartphone size={22} />
              </div>
              <div>
                <span className="text-white text-base font-semibold leading-snug block">
                  Install our web-app:
                </span>
                <span className="text-slate-300 text-sm font-normal leading-tight">
                  Android &amp; IOS
                </span>
              </div>
            </div>
          </div>

          {/* 3 Nav Columns: Categories, Useful Links, Pages */}
          <div className="w-full lg:flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
            {/* Column 2: Categories */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-white text-lg font-faustina font-semibold leading-[21.6px]">
                Categories
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link to="/shop?category=skin-care" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Skin care solution
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=melasma" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Melasma Solution
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=student-pack" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Student Pack
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=hair-care" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Hair Care
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=combo-set" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Combo Set
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=food-supps" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Supplement
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=makeup" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Makeup
                  </Link>
                </li>
                <li>
                  <Link to="/shop?category=accessories" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Accessories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Useful Links */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-white text-lg font-faustina font-semibold leading-[21.6px]">
                Useful Links
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link to="/contact" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Shipping &amp; Delivery
                  </Link>
                </li>
                <li>
                  <Link to="/returns" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Return &amp; Refund
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Privacy &amp; Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Terms &amp; Condition
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Promotions
                  </Link>
                </li>
                <li>
                  <Link to="/guidelines" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Digital Commerce Operation Guidelines
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Pages */}
            <div className="flex flex-col gap-3.5">
              <h4 className="text-white text-lg font-faustina font-semibold leading-[21.6px]">
                Pages
              </h4>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link to="/shop" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/shop?sort=bestselling" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Top Selling
                  </Link>
                </li>
                <li>
                  <Link to="/shop?sort=newest" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/shop?filter=featured" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Featured Products
                  </Link>
                </li>
                <li>
                  <Link to="/brands" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Brands
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="text-stone-300 text-sm font-normal leading-[21px] hover:text-primary-dark transition-colors">
                    Order Tracking
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real Interactive SSLCOMMERZ Payment Cards Component */}
        <SSLCommerzPaymentSection />

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="pt-8 border-t border-[#1C2C5E] dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-dark text-base font-manrope font-normal leading-6">
            © 2026 SHOB Now. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark hover:opacity-80 transition-opacity"
              aria-label="X (Twitter)"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark hover:opacity-80 transition-opacity"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark hover:opacity-80 transition-opacity"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark hover:opacity-80 transition-opacity"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
