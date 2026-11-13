import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingCart, Star, Check } from "lucide-react";
import { Product } from "@/data/shopData";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { addToCart } from "@/redux/features/cart/cartSlice";

export interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode = "grid",
  onQuickView,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    setJustAdded(true);
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
        quantity: 1,
        openDrawer: true,
      })
    );
    if (onAddToCart) {
      onAddToCart(product);
    }
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleWishlist) onToggleWishlist(product);
  };

  if (viewMode === "list") {
    return (
      <div className="group relative flex flex-col sm:flex-row bg-surface-card dark:bg-[#111622] rounded-2xl shadow-sm hover:shadow-xl border border-black/[0.08] dark:border-gray-800 transition-all duration-300 overflow-hidden p-3.5 sm:p-4 gap-4">
        {/* Left Thumbnail */}
        <div className="relative w-full sm:w-52 h-52 shrink-0 bg-white dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center">
          <Link to={`/product/${product.slug}`} className="block w-full h-full">
            <img
              src={isHovered && product.hoverImage ? product.hoverImage : product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
            {product.discountPercent && (
              <span className="bg-[#F85606] text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow-xs">
                -{product.discountPercent}%
              </span>
            )}
            {product.tags && product.tags[0] && (
              <span className="bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                {product.tags[0]}
              </span>
            )}
          </div>

          {/* Quick Actions (Mobile/Hover) */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
            <button
              onClick={handleWishlist}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-label="Wishlist"
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
                isWishlisted
                  ? "bg-primary text-white"
                  : "bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white"
              }`}
            >
              <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <button
              onClick={handleQuickView}
              title="Quick view product"
              aria-label="Quick View"
              className="w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer"
            >
              <Eye size={16} />
            </button>
          </div>
        </div>

        {/* Right Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-primary-dark">
                {product.brand}
              </span>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  product.inStock
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                    : "bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    product.inStock ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <Link
              to={`/product/${product.slug}`}
              className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-dark transition-colors line-clamp-1"
            >
              {product.name}
            </Link>

            <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {product.description}
            </p>

            {/* Ratings & Volume */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-gray-400 dark:text-gray-500 font-normal">
                  ({product.reviewsCount})
                </span>
              </div>
              {product.volume && (
                <span className="text-xs text-gray-400 dark:text-gray-500 pl-2">
                  {product.volume}
                </span>
              )}
            </div>
          </div>

          {/* Pricing & Cart button */}
          <div className="flex items-center justify-between gap-4 mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[#F85606]">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`px-4 sm:px-6 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                !product.inStock
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                  : justAdded
                  ? "bg-emerald-600 text-white shadow-md scale-105"
                  : "bg-primary hover:bg-primary-hover text-white font-semibold shadow-xs active:scale-95"
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={16} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  <span>{product.inStock ? "Add to cart" : "Out of stock"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Mode (Default)
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-surface-card dark:bg-[#111622] rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 border border-black/[0.08] dark:border-gray-800 transition-all duration-300 overflow-hidden"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-square bg-white dark:bg-gray-800/40 overflow-hidden">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.discountPercent && (
            <span className="bg-[#F85606] text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow-xs tracking-tight">
              -{product.discountPercent}%
            </span>
          )}
          {product.tags && product.tags[0] && (
            <span className="bg-gray-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
              {product.tags[0]}
            </span>
          )}
        </div>

        {/* Hover Action Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-x-2 sm:group-hover:translate-x-0 transition-all duration-200">
          <button
            onClick={handleWishlist}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-label="Wishlist"
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer ${
              isWishlisted
                ? "bg-primary text-white"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white"
            }`}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleQuickView}
            title="Quick view product"
            aria-label="Quick View"
            className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-primary hover:text-white flex items-center justify-center shadow-md transition-all duration-200 cursor-pointer"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Stock Badge Overlay if Out of Stock */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-10 pointer-events-none">
            <span className="bg-gray-900/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-surface-card dark:bg-[#111622]">
        <div>
          {/* Brand & Stock status indicator */}
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-dark">
              {product.brand}
            </span>
            <span
              className={`text-[10px] font-semibold flex items-center gap-1 ${
                product.inStock ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  product.inStock ? "bg-emerald-500" : "bg-rose-500"
                }`}
              />
              {product.inStock ? "In stock" : "Out"}
            </span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.slug}`}
            className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-dark transition-colors line-clamp-2 leading-snug min-h-[2.4rem]"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-400">
              <Star size={13} className="fill-amber-400" />
            </div>
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-gray-400 dark:text-gray-500">
              ({product.reviewsCount})
            </span>
            {product.volume && (
              <span className="ml-auto text-[11px] text-gray-400 dark:text-gray-500 font-medium">
                {product.volume}
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Add to Cart */}
        <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t border-transparent dark:border-gray-800">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold text-[#F85606] leading-tight">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[11px] text-gray-400 dark:text-gray-500 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            title={product.inStock ? "Add to cart" : "Item out of stock"}
            className={`p-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
              !product.inStock
                ? "bg-gray-150 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : justAdded
                ? "bg-emerald-600 text-white scale-105"
                : "bg-primary hover:bg-primary-hover text-white font-semibold hover:scale-105 active:scale-95 shadow-xs"
            }`}
          >
            {justAdded ? (
              <>
                <Check size={16} />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">
                  {product.inStock ? "Add" : "Out"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
