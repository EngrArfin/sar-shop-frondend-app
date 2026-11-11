import signupphoto from "@/assets/photo/signup.svg";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ShieldCheck, User as UserIcon, Lock, Mail, Phone, Sparkles, CheckCircle2, Truck, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (password !== retypePassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!agreeTerms) {
      toast.error("Please agree to the Terms & Privacy Policy.");
      return;
    }

    setIsLoading(true);
    toast.success("Account created successfully!", {
      description: "Welcome to KC Bazar. Please login to continue.",
    });

    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] dark:bg-[#090D14] flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="max-w-5xl w-full flex flex-col md:flex-row overflow-hidden rounded-3xl bg-white dark:bg-[#111622] border border-pink-100/80 dark:border-gray-800 shadow-[0_20px_60px_-15px_rgba(162,14,76,0.08)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* Left Side - Luxury Beauty Branding Banner */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#A20E4C] via-[#7E0B3B] to-[#4A0623] p-8 lg:p-10 text-white relative overflow-hidden flex-col justify-between">
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-rose-300/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Tagline */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wider uppercase border border-white/20">
              <Sparkles size={13} className="text-pink-200" />
              <span>SHOB Now • VIP Beauty Club</span>
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold font-['Faustina'] leading-tight mt-4 text-white">
              Unlock Exclusive <br />
              <span className="text-pink-200 italic">Beauty Privileges.</span>
            </h1>
            <p className="text-pink-100/80 text-xs sm:text-sm mt-2 font-['Inter'] leading-relaxed max-w-sm">
              Sign up today to receive 15% off on your first order, free beauty consultations, and early access to new arrivals.
            </p>
          </div>

          {/* Illustration Container with Glassmorphism */}
          <div className="relative z-10 my-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner flex items-center justify-center">
            <img
              src={signupphoto}
              alt="Sign up visual"
              className="max-h-56 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Bottom Trust Highlights */}
          <div className="relative z-10 pt-4 border-t border-white/15 grid grid-cols-3 gap-2 text-center text-[11px] font-['Inter'] text-pink-100/90">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={16} className="text-pink-200" />
              <span>100% Genuine</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck size={16} className="text-pink-200" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckCircle2 size={16} className="text-pink-200" />
              <span>VIP Rewards</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-[#111622] transition-colors duration-200">
          <div className="mb-6 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider text-pink-800 dark:text-pink-300 uppercase bg-pink-50 dark:bg-pink-950/40 rounded-full border border-pink-200/60 dark:border-pink-900/50 mb-2">
              <Sparkles size={13} />
              <span>Create Account</span>
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-['Faustina'] font-bold tracking-tight text-zinc-900 dark:text-white">
              Join SHOB Now
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 font-['Inter']">
              Sign up to get started and access personalized beauty recommendations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-zinc-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1 flex items-center gap-2">
                <UserIcon className="w-3.5 h-3.5 text-pink-800 dark:text-pink-400" />
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="Paula Oxford"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 text-zinc-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:border-pink-800 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-800/20 outline-none transition text-sm"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label htmlFor="number" className="text-zinc-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-pink-800 dark:text-pink-400" />
                Phone Number
              </label>
              <input
                id="number"
                type="tel"
                placeholder="+880 1700-000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 text-zinc-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:border-pink-800 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-800/20 outline-none transition text-sm"
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-zinc-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-pink-800 dark:text-pink-400" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 text-zinc-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:border-pink-800 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-800/20 outline-none transition text-sm"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-zinc-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-pink-800 dark:text-pink-400" />
                Password
              </label>

              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 pr-12 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 text-zinc-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:border-pink-800 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-800/20 outline-none transition text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-pink-800 dark:hover:text-pink-400 transition-colors duration-200 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                </button>
              </div>
            </div>

            {/* Re-type Password */}
            <div className="flex flex-col">
              <label htmlFor="retypePassword" className="text-zinc-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-pink-800 dark:text-pink-400" />
                Confirm Password
              </label>

              <div className="relative w-full">
                <input
                  id="retypePassword"
                  type={showRetypePassword ? "text" : "password"}
                  required
                  placeholder="Re-enter your password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 pr-12 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 text-zinc-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:border-pink-800 dark:focus:border-pink-500 focus:ring-2 focus:ring-pink-800/20 outline-none transition text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-pink-800 dark:hover:text-pink-400 transition-colors duration-200 focus:outline-none cursor-pointer"
                  aria-label={showRetypePassword ? "Hide password" : "Show password"}
                >
                  {showRetypePassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="rounded border-gray-300 text-pink-800 focus:ring-pink-800 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400 select-none cursor-pointer">
                I agree to the{" "}
                <Link to="/terms" className="text-pink-800 dark:text-pink-400 hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="text-pink-800 dark:text-pink-400 hover:underline font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Register Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#FFE2FF] hover:bg-[#ffd1ff] text-[#500624] font-bold py-3 sm:py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center gap-2 mt-2 disabled:opacity-60 active:scale-[0.99]"
            >
              <span>{isLoading ? "Creating Account..." : "Create Free Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-5 text-center font-['Inter']">
            Already have an account?
            <Link to="/login" className="text-pink-800 dark:text-pink-400 hover:text-pink-900 dark:hover:text-pink-300 ml-1 font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
