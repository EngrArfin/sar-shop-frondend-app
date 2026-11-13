import loginphoto from "@/assets/photo/signup.svg";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ShieldCheck, User as UserIcon, ArrowRight, Lock, Mail, Sparkles, CheckCircle2, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { setUser } from "@/redux/features/auth/authSlice";
import { User } from "@/redux/types/auth.type";
import { toast } from "sonner";

// Helper to generate a valid base64-encoded JWT structure so jwtDecode works seamlessly
const createMockJwt = (payload: { id: string; name: string; email: string; role: User["role"] }) => {
  try {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(
      JSON.stringify({
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400 * 7,
        ...payload,
      })
    );
    return `${header}.${body}.signature`;
  } catch {
    return "mock-jwt-token";
  }
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"admin" | "client">("admin");
  const [isLoading, setIsLoading] = useState(false);

  // Core login handler for specific role
  const handleRoleLogin = (role: "admin" | "client") => {
    setIsLoading(true);

    const userEmail = email.trim() || (role === "admin" ? "admin@shopnow.com" : "client@shopnow.com");
    const userName = role === "admin" ? "System Admin" : "Valued Client";

    const user: User = {
      id: role === "admin" ? "admin-01" : "client-01",
      name: userName,
      email: userEmail,
      role: role,
    };

    const token = createMockJwt({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    // Save to Redux store & persistent cookies
    dispatch(setUser({ user, token }));
    localStorage.setItem("user", JSON.stringify(user));

    const targetRoute = role === "admin" ? "/admin-dashboard" : "/client-dashboard";
    const panelLabel = role === "admin" ? "Admin Panel" : "Client Panel";

    toast.success(`Welcome back! Authenticated as ${role.toUpperCase()}`, {
      description: `Redirecting to ${panelLabel}...`,
    });

    setTimeout(() => {
      setIsLoading(false);
      navigate(targetRoute);
    }, 400);
  };

  // Form submission handler based on selected tab / email
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auto-detect role from email or use selectedRole
    let roleToUse: "admin" | "client" = selectedRole;
    if (email.toLowerCase().includes("admin")) {
      roleToUse = "admin";
    } else if (email.toLowerCase().includes("client")) {
      roleToUse = "client";
    }
    handleRoleLogin(roleToUse);
  };

  return (
    <div className="min-h-screen bg-surface-page dark:bg-[#090D14] flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      <div className="max-w-5xl w-full flex flex-col md:flex-row overflow-hidden rounded-3xl bg-white dark:bg-[#111622] border border-primary-border dark:border-gray-800 shadow-[0_20px_60px_-15px_rgba(15,94,86,0.10)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        {/* Left Side - Luxury Storefront Branding Banner */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary via-primary-hover to-primary-deep p-8 lg:p-10 text-white relative overflow-hidden flex-col justify-between">
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Tagline */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wider uppercase border border-white/20">
              <Sparkles size={13} className="text-teal-200" />
              <span>SHOB Now • Official Store</span>
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold font-['Faustina'] leading-tight mt-4 text-white">
              Radiant Beauty, <br />
              <span className="text-teal-200 italic">Authentic Care.</span>
            </h1>
            <p className="text-teal-50/85 text-xs sm:text-sm mt-2 font-['Inter'] leading-relaxed max-w-sm">
              Discover certified genuine Korean skincare and luxury cosmetics curated for glowing confidence.
            </p>
          </div>

          {/* Illustration Container with Glassmorphism */}
          <div className="relative z-10 my-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner flex items-center justify-center">
            <img
              src={loginphoto}
              alt="Authentication visual"
              className="max-h-56 w-auto object-contain drop-shadow-md"
            />
          </div>

          {/* Bottom Trust Highlights */}
          <div className="relative z-10 pt-4 border-t border-white/15 grid grid-cols-3 gap-2 text-center text-[11px] font-['Inter'] text-teal-50/90">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck size={16} className="text-teal-200" />
              <span>100% Genuine</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck size={16} className="text-teal-200" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CheckCircle2 size={16} className="text-teal-200" />
              <span>Verified Store</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form & Role Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center bg-white dark:bg-[#111622] transition-colors duration-200">
          <div className="mb-6 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider text-primary dark:text-primary-dark uppercase bg-primary-light dark:bg-[#182552]/70 rounded-full border border-primary-soft-border dark:border-[#22336B] mb-2">
              <ShieldCheck size={13} />
              <span>Secure Access</span>
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-['Faustina'] font-bold tracking-tight text-zinc-900 dark:text-white">
              Account Login
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 font-['Inter']">
              Select your panel or enter credentials to continue.
            </p>
          </div>

          {/* Role Selection Tabs */}
          <div className="mb-6">
            <label className="text-xs uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400 mb-2 block font-['Inter']">
              Choose Target Role:
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-800/80 rounded-2xl border border-gray-200/70 dark:border-gray-700">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("admin");
                  if (!email || email === "client@shopnow.com") {
                    setEmail("admin@shopnow.com");
                  }
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedRole === "admin"
                    ? "bg-primary-soft dark:bg-[#182552] text-primary-ink dark:text-[#93C5FD] shadow-xs font-bold"
                    : "text-gray-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-700/60"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-current" />
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("client");
                  if (!email || email === "admin@shopnow.com") {
                    setEmail("client@shopnow.com");
                  }
                }}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedRole === "client"
                    ? "bg-primary-soft dark:bg-[#182552] text-primary-ink dark:text-[#93C5FD] shadow-xs font-bold"
                    : "text-gray-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-700/60"
                }`}
              >
                <UserIcon className="w-4 h-4 text-current" />
                <span>Client</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-zinc-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1.5 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary dark:text-primary-dark" />
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder={selectedRole === "admin" ? "admin@shopnow.com" : "client@shopnow.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 text-zinc-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary-dark focus:ring-2 focus:ring-primary/20 outline-none transition text-sm"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-zinc-800 dark:text-gray-200 text-xs sm:text-sm font-semibold mb-1.5 flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary dark:text-primary-dark" />
                Password
              </label>

              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-gray-50/80 dark:bg-gray-800/60 text-zinc-900 dark:text-white placeholder-gray-400 border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary-dark focus:ring-2 focus:ring-primary/20 outline-none transition shadow-2xs text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 hover:text-primary dark:hover:text-primary-dark transition-colors duration-200 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            {/* Standard Login Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-xs flex items-center justify-center gap-2 mt-2 disabled:opacity-60 active:scale-[0.99]"
            >
              <span>{isLoading ? "Signing In..." : `Login as ${selectedRole === "admin" ? "Admin" : "Client"}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Access Two Buttons */}
          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs uppercase tracking-wider text-center text-gray-500 dark:text-gray-400 mb-3 font-semibold font-['Inter']">
              Quick Role Direct Access
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Admin Panel Button */}
              <button
                type="button"
                id="btn-admin-panel"
                onClick={() => handleRoleLogin("admin")}
                className="w-full group bg-amber-50/80 dark:bg-amber-950/30 hover:bg-amber-100/80 dark:hover:bg-amber-950/50 border border-amber-300/80 dark:border-amber-700/60 py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-300">Admin Panel</span>
              </button>

              {/* Client Panel Button */}
              <button
                type="button"
                id="btn-client-panel"
                onClick={() => handleRoleLogin("client")}
                className="w-full group bg-primary-light dark:bg-[#182552]/50 hover:bg-primary-soft dark:hover:bg-[#182552] border border-primary-soft-border dark:border-[#22336B] py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <UserIcon className="w-4 h-4 text-primary dark:text-primary-dark group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm font-semibold text-primary-ink dark:text-[#93C5FD]">Client Panel</span>
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col items-center justify-center space-y-2 text-sm font-['Inter']">
            <button
              type="button"
              onClick={() => toast.info("Password reset instructions have been simulated.")}
              className="text-xs text-primary dark:text-primary-dark hover:underline cursor-pointer font-medium"
            >
              Forgot Password?
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Don’t have an account?
              <Link to="/signup" className="text-primary dark:text-primary-dark hover:text-primary-hover dark:hover:text-teal-300 ml-1 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
