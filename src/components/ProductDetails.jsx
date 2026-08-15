function ProductDetails({ product, onClose, onAddToCart }) {
  if (!product) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">

      {/* Background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-gray-700 shadow-md transition hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">

          {/* Product Image */}
          <div className="h-80 bg-gray-100 md:h-full">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Information */}
          <div className="p-6 md:p-8">

            {/* Category */}
            <p className="text-sm font-semibold text-blue-600">
              {product.category}
            </p>

            {/* Title */}
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {product.title}
            </h2>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-lg text-yellow-500">
                ★
              </span>

              <span className="font-medium text-gray-700">
                {product.rating}
              </span>

              <span className="text-sm text-gray-500">
                / 5
              </span>
            </div>

            {/* Price */}
            <p className="mt-6 text-3xl font-bold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </p>

            {/* Description */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900">
                Product Description
              </h3>

              <p className="mt-2 leading-7 text-gray-600">
                This is a quality {product.category.toLowerCase()} product
                designed for everyday use. It offers a modern design,
                reliable performance, and a comfortable user experience.
              </p>
            </div>

            {/* Features */}
            <div className="mt-6 grid grid-cols-2 gap-3">

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">
                  Category
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  {product.category}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">
                  Rating
                </p>
                <p className="mt-1 font-semibold text-gray-900">
                  ⭐ {product.rating}
                </p>
              </div>

            </div>

            {/* Add To Cart */}
            <button
              type="button"
              onClick={() => {
                onAddToCart(product)
                onClose()
              }}
              className="mt-7 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              🛒 Add to Cart
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails