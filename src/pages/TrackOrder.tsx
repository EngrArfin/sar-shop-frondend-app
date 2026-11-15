import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  Package,
  Truck,
  MapPin,
  Phone,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  X,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { toast } from "sonner";
import { MOCK_PRODUCTS } from "@/data/shopData";

// Order tracking timeline step interface
interface TimelineStep {
  title: string;
  description: string;
  date: string;
  time: string;
  status: "completed" | "current" | "pending";
}

// Order item interface
interface TrackedOrderItem {
  id: string;
  name: string;
  slug: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  volume?: string;
}

// Tracked order interface
interface TrackedOrder {
  orderId: string;
  invoiceNo: string;
  status: "Order Placed" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  statusColor: string;
  progressPercent: number;
  placedDate: string;
  courierName: string;
  courierTrackingCode: string;
  riderPhone: string;
  estimatedDelivery: string;
  paymentMethod: string;
  paymentStatus: "Paid" | "Cash on Delivery" | "Pending";
  timeline: TimelineStep[];
  items: TrackedOrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    division: string;
    country: string;
    phone: string;
    email: string;
  };
}

// Sample mock database matching user screenshot AG-2024-7890 and SAR orders
const SAMPLE_ORDERS: Record<string, TrackedOrder> = {
  "AG-2024-7890": {
    orderId: "AG-2024-7890",
    invoiceNo: "INV-2024-7890",
    status: "Shipped",
    statusColor: "bg-emerald-600",
    progressPercent: 75,
    placedDate: "January 15, 2024",
    courierName: "Steadfast Express",
    courierTrackingCode: "ST-8829104",
    riderPhone: "01711-998877",
    estimatedDelivery: "January 20, 2024",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Cash on Delivery",
    timeline: [
      {
        title: "Order Placed",
        description: "Your order has been received",
        date: "2024-01-15",
        time: "10:30 AM",
        status: "completed",
      },
      {
        title: "Order Confirmed",
        description: "We've confirmed your order",
        date: "2024-01-15",
        time: "11:45 AM",
        status: "completed",
      },
      {
        title: "Order Processed",
        description: "Your items are being prepared for shipment",
        date: "2024-01-16",
        time: "09:15 AM",
        status: "completed",
      },
      {
        title: "Shipped",
        description: "Your order is on the way with Steadfast Express rider",
        date: "2024-01-17",
        time: "02:30 PM",
        status: "current",
      },
      {
        title: "Delivered",
        description: "Expected delivery to your doorstep",
        date: "2024-01-20",
        time: "02:30 PM",
        status: "pending",
      },
    ],
    items: [
      {
        id: "prod-sc-3",
        name: MOCK_PRODUCTS[2]?.name || "COSRX Advanced Snail 96 Mucin Power Essence",
        slug: MOCK_PRODUCTS[2]?.slug || "cosrx-advanced-snail-96-mucin-power-essence",
        brand: "COSRX",
        price: 1650,
        quantity: 1,
        image: MOCK_PRODUCTS[2]?.image || "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80",
        volume: "100 ml",
      },
      {
        id: "prod-sc-4",
        name: MOCK_PRODUCTS[3]?.name || "Beauty of Joseon Relief Sun : Rice + Probiotics SPF50+",
        slug: MOCK_PRODUCTS[3]?.slug || "beauty-of-joseon-relief-sun-rice-probiotics",
        brand: "Beauty of Joseon",
        price: 1450,
        quantity: 1,
        image: MOCK_PRODUCTS[3]?.image || "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
        volume: "50 ml",
      },
    ],
    subtotal: 3100,
    deliveryFee: 0,
    discount: 0,
    total: 3100,
    shippingAddress: {
      fullName: "John Doe",
      street: "123 Main Street, House 45, Road 7",
      city: "Dhanmondi, Dhaka 1205",
      division: "Dhaka",
      country: "Bangladesh",
      phone: "+880 1700-000000",
      email: "johndoe@example.com",
    },
  },
  "SAR-982145": {
    orderId: "SAR-982145",
    invoiceNo: "INV-2024-9821",
    status: "Delivered",
    statusColor: "bg-emerald-600",
    progressPercent: 100,
    placedDate: "February 02, 2024",
    courierName: "Pathao Courier",
    courierTrackingCode: "PT-7731920",
    riderPhone: "01822-445566",
    estimatedDelivery: "February 04, 2024",
    paymentMethod: "bKash Online Payment",
    paymentStatus: "Paid",
    timeline: [
      {
        title: "Order Placed",
        description: "Your order has been received",
        date: "2024-02-02",
        time: "08:15 AM",
        status: "completed",
      },
      {
        title: "Order Confirmed",
        description: "Payment verified via bKash gateway",
        date: "2024-02-02",
        time: "08:30 AM",
        status: "completed",
      },
      {
        title: "Order Processed",
        description: "Dispatched from central authentic warehouse",
        date: "2024-02-03",
        time: "11:20 AM",
        status: "completed",
      },
      {
        title: "Shipped",
        description: "Handed over to Pathao Express rider",
        date: "2024-02-03",
        time: "04:10 PM",
        status: "completed",
      },
      {
        title: "Delivered",
        description: "Successfully delivered and signed by customer",
        date: "2024-02-04",
        time: "01:45 PM",
        status: "completed",
      },
    ],
    items: [
      {
        id: "prod-tirtir-ampoule",
        name: MOCK_PRODUCTS[0]?.name || "Tirtir Ceramic Milk Ampoule",
        slug: MOCK_PRODUCTS[0]?.slug || "tirtir-ceramic-milk-ampoule",
        brand: "Tirtir",
        price: 2999,
        quantity: 1,
        image: MOCK_PRODUCTS[0]?.image || "https://choicelegacy.com.bd/cdn/shop/files/imgi_7_1_105982fa-cfe5-443f-b13b-cad0f6355e8b.webp?v=1777210432",
        volume: "40 ml",
      },
    ],
    subtotal: 2999,
    deliveryFee: 0,
    discount: 200,
    total: 2799,
    shippingAddress: {
      fullName: "Anika Rahman",
      street: "Plot 14, Block C, Banani",
      city: "Dhaka 1213",
      division: "Dhaka",
      country: "Bangladesh",
      phone: "+880 1812-345678",
      email: "anika.rahman@example.com",
    },
  },
  "SAR-349012": {
    orderId: "SAR-349012",
    invoiceNo: "INV-2024-3490",
    status: "Processing",
    statusColor: "bg-blue-600",
    progressPercent: 45,
    placedDate: "February 12, 2024",
    courierName: "RedX Delivery",
    courierTrackingCode: "Pending Assignment",
    riderPhone: "01933-556677",
    estimatedDelivery: "February 16, 2024",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Cash on Delivery",
    timeline: [
      {
        title: "Order Placed",
        description: "Your order has been received",
        date: "2024-02-12",
        time: "04:00 PM",
        status: "completed",
      },
      {
        title: "Order Confirmed",
        description: "Automated phone confirmation complete",
        date: "2024-02-12",
        time: "05:15 PM",
        status: "completed",
      },
      {
        title: "Order Processed",
        description: "Quality batch check and secure bubble wrapping in progress",
        date: "2024-02-13",
        time: "10:00 AM",
        status: "current",
      },
      {
        title: "Shipped",
        description: "Will be dispatched via RedX Express",
        date: "2024-02-14",
        time: "Pending",
        status: "pending",
      },
      {
        title: "Delivered",
        description: "Estimated delivery to recipient",
        date: "2024-02-16",
        time: "Pending",
        status: "pending",
      },
    ],
    items: [
      {
        id: "prod-sc-2",
        name: MOCK_PRODUCTS[1]?.name || "SKIN1004 Madagascar Centella Asiatica 100 Ampoule",
        slug: MOCK_PRODUCTS[1]?.slug || "skin1004-madagascar-centella-ampoule",
        brand: "SKIN1004",
        price: 1850,
        quantity: 1,
        image: MOCK_PRODUCTS[1]?.image || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80",
        volume: "100 ml",
      },
      {
        id: "prod-sc-5",
        name: MOCK_PRODUCTS[4]?.name || "Anua Heartleaf 77% Soothing Toner",
        slug: MOCK_PRODUCTS[4]?.slug || "anua-heartleaf-77-soothing-toner",
        brand: "Anua",
        price: 2100,
        quantity: 1,
        image: MOCK_PRODUCTS[4]?.image || "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80",
        volume: "250 ml",
      },
    ],
    subtotal: 3950,
    deliveryFee: 0,
    discount: 150,
    total: 3800,
    shippingAddress: {
      fullName: "Tanvir Ahmed",
      street: "GEC Circle, O.R. Nizam Road",
      city: "Chattogram 4000",
      division: "Chattogram",
      country: "Bangladesh",
      phone: "+880 1911-223344",
      email: "tanvir.ctg@example.com",
    },
  },
};

