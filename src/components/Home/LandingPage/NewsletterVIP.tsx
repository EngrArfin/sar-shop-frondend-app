import React, { useState } from "react";
import { toast } from "sonner";

export const NewsletterVIP: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }

    toast.success("Thank you for subscribing!", {
      description: "You will receive our latest updates and exclusive offers.",
    });
    setEmail("");
  };

  return (
    <section className="w-full bg-surface-page dark:bg-[#090D14] py-8 sm:py-12 transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* VIP Container */}
        <div className="w-full bg-primary-light dark:bg-[#0E1E1C] rounded-xl py-12 px-6 sm:px-10 lg:px-14 shadow-2xs border border-primary-border dark:border-[#1D3B37] transition-colors duration-200">
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 max-w-2xl text-center lg:text-left">
              <h3 className="text-2xl sm:text-[24px] font-faustina font-semibold text-[#1B1E23] dark:text-white leading-[28.8px] tracking-tight">
                Get notified when we launch
              </h3>
              <p className="mt-2 text-sm sm:text-base font-inter font-normal text-[#33373F] dark:text-gray-300 leading-6">
                Stay up to date with the latest news, announcements, and articles.
              </p>
            </div>

            {/* Right Email Form */}
            <form
              onSubmit={handleSubmit}
              className="w-full lg:w-[420px] flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shrink-0"
            >
              <div className="w-full flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 bg-surface-card dark:bg-gray-800 text-[#1B1E23] dark:text-white placeholder-[#717680] dark:placeholder-gray-400 text-base font-inter rounded-lg border border-primary-border dark:border-gray-700 focus:outline-none focus:border-primary dark:focus:border-primary-dark shadow-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-inter font-bold text-lg leading-[23.4px] rounded-lg transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterVIP;
