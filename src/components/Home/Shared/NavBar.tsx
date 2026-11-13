import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  Flame,
  Sparkles,
  Truck,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hook";
import {
  selectCartTotalCount,
  openCartDrawer,
} from "@/redux/features/cart/cartSlice";
import { NAV_SUB_ITEMS as subNavItems } from "@/data/shopData";
import shobNowLogo from "@/assets/Logo/shobnow-logo.jpg";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" || resolvedTheme === "dark" : false;

  const cartCount = useAppSelector(selectCartTotalCount);

  // Precision active item check so only the targeted category is active at one time
  const isNavItemActive = (itemPath: string) => {
    const { pathname, search, hash } = location;

    // 1. Top Selling
    if (itemPath === "/top-selling") {
      return pathname === "/top-selling" || search.includes("sort=bestselling");
    }

    // 2. New Arrivals
    if (itemPath.includes("newest")) {
      return search.includes("sort=newest");
    }

    // 3. Featured Products
    if (itemPath.includes("featured")) {
      return search.includes("filter=featured");
    }

    // 4. Brands
    if (itemPath === "/brands") {
      return pathname === "/brands" || search.includes("filter=brands");
    }

    // 5. Order Tracking
    if (itemPath === "/track-order") {
      return pathname === "/track-order";
    }

    // 6. All Categories
    if (itemPath === "/#categories" || itemPath === "/categories") {
      return pathname === "/categories" || hash === "#categories";
    }

    // 7. Shop: ONLY active when specifically on /shop and NOT on any specific sub-filter
    if (itemPath === "/shop") {
      return (
        (pathname === "/shop" || pathname === "/products") &&
        !search.includes("sort=bestselling") &&
        !search.includes("sort=newest") &&
        !search.includes("filter=featured")
      );
    }

    return pathname === itemPath;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full font-inter select-none shadow-md transition-all duration-300">
      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT TICKER (#182552 Royal Navy Deep + Gold Accents)       */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#182552] dark:bg-[#070B16] text-[#F1F5F9] text-xs py-2 px-4 sm:px-8 border-b border-white/10 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Free delivery badge */}
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="hidden sm:inline">Special Offer:</span>
            <span className="text-white font-semibold">Free Express Delivery</span>
            <span className="hidden md:inline text-white/70">on orders above ৳2,000</span>
          </div>

          {/* Center: Authentic guarantee */}
          <div className="hidden lg:flex items-center gap-2 text-white/80">
            <ShieldCheck size={14} className="text-blue-300" />
            <span>100% Genuine Batch Authenticity Guaranteed</span>
          </div>

          {/* Right: Hotline & Quick Help */}
          <div className="flex items-center gap-4 text-white/80">
            <a
              href="tel:0170000000"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone size={13} className="text-amber-400" />
              <span className="hidden sm:inline">Helpline:</span>
              <span className="font-semibold text-white">01700-000000</span>
            </a>
            <span className="text-white/20">|</span>
            <Link
              to="/track-order"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Truck size={13} className="text-blue-300" />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN BRAND HEADER BAR (#283B7F Royal Sapphire Navy + Frosted Glass)    */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-r from-[#1C2B5E] via-[#283B7F] to-[#1C2B5E] dark:from-[#0B1020] dark:via-[#111A33] dark:to-[#0B1020] text-white py-3.5 px-4 sm:px-8 shadow-sm border-b border-white/10 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4 sm:gap-8 lg:gap-14">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center select-none shrink-0 group"
            aria-label="SAR Shop Home"
          >
            <div className="relative flex items-center bg-white dark:bg-white/95 px-3.5 py-1.5 rounded-2xl shadow-sm ring-2 ring-white/10 transition-transform duration-200 group-hover:scale-105">
              <img
                src={shobNowLogo}
                alt="SAR Shop"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Centered Frosted Command-Style Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl hidden md:flex items-center"
          >
            <div className="w-full flex items-center bg-white/14 hover:bg-white/18 dark:bg-white/10 dark:hover:bg-white/15 rounded-full px-4 py-2 gap-2.5 transition-all duration-200 focus-within:bg-white focus-within:text-slate-900 dark:focus-within:bg-[#0B0F19] dark:focus-within:text-white border border-white/25 dark:border-white/15 focus-within:border-accent dark:focus-within:border-primary-dark focus-within:ring-2 focus-within:ring-accent/30 dark:focus-within:ring-primary-dark/30 shadow-inner group">
              <Search
                size={18}
                className="text-white/70 group-focus-within:text-primary dark:group-focus-within:text-primary-dark shrink-0 transition-colors"
              />
              <input
                type="text"
                placeholder="Search authentic skincare, makeup, serums, sunscreen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white group-focus-within:text-slate-900 dark:group-focus-within:text-white placeholder:text-white/60 group-focus-within:placeholder:text-slate-400 focus:outline-none transition-colors"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-white/70 group-focus-within:text-slate-500 hover:text-white group-focus-within:hover:text-slate-900 cursor-pointer p-0.5"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="hidden sm:inline-flex px-3.5 py-1 bg-accent hover:bg-accent-hover text-white text-xs font-bold rounded-full shadow-xs cursor-pointer transition-colors"
                >
                  Search
                </button>
              )}
            </div>
          </form>

          {/* Right Action Items: Cart, Login, Theme Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Cart Capsule Button */}
            <button
              onClick={() => dispatch(openCartDrawer())}
              className="relative h-10 px-3.5 sm:px-4 bg-white/14 hover:bg-white/22 dark:bg-white/10 dark:hover:bg-white/15 border border-white/25 dark:border-white/15 rounded-full flex items-center gap-2 text-white transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
              title="Shopping Cart"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart size={18} />
              <span className="hidden lg:inline text-xs font-semibold tracking-wide">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="bg-[#F85606] text-white text-[11px] font-black min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login Luxury Brand Button */}
            <Link
              to="/login"
              className="h-10 px-4 sm:px-5 bg-white hover:bg-slate-100 text-primary hover:text-primary-hover dark:bg-[#1E2D63] dark:hover:bg-[#283B7F] dark:text-white rounded-full flex items-center gap-2 text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer ring-1 ring-white/20"
            >
              <div className="w-5 h-5 rounded-full bg-primary/10 dark:bg-white/20 flex items-center justify-center">
                <User size={13} className="text-primary dark:text-white" />
              </div>
              <span className="hidden sm:inline">Login</span>
            </Link>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="h-10 w-10 bg-white/14 hover:bg-white/22 dark:bg-white/10 dark:hover:bg-white/15 border border-white/25 dark:border-white/15 rounded-full flex items-center justify-center text-amber-300 transition-all cursor-pointer shadow-xs group"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {mounted ? (
                isDark ? (
                  <Sun
                    size={18}
                    className="text-amber-300 transition-transform duration-300 group-hover:rotate-45"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-white transition-transform duration-300 group-hover:-rotate-12"
                  />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/90 hover:text-white md:hidden cursor-pointer rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUBNAV BAR (Two-Tone Contrast Ribbon with Micro Badges)                */}
      {/* ========================================================================= */}
      <nav className="w-full bg-white dark:bg-[#0E1424] border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-300 hidden md:block">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-11 flex items-center justify-between gap-4">
          {/* Category Ribbon Links */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 overflow-x-auto no-scrollbar py-1">
            {subNavItems.map((item, idx) => {
              const active = isNavItemActive(item.path);
              const isTopSelling = item.path === "/top-selling";
              const isNewest = item.path.includes("newest");
              const isFeatured = item.path.includes("featured");

              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`text-xs lg:text-[13px] font-['Inter'] whitespace-nowrap transition-all duration-200 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 ${
                    active
                      ? "bg-primary text-white font-bold shadow-xs dark:bg-primary-dark"
                      : "text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-dark hover:bg-primary-soft/60 dark:hover:bg-slate-800/80 font-medium"
                  }`}
                >
                  {isTopSelling && (
                    <Flame
                      size={13}
                      className={active ? "text-amber-300" : "text-amber-500"}
                    />
                  )}
                  {isNewest && (
                    <Sparkles
                      size={13}
                      className={active ? "text-blue-200" : "text-primary dark:text-primary-dark"}
                    />
                  )}
                  <span>{item.name}</span>
                  {isTopSelling && (
                    <span
                      className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full tracking-wider leading-none bg-[#F85606] text-white shadow-2xs"
                    >
                      HOT
                    </span>
                  )}
                  {isNewest && (
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full tracking-wider leading-none ${
                        active
                          ? "bg-white text-primary dark:bg-slate-900 dark:text-primary-dark"
                          : "bg-blue-100 text-primary dark:bg-blue-950 dark:text-blue-300"
                      }`}
                    >
                      NEW
                    </span>
                  )}
                  {isFeatured && (
                    <span
                      className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full tracking-wider leading-none ${
                        active
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      VIP
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Right Side Perks */}
          <div className="hidden xl:flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400 shrink-0">
            <Link
              to="/shop?category=skin-care"
              className="hover:text-primary dark:hover:text-primary-dark transition-colors flex items-center gap-1"
            >
              <span>Skincare</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              to="/shop?category=makeup"
              className="hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              Makeup
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <Link
              to="/contact"
              className="hover:text-primary dark:hover:text-primary-dark transition-colors text-primary dark:text-primary-dark font-semibold"
            >
              Need Help?
            </Link>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 4. MOBILE DRAWER MENU                                                     */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full bg-white dark:bg-[#0E1322] border-b border-slate-200 dark:border-slate-800 px-4 py-5 space-y-4 animate-in slide-in-from-top-2 transition-colors duration-200 shadow-xl">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="w-full flex items-center bg-[#F1F4F9] dark:bg-slate-800 rounded-full px-4 py-2.5 gap-2.5 border border-primary-border/60 dark:border-slate-700">
              <Search size={16} className="text-[#80899C] dark:text-slate-400" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-[#3F444E] dark:text-slate-100 placeholder:text-[#80899C] dark:placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </form>

          {/* Category List */}
          <div className="space-y-1 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pb-1">
              Explore Collections
            </div>
            {subNavItems.map((item, idx) => {
              const active = isNavItemActive(item.path);
              const isTopSelling = item.path === "/top-selling";
              const isNewest = item.path.includes("newest");

              return (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-white font-bold shadow-xs dark:bg-primary-dark"
                      : "text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-dark hover:bg-primary-soft/50 dark:hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isTopSelling && (
                      <Flame
                        size={15}
                        className={active ? "text-amber-300" : "text-amber-500"}
                      />
                    )}
                    {isNewest && (
                      <Sparkles
                        size={15}
                        className={active ? "text-blue-200" : "text-primary dark:text-primary-dark"}
                      />
                    )}
                    <span>{item.name}</span>
                  </div>
                  {isTopSelling && (
                    <span
                      className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#F85606] text-white shadow-2xs"
                    >
                      HOT
                    </span>
                  )}
                  {isNewest && (
                    <span
                      className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        active ? "bg-white text-primary" : "bg-blue-100 text-primary"
                      }`}
                    >
                      NEW
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Quick Perks in Mobile Menu */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-2">
            <Link
              to="/track-order"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Truck size={14} className="text-blue-500" />
              <span>Track Order</span>
            </Link>
            <a
              href="tel:0170000000"
              className="flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Phone size={14} className="text-amber-500" />
              <span>01700-000000</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