// Generate dynamic order for any user input or phone number
function generateDynamicOrder(idOrPhone: string): TrackedOrder {
  const cleanStr = idOrPhone.trim().toUpperCase();
  const sampleProducts = [
    MOCK_PRODUCTS[0] || {
      id: "prod-1",
      name: "Tirtir Ceramic Milk Ampoule",
      slug: "tirtir-ceramic-milk-ampoule",
      brand: "Tirtir",
      price: 2999,
      image: "https://choicelegacy.com.bd/cdn/shop/files/imgi_7_1_105982fa-cfe5-443f-b13b-cad0f6355e8b.webp?v=1777210432",
    },
    MOCK_PRODUCTS[2] || {
      id: "prod-2",
      name: "COSRX Advanced Snail 96 Mucin Power Essence",
      slug: "cosrx-advanced-snail-96-mucin-power-essence",
      brand: "COSRX",
      price: 1650,
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=700&q=80",
    },
  ];

  const generatedId = cleanStr.startsWith("01") ? `SAR-${Math.floor(100000 + Math.random() * 900000)}` : cleanStr;

  return {
    orderId: generatedId,
    invoiceNo: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
    status: "Shipped",
    statusColor: "bg-emerald-600",
    progressPercent: 70,
    placedDate: "January 15, 2024",
    courierName: "Steadfast Express",
    courierTrackingCode: `ST-${Math.floor(1000000 + Math.random() * 9000000)}`,
    riderPhone: "01700-000000",
    estimatedDelivery: "In 2-3 Business Days",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Cash on Delivery",
    timeline: [
      {
        title: "Order Placed",
        description: "Your order has been received in our system",
        date: "2024-01-15",
        time: "10:30 AM",
        status: "completed",
      },
      {
        title: "Order Confirmed",
        description: "Order authenticity & items verified by specialist",
        date: "2024-01-15",
        time: "11:45 AM",
        status: "completed",
      },
      {
        title: "Order Processed",
        description: "Packed securely with bubble wrap protection",
        date: "2024-01-16",
        time: "09:15 AM",
        status: "completed",
      },
      {
        title: "Shipped",
        description: "Dispatched from central hub and on the way",
        date: "2024-01-17",
        time: "02:30 PM",
        status: "current",
      },
      {
        title: "Delivered",
        description: "Expected delivery to your shipping address",
        date: "2024-01-20",
        time: "02:30 PM",
        status: "pending",
      },
    ],
    items: sampleProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      brand: p.brand || "Authentic K-Beauty",
      price: p.price,
      quantity: 1,
      image: p.image,
      volume: "Standard Edition",
    })),
    subtotal: sampleProducts.reduce((sum, p) => sum + p.price, 0),
    deliveryFee: 0,
    discount: 0,
    total: sampleProducts.reduce((sum, p) => sum + p.price, 0),
    shippingAddress: {
      fullName: "Verified Customer",
      street: "123 Main Street, Sector 4, Uttara",
      city: "Dhaka 1230",
      division: "Dhaka",
      country: "Bangladesh",
      phone: cleanStr.startsWith("01") ? cleanStr : "+880 1700-000000",
      email: "customer@sarshop.com",
    },
  };
}

