import React, { useState, useEffect, useRef } from "react";
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
  LogOut,
  Package,
  Heart,
  LayoutDashboard,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hook";
import {
  selectCartTotalCount,
  openCartDrawer,
} from "@/redux/features/cart/cartSlice";
import { useCurrentUser, logOut } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { NAV_SUB_ITEMS as subNavItems } from "@/data/shopData";
import shobNowLogo from "@/assets/Logo/shobnow-logo.jpg";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(useCurrentUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === "dark" || resolvedTheme === "dark" : false;
  const cartCount = useAppSelector(selectCartTotalCount);

  // Close user dropdown on outside click or escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Signed out successfully");
    setIsUserMenuOpen(false);
    navigate("/");
  };

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
    <header className="sticky top-0 z-50 w-full font-inter select-none shadow-sm transition-all duration-200">
      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT TICKER (Deep Navy #182552 with Electric Orange Accent)  */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#182552] dark:bg-[#070B16] text-[#F1F5F9] text-xs py-2 px-4 sm:px-8 border-b border-white/10 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Free delivery badge with #F85606 pill */}
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#F85606] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs animate-pulse">
              HOT OFFER
            </span>
            <span className="hidden sm:inline text-white/80">Special:</span>
            <span className="text-white font-semibold">Free Express Delivery</span>
            <span className="hidden md:inline text-white/70">on orders above ৳2,000</span>
          </div>

          {/* Center: Authentic guarantee */}
          <div className="hidden lg:flex items-center gap-2 text-white/80">
            <ShieldCheck size={14} className="text-emerald-400" />
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
      {/* 2. MAIN BRAND HEADER BAR (Crisp Luxury White / Midnight Sapphire)           */}
      {/* ========================================================================= */}
      <div className="w-full bg-white dark:bg-[#0D1424] text-slate-900 dark:text-white py-3 sm:py-3.5 px-4 sm:px-8 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4 sm:gap-6 lg:gap-10">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center select-none shrink-0 group"
            aria-label="SAR Shop Home"
          >
            <div className="p-1 rounded-xl transition-all duration-200 group-hover:opacity-90 dark:bg-white/95 dark:px-2.5 dark:py-1">
              <img
                src={shobNowLogo}
                alt="SAR Shop"
                className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Centered Command-Style Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-2xl hidden md:flex items-center"
          >
            <div className="w-full flex items-center bg-slate-100/90 hover:bg-slate-150/90 dark:bg-slate-800/80 dark:hover:bg-slate-800 rounded-full pl-4 pr-1.5 py-1.5 gap-2.5 transition-all duration-200 border border-slate-200/90 dark:border-slate-700/80 focus-within:bg-white dark:focus-within:bg-[#0B1020] focus-within:border-primary dark:focus-within:border-primary-dark focus-within:ring-2 focus-within:ring-primary/15 shadow-2xs group">
              <Search
                size={18}
                className="text-slate-400 group-focus-within:text-primary dark:group-focus-within:text-primary-dark shrink-0 transition-colors"
              />
              <input
                type="text"
                placeholder="Search authentic skincare, makeup, serums, sunscreen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-colors"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-1"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#F85606] hover:bg-[#D94400] text-white text-xs font-bold rounded-full shadow-xs cursor-pointer transition-all active:scale-95 shrink-0"
                >
                  Search
                </button>
              )}
            </div>
          </form>

          {/* Right Action Items: Cart, User Icon with Dropdown, Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-10 h-10 rounded-full bg-slate-100/90 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-amber-300 flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
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
                    className="text-slate-600 transition-transform duration-300 group-hover:-rotate-12"
                  />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
            </button>

            {/* Cart Capsule Button with #F85606 Count Badge */}
            <button
              onClick={() => dispatch(openCartDrawer())}
              className="relative h-10 px-3.5 sm:px-4 bg-slate-100/90 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 rounded-full flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-dark transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
              title="Shopping Cart"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart size={18} />
              <span className="hidden lg:inline text-xs font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#F85606] text-white text-[11px] font-black min-w-5 h-5 px-1.5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Icon Button + Dropdown (Requested: Just User Icon, Click for Dropdown) */}
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs ${
                  isUserMenuOpen
                    ? "bg-primary text-white ring-2 ring-primary/30 dark:ring-primary-dark/40"
                    : "bg-slate-100/90 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary-dark"
                }`}
                title="Account & Profile"
                aria-label="User Account"
                aria-expanded={isUserMenuOpen}
              >
                {currentUser ? (
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-black uppercase">
                    {currentUser.name ? currentUser.name.charAt(0) : "U"}
                  </div>
                ) : (
                  <User size={18} />
                )}
              </button>

              {/* Luxury Floating Dropdown */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2.5 w-72 sm:w-80 bg-white dark:bg-[#111726] rounded-2xl shadow-2xl border border-slate-200/90 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  role="menu"
                >
                  {currentUser ? (
                    <>
                      {/* Logged-In User Card */}
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl mb-1.5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                          {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                              {currentUser.name}
                            </p>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-primary-soft dark:bg-primary/20 text-primary dark:text-primary-dark rounded">
                              {currentUser.role}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>

                      {/* Logged-In Links */}
                      <div className="space-y-0.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <Link
                          to={currentUser.role === "admin" ? "/admin/dashboard" : "/client/dashboard"}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-dark transition-colors"
                        >
                          <LayoutDashboard size={16} className="text-primary dark:text-primary-dark" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/client/order"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-dark transition-colors"
                        >
                          <Package size={16} className="text-slate-400" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          to="/track-order"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-dark transition-colors"
                        >
                          <Truck size={16} className="text-slate-400" />
                          <span>Track Order</span>
                        </Link>
                        <Link
                          to="/shop?filter=featured"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-dark transition-colors"
                        >
                          <Heart size={16} className="text-slate-400" />
                          <span>Wishlist &amp; Saved</span>
                        </Link>
                      </div>

                      {/* Sign Out Button */}
                      <div className="pt-1.5 mt-1.5 border-t border-slate-100 dark:border-slate-800">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Guest User Welcome Card */}
                      <div className="p-4 bg-gradient-to-br from-primary-light to-white dark:from-[#16203A] dark:to-[#111726] rounded-xl mb-2 border border-primary-border/40 dark:border-slate-800 text-center">
                        <div className="w-11 h-11 rounded-full bg-primary/10 dark:bg-primary/25 text-primary dark:text-primary-dark flex items-center justify-center mx-auto mb-2.5">
                          <User size={22} />
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                          Welcome to SAR Shop
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          Sign in to manage orders, track delivery &amp; access special member perks.
                        </p>

                        <Link
                          to="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="mt-3.5 w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-xs hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Sign In / Register</span>
                        </Link>
                      </div>

                      {/* Guest Quick Links */}
                      <div className="space-y-0.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                        <Link
                          to="/track-order"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-dark transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Truck size={15} className="text-primary dark:text-primary-dark" />
                            <span>Track Order</span>
                          </div>
                          <span className="text-[10px] text-slate-400">Live Status</span>
                        </Link>
                        <Link
                          to="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-dark transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Package size={15} className="text-slate-400" />
                            <span>Order History</span>
                          </div>
                        </Link>
                        <Link
                          to="/top-selling"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-dark transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <Flame size={15} className="text-[#F85606]" />
                            <span>Flash Deals &amp; Offers</span>
                          </div>
                          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-[#F85606] text-white">
                            HOT
                          </span>
                        </Link>
                        <Link
                          to="/contact"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary-dark transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <HelpCircle size={15} className="text-slate-400" />
                            <span>Customer Support</span>
                          </div>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">24/7 Help</span>
                        </Link>
                      </div>

                      {/* Register hint */}
                      <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-400">
                        <span>New to SAR Shop? </span>
                        <Link
                          to="/signup"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="font-bold text-primary dark:text-primary-dark hover:underline"
                        >
                          Create account
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-primary md:hidden cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SUBNAV BAR (Clean Slate Ribbon with Micro Badges)                      */}
      {/* ========================================================================= */}
      <nav className="w-full bg-slate-50/90 dark:bg-[#080D1A]/90 border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors duration-200 hidden md:block">
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
                      ? "bg-primary text-white font-bold shadow-xs dark:bg-primary-dark dark:text-slate-950"
                      : "text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-dark hover:bg-white dark:hover:bg-slate-800 font-medium"
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
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full tracking-wider leading-none bg-[#F85606] text-white shadow-2xs">
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
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
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
          {/* Mobile User Section */}
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl flex items-center justify-between gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary dark:bg-white/10 dark:text-white flex items-center justify-center">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Hello, Guest
                  </p>
                  <p className="text-[11px] text-slate-500">Sign in to your account</p>
                </div>
              </div>
            )}

            {currentUser ? (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold shadow-xs"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="w-full">
            <div className="w-full flex items-center bg-slate-100 dark:bg-slate-800 rounded-full px-4 py-2.5 gap-2.5 border border-slate-200 dark:border-slate-700">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 outline-none"
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
                      ? "bg-primary text-white font-bold shadow-xs dark:bg-primary-dark dark:text-slate-950"
                      : "text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-dark hover:bg-slate-100 dark:hover:bg-slate-800"
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
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#F85606] text-white shadow-2xs">
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
