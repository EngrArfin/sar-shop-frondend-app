import React from "react";
import { Link } from "react-router-dom";
import { Eye, ShoppingBag } from "lucide-react";
import { MOCK_PRODUCTS, Product } from "@/data/shopData";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

// Exact Figma Product Card Specification
export const FigmaProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) {
      toast.error("This item is currently out of stock");
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        brand: product.brand,
        category: product.category,
        selectedSize: product.volume || (product.sizes && product.sizes[0]),
      })
    );
    toast.success(`Added ${product.name} to cart!`);
  };

  return (
    <div className="group w-full max-w-[258px] bg-surface-card dark:bg-[#111622] rounded-[16px] overflow-hidden border border-black/[0.08] dark:border-gray-800 hover:border-primary/50 dark:hover:border-gray-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between mx-auto">
      {/* Product Image Container */}
      <div className="relative w-full h-48 sm:h-56 md:h-[250px] overflow-hidden bg-white dark:bg-gray-800/40">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-dark hover:bg-white dark:hover:bg-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xs cursor-pointer"
            title="Quick view"
          >
            <Eye size={15} />
          </button>
        )}
      </div>

      {/* Product Details (Figma: padding: 8, gap: 12) */}
      <div className="p-3 flex flex-col justify-between flex-1 gap-2.5">
        <div>
          {/* Product Name */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="text-base sm:text-lg font-faustina font-semibold text-black dark:text-white group-hover:text-primary dark:group-hover:text-primary-dark transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Price */}
          <div className="text-sm sm:text-base font-faustina font-bold text-[#F85606] mt-1">
            ৳{product.price.toLocaleString()}
          </div>

          {/* Stock Status Badge */}
          <div className="flex items-center gap-2 mt-1.5 text-[12px] sm:text-[13px] font-inter text-[#80899C] dark:text-gray-400">
            <span>{product.inStock ? "In-Stock" : "Out of Stock"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D9D9D9] dark:bg-gray-600" />
            <span>12 Sold</span>
          </div>
        </div>

        {/* Shop Now Button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2 px-3.5 rounded-[10px] bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-inter font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
        >
          <ShoppingBag size={14} />
          <span>Shop Now</span>
        </button>
      </div>
    </div>
  );
};

export const NewArrivalsSection: React.FC<{
  onQuickView?: (product: Product) => void;
}> = ({ onQuickView }) => {
  const newArrivals = MOCK_PRODUCTS.slice(0, 10);

  return (
    <section className="w-full bg-surface-page dark:bg-[#090D14] py-16 sm:py-20 md:py-24 transition-colors duration-200">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-[42px] font-faustina font-bold text-black dark:text-white tracking-tight leading-tight">
            New Arrival
          </h2>
        </div>

        {/* 5-Column x 2-Row Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-10 sm:mb-12">
          {newArrivals.map((product) => (
            <FigmaProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* See all Button */}
        <div className="text-center">
          <Link
            to="/shop?sort=newest"
            className="inline-flex items-center justify-center h-10 px-6 sm:px-8 rounded-[8px] bg-primary-soft hover:bg-primary-soft-hover dark:bg-[#182552] dark:hover:bg-[#1E2D63] text-primary-ink dark:text-[#93C5FD] border border-primary-soft-border/60 dark:border-[#22336B] font-inter font-bold text-sm sm:text-base transition-all duration-200 shadow-2xs"
          >
            See all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
