import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  Package,
  Truck,
  Clock,
  MapPin,
  Phone,
  Copy,
  Check,
  Printer,
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
  status: "Order Placed" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  statusColor: string;
  placedDate: string;
  courierName: string;
  courierTrackingCode: string;
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
    status: "Shipped",
    statusColor: "bg-emerald-500",
    placedDate: "January 15, 2024",
    courierName: "Steadfast Express",
    courierTrackingCode: "ST-8829104",
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
    status: "Delivered",
    statusColor: "bg-emerald-600",
    placedDate: "February 02, 2024",
    courierName: "Pathao Courier",
    courierTrackingCode: "PT-7731920",
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
    status: "Processing",
    statusColor: "bg-blue-600",
    placedDate: "February 12, 2024",
    courierName: "RedX Delivery",
    courierTrackingCode: "Pending Assignment",
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
        description: "Will be dispatched via RedX",
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

// Generate dynamic order for any user input
function generateDynamicOrder(id: string): TrackedOrder {
  const cleanId = id.trim().toUpperCase();
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

  return {
    orderId: cleanId,
    status: "Shipped",
    statusColor: "bg-emerald-500",
    placedDate: "January 15, 2024",
    courierName: "Steadfast Express",
    courierTrackingCode: `ST-${Math.floor(1000000 + Math.random() * 9000000)}`,
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
      phone: "+880 1700-000000",
      email: "customer@example.com",
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
      toast.error("Please enter a valid Order ID to track.");
      return;
    }

    setIsLoading(true);
    // Smooth lookup animation
    setTimeout(() => {
      const upper = targetId.toUpperCase();
      const matched = SAMPLE_ORDERS[upper] || SAMPLE_ORDERS[targetId] || generateDynamicOrder(targetId);
      setActiveOrder(matched);
      setIsLoading(false);
      setSearchParams({ orderId: targetId });
      toast.success(`Tracking details loaded for ${matched.orderId}`);
    }, 450);
  };

  const handleCopyOrderId = () => {
    if (!activeOrder) return;
    navigator.clipboard.writeText(activeOrder.orderId);
    setIsCopied(true);
    toast.success("Order ID copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
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
      <div className="max-w-[880px] mx-auto px-4 sm:px-6">
        {/* Page Title & Subtitle (Exact Faustina Serif Heading) */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-faustina font-bold text-gray-900 dark:text-white tracking-tight">
            Track Your Order
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-inter mt-2 max-w-md mx-auto">
            Enter your order details to check the current status
          </p>
        </div>

        {/* 1. FIND YOUR ORDER CARD */}
        <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm mb-6 transition-all">
          <div className="mb-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-inter">
              Find Your Order
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-0.5">
              Enter your order ID to track your order
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
                Order ID:
              </label>
              <div className="relative">
                <input
                  id="orderId"
                  type="text"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  placeholder="e.g. AG-2024-7890 or SAR-982145"
                  className="w-full h-12 px-4 rounded-xl bg-gray-100/90 dark:bg-gray-800/80 border border-transparent focus:border-primary dark:focus:border-primary-dark focus:bg-white dark:focus:bg-[#0D1424] text-sm text-gray-900 dark:text-white placeholder:text-gray-400 transition-all outline-none font-inter"
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
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary-soft dark:bg-gray-800 dark:hover:bg-[#182552] text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark font-medium transition-colors cursor-pointer border border-gray-200/70 dark:border-gray-700"
              >
                AG-2024-7890 (Shipped)
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderIdInput("SAR-982145");
                  handleSearch("SAR-982145");
                }}
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary-soft dark:bg-gray-800 dark:hover:bg-[#182552] text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark font-medium transition-colors cursor-pointer border border-gray-200/70 dark:border-gray-700"
              >
                SAR-982145 (Delivered)
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderIdInput("SAR-349012");
                  handleSearch("SAR-349012");
                }}
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary-soft dark:bg-gray-800 dark:hover:bg-[#182552] text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark font-medium transition-colors cursor-pointer border border-gray-200/70 dark:border-gray-700"
              >
                SAR-349012 (Processing)
              </button>
            </div>

            {/* Track Order Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-inter font-semibold text-sm transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-60"
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
            <div className="bg-white dark:bg-[#111726] rounded-[20px] p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white font-inter">
                      Order {activeOrder.orderId}
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white bg-emerald-600 shadow-xs">
                      {activeOrder.status}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyOrderId}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
                      title="Copy Order ID"
                    >
                      {isCopied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-1">
                    Placed on {activeOrder.placedDate} • {activeOrder.items.length} {activeOrder.items.length === 1 ? "Item" : "Items"}
                  </p>
                </div>

                {/* Print / Action Buttons */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/80 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Print Invoice</span>
                  </button>
                </div>
              </div>

              {/* Courier info pill banner */}
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Truck size={15} className="text-primary dark:text-primary-dark" />
                  <span>
                    Courier: <strong className="text-gray-900 dark:text-white">{activeOrder.courierName}</strong>
                  </span>
                  <span className="text-gray-300 dark:text-gray-700">•</span>
                  <span>
                    Tracking: <strong className="font-mono text-gray-900 dark:text-white">{activeOrder.courierTrackingCode}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Clock size={14} />
                  <span>Est. Delivery: {activeOrder.estimatedDelivery}</span>
                </div>
              </div>
            </div>

            {/* 3. ORDER TIMELINE CARD (Exact Matching Stepper) */}
            <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
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
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-600 text-white">
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
            <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-inter mb-4 sm:mb-5">
                Order Items
              </h3>

              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {activeOrder.items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-4 flex items-center gap-4">
                    {/* Item Image with Fallback */}
                    <Link
                      to={`/product/${item.slug}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-50 dark:bg-gray-800/80 p-1.5 shrink-0 border border-gray-100 dark:border-gray-700 flex items-center justify-center overflow-hidden hover:opacity-90 transition-opacity"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80";
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

                    {/* Item Price */}
                    <div className="text-right shrink-0">
                      <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-inter">
                        ৳{item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Items Footer Summary */}
              <div className="pt-4 mt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300">
                <span>
                  {activeOrder.items.length} {activeOrder.items.length === 1 ? "item" : "items"}
                </span>
                <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                  Total: ৳{activeOrder.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* 5. SHIPPING ADDRESS CARD */}
            <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
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

        {/* 6. NEED HELP WITH YOUR ORDER? CARD (Exact from screenshot) */}
        <div className="bg-white dark:bg-[#111726] rounded-[20px] p-6 sm:p-8 border border-gray-100 dark:border-gray-800 shadow-sm my-6 text-center">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white font-inter">
            Need Help with Your Order?
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-inter mt-1 max-w-md mx-auto">
            Our support team is here to help you with any questions
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-primary-soft hover:bg-primary-soft-hover dark:bg-[#182552] dark:hover:bg-[#1E2D63] text-primary-ink dark:text-[#93C5FD] border border-primary-soft-border/80 dark:border-[#22336B] text-xs sm:text-sm font-semibold transition-all shadow-2xs"
            >
              Contact Support
            </Link>
            <a
              href="tel:01700000000"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors shadow-2xs"
            >
              <Phone size={14} />
              <span>01700-000000</span>
            </a>
          </div>
        </div>

        {/* 7. GET NOTIFIED / NEWSLETTER BOTTOM BANNER (Exact from screenshot) */}
        <div className="rounded-[20px] p-6 sm:p-8 bg-pink-50/70 dark:bg-[#141C2E] border border-pink-100 dark:border-gray-800 mt-10 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-lg sm:text-xl font-faustina font-bold text-gray-900 dark:text-white">
                Get notified when we launch
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-inter mt-1 leading-relaxed">
                Stay up to date with the latest news, announcements, and articles.
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
                  className="h-11 px-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary dark:focus:border-primary-dark w-full md:w-64 shadow-2xs"
                />
                <button
                  type="submit"
                  className="h-11 px-6 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer shadow-xs active:scale-95"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
