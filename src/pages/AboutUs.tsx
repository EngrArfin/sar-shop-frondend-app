import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Truck,
  HeartHandshake,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

import {
  ABOUT_STATS as STATS,
  ABOUT_PILLARS,
  ABOUT_VALUES as VALUES,
} from "@/data/shopData";

const PILLAR_ICON_MAP = {
  ShieldCheck,
  Truck,
  HeartHandshake,
  Award,
};

const AboutUs: React.FC = () => {
  return (
    <div className="bg-surface-page dark:bg-[#090D14] text-gray-800 dark:text-gray-100 min-h-screen py-8 sm:py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6 font-['Inter']">
          <Link to="/" className="hover:text-primary dark:hover:text-primary-dark transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-200 font-semibold">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light dark:bg-[#182552]/70 text-primary dark:text-primary-dark mb-3 border border-primary-soft-border dark:border-[#22336B] font-['Inter']">
            <Sparkles size={13} />
            ABOUT SHOB NOW
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Faustina'] text-gray-900 dark:text-white tracking-tight">
            Your Ultimate Shopping Destination in <span className="text-primary dark:text-primary-dark italic">Bangladesh</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-['Inter']">
            Founded with a passion for authentic beauty, skincare, and modern lifestyle products, <strong>SHOB Now</strong> has grown into Bangladesh’s most trusted destination for verified global cosmetics and personal care essentials.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-[#111622] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-xs text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary dark:text-primary-dark mb-1 font-['Faustina']">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-gray-900 dark:text-white">{stat.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-['Inter']">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Our Story & Mission Section */}
        <div className="bg-white dark:bg-[#111622] rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-100 dark:border-gray-800 shadow-xs mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Story Text */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-['Inter']">
                <TrendingUp size={13} />
                OUR STORY & MISSION
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Faustina'] text-gray-900 dark:text-white tracking-tight">
                Authentic Global Brands, Delivered Right to Your Doorstep
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-['Inter']">
                For years, beauty lovers across Bangladesh struggled with rampant counterfeits, unreliable shipping, and inflated prices when trying to purchase top skincare and cosmetic brands from Korea, Japan, the US, and Europe.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-['Inter']">
                <strong>SHOB Now</strong> was created to solve this once and for all. By partnering directly with licensed brand distributors, we guarantee 100% genuine products, fair pricing, and an exceptional customer experience. Today, tens of thousands of happy customers trust us with their daily skincare routines.
              </p>
              <div className="pt-2 flex flex-wrap gap-3 font-['Inter']">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl">
                  <CheckCircle2 size={16} className="text-primary dark:text-primary-dark" />
                  100% Genuine Guaranteed
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl">
                  <CheckCircle2 size={16} className="text-primary dark:text-primary-dark" />
                  Direct Brand Importers
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-xl">
                  <CheckCircle2 size={16} className="text-primary dark:text-primary-dark" />
                  Fast Nationwide Dispatch
                </div>
              </div>
            </div>

            {/* Right Highlight Box */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary-light via-white to-amber-50/40 dark:from-[#0E1E1C] dark:via-[#111622] dark:to-[#181C28] rounded-2xl p-6 sm:p-8 border border-primary-border dark:border-gray-800 shadow-xs text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-md">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold font-['Faustina'] text-gray-900 dark:text-white">
                "SHOB Now — Where Quality Meets Trust"
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-['Inter']">
                "Our promise is simple: we never sell anything we wouldn’t use on ourselves. Every bottle, jar, and tube has verified batch codes, authentic distributor labels, and freshness seals."
              </p>
              <div className="pt-2 text-xs font-bold text-primary dark:text-primary-dark uppercase tracking-wider font-['Inter']">
                — SHOB Now Leadership Team
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-light dark:bg-[#182552]/70 text-primary dark:text-primary-dark mb-2 border border-primary-soft-border dark:border-[#22336B] font-['Inter']">
              <Award size={13} />
              THE SHOB NOW ADVANTAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Faustina'] text-gray-900 dark:text-white">
              Why Hundreds of Thousands Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_PILLARS.map((pillar) => {
              const Icon = PILLAR_ICON_MAP[pillar.iconName];
              return (
                <div
                  key={pillar.title}
                  className="bg-white dark:bg-[#111622] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-light dark:bg-[#182552]/60 text-primary dark:text-primary-dark flex items-center justify-center">
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-primary dark:text-primary-dark bg-primary-soft dark:bg-[#182552] px-2 py-0.5 rounded-full">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-['Faustina'] text-gray-900 dark:text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-['Inter']">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white dark:bg-[#111622] rounded-3xl p-6 sm:p-10 border border-gray-100 dark:border-gray-800 shadow-xs mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold font-['Faustina'] text-gray-900 dark:text-white">Our Core Principles</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 font-['Inter']">
              The values that drive every decision we make each day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-['Inter']">
            {VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="p-5 rounded-2xl bg-gray-50/70 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/60"
              >
                <div className="text-sm font-bold text-primary dark:text-primary-dark mb-1">0{idx + 1}.</div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{val.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-primary via-primary-hover to-primary-deep rounded-3xl p-8 sm:p-12 text-white text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Faustina'] mb-3">
            Experience the SHOB Now Difference
          </h2>
          <p className="text-sm sm:text-base text-teal-50/90 max-w-2xl mx-auto mb-6 font-['Inter']">
            Discover thousands of authentic skincare, makeup, and lifestyle favorites with fast delivery to your door.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-['Inter']">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white text-primary hover:text-primary-hover font-bold text-sm shadow-md hover:bg-neutral-100 transition-all flex items-center justify-center gap-2"
            >
              Shop All Products <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all text-center"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
