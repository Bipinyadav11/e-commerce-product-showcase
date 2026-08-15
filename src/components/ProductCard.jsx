function ProductCard({ product, onAddToCart, onViewDetails }) {
  const originalPrice = Math.round(product.price * 1.2)
  const discount = Math.round(
    ((originalPrice - product.price) / originalPrice) * 100
  )

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900"
    >
      {/* ================================
          PRODUCT IMAGE
      ================================= */}

      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">

        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Image Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* Category */}

        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-md backdrop-blur-sm dark:bg-gray-900/95 dark:text-blue-400">
          {product.category}
        </span>

        {/* Discount */}

        <span className="absolute bottom-3 left-3 rounded-lg bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-md">
          {discount}% OFF
        </span>

        {/* Rating */}

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-md backdrop-blur-sm dark:bg-gray-900/95">
          <span className="text-yellow-500">
            ★
          </span>

          <span className="text-gray-700 dark:text-gray-200">
            {product.rating}
          </span>
        </div>

      </div>

      {/* ================================
          PRODUCT INFORMATION
      ================================= */}

      <div className="p-5">

        {/* Product Title */}

        <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
          {product.title}
        </h3>

        {/* Description */}

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Premium quality {product.title.toLowerCase()} designed
          for everyday use.
        </p>

        {/* ================================
            PRICE
        ================================= */}

        <div className="mt-4">

          <div className="flex items-center gap-2">

            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <span className="text-sm text-gray-400 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>

          </div>

          <p className="mt-1 text-xs font-medium text-green-600">
            You save ₹
            {(originalPrice - product.price).toLocaleString("en-IN")}
          </p>

        </div>

        {/* ================================
            ADD TO CART
        ================================= */}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onAddToCart(product)
          }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
        >
          🛒 Add to Cart
        </button>

      </div>
    </div>
  )
}

export default ProductCard