export const TrackOrder: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<TrackedOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Auto-search if orderId exists in URL
  useEffect(() => {
    if (initialOrderId.trim()) {
      handleSearch(initialOrderId.trim());
    }
  }, [initialOrderId]);

  const handleSearch = (idToSearch?: string) => {
    const targetId = (idToSearch || orderIdInput).trim();
    if (!targetId) {
      toast.error("Please enter a valid Order ID or Phone number to track.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const upper = targetId.toUpperCase();
      // Match by order ID or phone number
      const matched =
        SAMPLE_ORDERS[upper] ||
        SAMPLE_ORDERS[targetId] ||
        Object.values(SAMPLE_ORDERS).find(
          (o) => o.shippingAddress.phone.includes(targetId) || o.shippingAddress.phone.replace(/[^0-9]/g, "").includes(targetId.replace(/[^0-9]/g, ""))
        ) ||
        generateDynamicOrder(targetId);

      setActiveOrder(matched);
      setIsLoading(false);
      setSearchParams({ orderId: targetId });
      toast.success(`Tracking details loaded for ${matched.orderId}`);
    }, 400);
  };

  const handleCopyOrderId = () => {
    if (!activeOrder) return;
    navigator.clipboard.writeText(activeOrder.orderId);
    setIsCopied(true);
    toast.success("Order ID copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    setIsVoucherModalOpen(true);
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setNewsletterSuccess(true);
    toast.success("Thank you for subscribing to our newsletter!");
    setNewsletterEmail("");
  };

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-[#090D14] min-h-screen py-10 sm:py-16 transition-colors duration-200">
      {/* Print Stylesheet injection to ensure ONLY the voucher prints cleanly */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-voucher-container, #printable-voucher-container * {
            visibility: visible !important;
          }
          #printable-voucher-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="max-w-[880px] mx-auto px-4 sm:px-6">
        {/* Page Title & Subtitle (Aligned with Faustina Serif & Brand Sapphire) */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-soft dark:bg-[#182552] border border-primary-soft-border/70 dark:border-[#22336B] mb-2.5">
            <ShieldCheck size={14} className="text-primary dark:text-primary-dark" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-ink dark:text-[#93C5FD] font-inter">
              Live Parcel Verification
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-faustina font-bold text-gray-900 dark:text-white tracking-tight">
            Track Your Order
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-inter mt-2 max-w-md mx-auto">
            Enter your order ID or mobile number to check real-time dispatch and delivery status.
          </p>
        </div>

        {/* 1. FIND YOUR ORDER CARD */}
        <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-black/[0.08] dark:border-gray-800 shadow-xs mb-6 transition-all">
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-inter">
              Find Your Order
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-0.5">
              Enter your order ID or phone number to track your parcel
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="orderId"
                className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5 font-inter"
              >
                Order ID or Phone Number:
              </label>
              <div className="relative">
                <input
                  id="orderId"
                  type="text"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="e.g. AG-2024-7890 or 01700-000000"
                  className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 focus:border-primary dark:focus:border-primary-dark focus:bg-white dark:focus:bg-[#0D1424] text-sm text-gray-900 dark:text-white placeholder:text-gray-400 transition-all outline-none font-inter"
                />
                {orderIdInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setOrderIdInput("");
                      setActiveOrder(null);
                      setSearchParams({});
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Quick Sample Orders Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-gray-400 dark:text-gray-500 font-medium">Quick sample:</span>
              <button
                type="button"
                onClick={() => {
                  setOrderIdInput("AG-2024-7890");
                  handleSearch("AG-2024-7890");
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-primary-soft dark:bg-slate-800 dark:hover:bg-[#182552] text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-dark font-medium transition-colors cursor-pointer border border-slate-200/70 dark:border-slate-700"
              >
                AG-2024-7890 (Shipped)
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderIdInput("SAR-982145");
                  handleSearch("SAR-982145");
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-primary-soft dark:bg-slate-800 dark:hover:bg-[#182552] text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-dark font-medium transition-colors cursor-pointer border border-slate-200/70 dark:border-slate-700"
              >
                SAR-982145 (Delivered)
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderIdInput("SAR-349012");
                  handleSearch("SAR-349012");
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-primary-soft dark:bg-slate-800 dark:hover:bg-[#182552] text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary-dark font-medium transition-colors cursor-pointer border border-slate-200/70 dark:border-slate-700"
              >
                SAR-349012 (Processing)
              </button>
            </div>

            {/* Track Order Button (Royal Sapphire Navy) */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-inter font-semibold text-sm transition-all duration-200 shadow-xs cursor-pointer disabled:opacity-60"
              >
                <Search size={16} />
                <span>{isLoading ? "Locating Parcel..." : "Track Order"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* RESULTS SECTION (IF ORDER LOADED) */}
        {activeOrder && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* 2. ORDER HEADER SUMMARY CARD */}
            <div className="bg-white dark:bg-[#111726] rounded-[20px] p-5 sm:p-6 border border-black/[0.08] dark:border-gray-800 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-inter">
                      Order {activeOrder.orderId}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-emerald-600 shadow-2xs">
                      {activeOrder.status}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyOrderId}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1 cursor-pointer"
                      title="Copy Order ID"
                    >
                      {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-1">
                    Placed on {activeOrder.placedDate} • {activeOrder.items.length}{" "}
                    {activeOrder.items.length === 1 ? "Item" : "Items"} • Invoice: #{activeOrder.invoiceNo}
                  </p>
                </div>

                {/* Print Voucher Action Button (Opens Official Voucher Preview) */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-primary-soft hover:bg-primary-soft-hover dark:bg-[#182552] dark:hover:bg-[#1E2D63] text-primary-ink dark:text-[#93C5FD] border border-primary-soft-border dark:border-[#22336B] text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95"
                  >
                    <FileText size={15} />
                    <span>Print Voucher</span>
                  </button>
                </div>
              </div>

              {/* Progress Bar & Courier info banner */}
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800/80 space-y-3">
                {/* Visual Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-primary dark:text-primary-dark font-inter">
                      Delivery Progress ({activeOrder.progressPercent}%)
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Est. Arrival: {activeOrder.estimatedDelivery}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: `${activeOrder.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Courier info pill banner */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-300 pt-1">
                  <div className="flex items-center gap-2">
                    <Truck size={15} className="text-primary dark:text-primary-dark" />
                    <span>
                      Courier: <strong className="text-gray-900 dark:text-white">{activeOrder.courierName}</strong>
                    </span>
                    <span className="text-gray-300 dark:text-gray-700">•</span>
                    <span>
                      Consignment:{" "}
                      <strong className="font-mono text-gray-900 dark:text-white">
                        {activeOrder.courierTrackingCode}
                      </strong>
                    </span>
                  </div>
                  <a
                    href={`tel:${activeOrder.riderPhone}`}
                    className="inline-flex items-center gap-1 text-primary dark:text-primary-dark hover:underline font-semibold"
                  >
                    <Phone size={13} />
                    <span>Call Rider ({activeOrder.riderPhone})</span>
                  </a>
                </div>
              </div>
            </div>

            {/* 3. ORDER TIMELINE CARD (Vertical Stepper) */}
            <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-black/[0.08] dark:border-gray-800 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-inter mb-6">
                Order Timeline
              </h3>

              <div className="relative pl-2 sm:pl-4 space-y-7">
                {activeOrder.timeline.map((step, idx) => {
                  const isCompleted = step.status === "completed";
                  const isCurrent = step.status === "current";
                  const isPending = step.status === "pending";
                  const isLast = idx === activeOrder.timeline.length - 1;

                  return (
                    <div key={idx} className="relative flex items-start gap-4 sm:gap-5 group">
                      {/* Vertical connecting line */}
                      {!isLast && (
                        <div
                          className={`absolute left-[13px] sm:left-[15px] top-[28px] bottom-[-28px] w-[2px] transition-colors ${
                            isCompleted ? "bg-emerald-500" : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      )}

                      {/* Step Indicator Icon */}
                      <div className="relative z-10 shrink-0">
                        {isCompleted && (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                            <Check size={16} strokeWidth={3} />
                          </div>
                        )}
                        {isCurrent && (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-emerald-100 dark:ring-emerald-950/60 shadow-xs animate-pulse">
                            <Check size={16} strokeWidth={3} />
                          </div>
                        )}
                        {isPending && (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                            <Package size={15} />
                          </div>
                        )}
                      </div>

                      {/* Step Details */}
                      <div className="flex-1 min-w-0 pt-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`text-sm sm:text-base font-bold font-inter ${
                              isCompleted || isCurrent
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {step.title}
                          </h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-600 text-white shadow-2xs">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-0.5">
                          {step.description}
                        </p>
                        <p className="text-[11px] sm:text-xs font-mono text-gray-400 dark:text-gray-500 mt-1">
                          {step.date} <span className="mx-1">•</span> {step.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. ORDER ITEMS CARD */}
            <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-black/[0.08] dark:border-gray-800 shadow-xs">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-inter mb-4 sm:mb-5">
                Order Items
              </h3>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {activeOrder.items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-4 flex items-center gap-4">
                    {/* Item Image with Fallback */}
                    <Link
                      to={`/product/${item.slug}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-50 dark:bg-slate-900 p-1.5 shrink-0 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src =
                            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80";
                        }}
                      />
                    </Link>

                    {/* Item Name, Brand & Qty */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary dark:text-primary-dark block mb-0.5">
                        {item.brand}
                      </span>
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-dark transition-colors line-clamp-1 sm:line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Qty: {item.quantity}</span>
                        {item.volume && (
                          <>
                            <span>•</span>
                            <span>{item.volume}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Item Price (Electric Orange Highlight) */}
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-inter">
                        ৳{item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Items Financial Breakdown */}
              <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ৳{activeOrder.subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span className="text-emerald-600 font-semibold">
                    {activeOrder.deliveryFee === 0 ? "FREE Express Delivery" : `৳${activeOrder.deliveryFee}`}
                  </span>
                </div>
                {activeOrder.discount > 0 && (
                  <div className="flex justify-between text-[#F85606]">
                    <span>Promotional Discount:</span>
                    <span>-৳{activeOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-100 dark:border-gray-800 text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                  <span>
                    Total Amount ({activeOrder.items.length} {activeOrder.items.length === 1 ? "item" : "items"}):
                  </span>
                  <span className="text-primary dark:text-primary-dark">
                    ৳{activeOrder.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. SHIPPING ADDRESS CARD */}
            <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-black/[0.08] dark:border-gray-800 shadow-xs">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white mb-4">
                <MapPin size={18} className="text-primary dark:text-primary-dark" />
                <h3 className="text-base sm:text-lg font-bold font-inter">
                  Shipping Address
                </h3>
              </div>

              <div className="space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-inter leading-relaxed">
                <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                  {activeOrder.shippingAddress.fullName}
                </p>
                <p>{activeOrder.shippingAddress.street}</p>
                <p>{activeOrder.shippingAddress.city}</p>
                <p>{activeOrder.shippingAddress.country}</p>
                <p className="pt-1 text-gray-500 dark:text-gray-400 font-mono">
                  {activeOrder.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 6. NEED HELP WITH YOUR ORDER? CARD (Harmonious brand palette) */}
        <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-black/[0.08] dark:border-gray-800 shadow-xs my-6 text-center">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-inter">
            Need Help with Your Order?
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-1 max-w-md mx-auto">
            Our specialized customer care team is available 7 days a week to assist with dispatch inquiries.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
            >
              Contact Support
            </Link>
            <a
              href="tel:01700000000"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-2xs"
            >
              <Phone size={14} className="text-primary dark:text-primary-dark" />
              <span>01700-000000</span>
            </a>
          </div>
        </div>

        {/* 7. GET NOTIFIED / NEWSLETTER BOTTOM BANNER (Aligned with Brand Sapphire Tint) */}
        <div className="rounded-[20px] p-6 sm:p-8 bg-gradient-to-r from-primary-soft/70 via-white to-primary-soft/50 dark:from-[#111726] dark:via-[#182552]/40 dark:to-[#111726] border border-primary/20 dark:border-gray-800 mt-10 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-lg sm:text-xl font-faustina font-bold text-gray-900 dark:text-white">
                Get notified when we launch new brands
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-inter mt-1 leading-relaxed">
                Stay up to date with verified Korean imports, exclusive flash sales, and shipment notices.
              </p>
            </div>

            {newsletterSuccess ? (
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold text-sm bg-emerald-50 dark:bg-emerald-950/50 px-4 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <Check size={18} />
                <span>You're subscribed! We'll notify you with new arrivals.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex items-center gap-2.5 w-full md:w-auto"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 px-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary-dark w-full md:w-64 shadow-2xs"
                />
                <button
                  type="submit"
                  className="h-11 px-6 rounded-xl bg-primary hover:bg-primary-hover active:scale-95 text-white text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 8. OFFICIAL PRINTABLE TAX INVOICE & DELIVERY VOUCHER MODAL */}
      {isVoucherModalOpen && activeOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-[820px] max-h-[92vh] overflow-y-auto bg-white dark:bg-[#0D1424] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col">
            {/* Modal Top Control Bar (Hidden on print) */}
            <div className="no-print sticky top-0 z-20 flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-primary dark:text-primary-dark" />
                <span className="font-bold text-sm text-gray-900 dark:text-white font-inter">
                  Delivery Voucher Preview
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTriggerPrint}
                  className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  <Printer size={14} />
                  <span>Print (A4)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsVoucherModalOpen(false)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Printable Voucher Paper Canvas */}
            <div
              id="printable-voucher-container"
              className="p-6 sm:p-10 bg-white text-gray-900 font-inter text-xs leading-normal"
            >
              {/* Voucher Header: Company Brand & Official Invoice Title */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-2 border-primary">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-black tracking-tight font-faustina text-primary">
                      SAR SHOP
                    </span>
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase tracking-wider bg-primary/10 text-primary rounded">
                      Official Tax Invoice
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Premier Authentic South Korean Cosmetics &amp; Skincare
                  </p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    House 24, Road 11, Dhanmondi, Dhaka-1205, Bangladesh
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Helpline: <strong>01700-000000</strong> • orders@sarshop.com.bd
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="inline-block px-3 py-1 bg-slate-100 rounded text-xs font-mono font-bold text-gray-800">
                    {activeOrder.invoiceNo}
                  </span>
                  <div className="mt-2 space-y-0.5 text-[11px] text-gray-600">
                    <p>
                      Order ID: <strong>{activeOrder.orderId}</strong>
                    </p>
                    <p>Date: {activeOrder.placedDate}</p>
                    <p>
                      Status:{" "}
                      <span className="font-bold text-emerald-700">
                        {activeOrder.status.toUpperCase()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Two-Column Billing & Shipping Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-gray-200">
                {/* Billed & Shipped to */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                    Customer Information (Deliver To)
                  </h4>
                  <div className="space-y-1 text-gray-700">
                    <p className="font-bold text-sm text-gray-900">
                      {activeOrder.shippingAddress.fullName}
                    </p>
                    <p>{activeOrder.shippingAddress.street}</p>
                    <p>{activeOrder.shippingAddress.city}</p>
                    <p>{activeOrder.shippingAddress.country}</p>
                    <p className="pt-1 font-mono text-xs">
                      Phone: <strong>{activeOrder.shippingAddress.phone}</strong>
                    </p>
                  </div>
                </div>

                {/* Logistics & Payment Information */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-primary mb-2">
                    Shipping &amp; Payment Logistics
                  </h4>
                  <div className="space-y-1 text-gray-700">
                    <p>
                      Courier Partner: <strong>{activeOrder.courierName}</strong>
                    </p>
                    <p>
                      Consignment Code:{" "}
                      <strong className="font-mono">{activeOrder.courierTrackingCode}</strong>
                    </p>
                    <p>
                      Delivery Rider: <strong>{activeOrder.riderPhone}</strong>
                    </p>
                    <p className="pt-1">
                      Payment Mode:{" "}
                      <span className="font-bold text-primary">
                        {activeOrder.paymentMethod} ({activeOrder.paymentStatus})
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Itemized Products Table */}
              <div className="py-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-gray-700">
                      <th className="py-2.5 px-3 w-10">#</th>
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3 w-28">Brand</th>
                      <th className="py-2.5 px-3 w-16 text-center">Qty</th>
                      <th className="py-2.5 px-3 w-24 text-right">Unit Price</th>
                      <th className="py-2.5 px-3 w-28 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {activeOrder.items.map((item, idx) => (
                      <tr key={item.id} className="text-gray-800">
                        <td className="py-3 px-3 font-mono text-gray-500">{idx + 1}</td>
                        <td className="py-3 px-3">
                          <p className="font-bold text-gray-900">{item.name}</p>
                          {item.volume && (
                            <p className="text-[10px] text-gray-500">Volume: {item.volume}</p>
                          )}
                        </td>
                        <td className="py-3 px-3 text-gray-600 font-semibold">{item.brand}</td>
                        <td className="py-3 px-3 text-center font-mono">{item.quantity}</td>
                        <td className="py-3 px-3 text-right font-mono">
                          ৳{item.price.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-right font-mono font-bold text-gray-900">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Financial Summary Calculation Table */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-gray-200">
                {/* 100% Authenticity Guarantee Badge */}
                <div className="max-w-xs space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 text-primary font-bold text-xs">
                    <BadgeCheck size={16} />
                    <span>Official Authenticity Guarantee</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    100% genuine South Korean imported batch. Retain this invoice and unopened seals for 7-day hassle-free exchange.
                  </p>
                </div>

                {/* Totals */}
                <div className="w-full sm:w-64 space-y-1.5 text-xs text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono font-semibold">
                      ৳{activeOrder.subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span className="font-mono text-emerald-700">
                      {activeOrder.deliveryFee === 0 ? "৳0 (Free)" : `৳${activeOrder.deliveryFee}`}
                    </span>
                  </div>
                  {activeOrder.discount > 0 && (
                    <div className="flex justify-between text-[#F85606]">
                      <span>Discount:</span>
                      <span className="font-mono">-৳{activeOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t-2 border-primary text-sm font-bold text-gray-900">
                    <span>Total Payable:</span>
                    <span className="font-mono text-primary text-base">
                      ৳{activeOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Signatures & Seal Lines */}
              <div className="grid grid-cols-2 gap-10 pt-12 mt-6 border-t border-dashed border-gray-300 text-center text-[11px] text-gray-500">
                <div>
                  <div className="w-40 mx-auto border-b border-gray-400 mb-1" />
                  <p>Customer Signature</p>
                </div>
                <div>
                  <div className="w-40 mx-auto border-b border-gray-400 mb-1" />
                  <p>Authorized SAR Shop Dispatch Officer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
