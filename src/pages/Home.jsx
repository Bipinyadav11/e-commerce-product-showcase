import { useState } from "react"
import products from "../data/products"
import ProductCard from "../components/ProductCard"

function Home({ searchTerm, addToCart, onViewDetails }) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Fitness",
    "Accessories",
    "Furniture",
    "Appliances",
    "Outdoor",
  ]

  // ================================
  // SEARCH + CATEGORY FILTER
  // ================================

  const filteredProducts = products.filter((product) => {
    const productName = product.title?.toLowerCase() || ""
    const search = searchTerm?.toLowerCase() || ""

    const matchesSearch = productName.includes(search)

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <main className="mx-auto max-w-7xl px-4">

      {/* ================================
          HERO SECTION
      ================================= */}

      <section className="relative mt-6 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 shadow-xl">

        <div className="grid items-center lg:grid-cols-2">

          {/* ================================
              LEFT CONTENT
          ================================= */}

          <div className="relative z-10 px-7 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">

            {/* Badge */}

            <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
              🛍️ Welcome to ShopEase
            </span>

            {/* Heading */}

            <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Everything You Need,
              <br />
              <span className="text-blue-100">
                All in One Place.
              </span>
            </h1>

            {/* Description */}

            <p className="mt-5 max-w-xl text-base leading-7 text-blue-100 sm:text-lg">
              Discover electronics, fashion, home essentials,
              fitness products and more at great prices.
            </p>

            {/* Buttons */}

            <div className="mt-7 flex flex-wrap gap-4">

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                }
                className="rounded-xl bg-white px-6 py-3.5 font-bold text-blue-600 shadow-lg transition duration-200 hover:-translate-y-1 hover:bg-gray-100"
              >
                🛒 Shop Now
              </button>

              <div className="flex items-center rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white backdrop-blur-md">
                ⭐ 4.5+ Rating
              </div>

            </div>

            {/* Features */}

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-blue-100">

              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Quality Products
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Best Prices
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                  ✓
                </span>
                Easy Shopping
              </div>

            </div>

          </div>

          {/* ================================
              RIGHT SIDE
          ================================= */}

          <div className="relative hidden min-h-[430px] items-center justify-center lg:flex">

            {/* Decorative circles */}

            <div className="absolute h-96 w-96 rounded-full bg-white/5" />

            <div className="absolute h-72 w-72 rounded-full bg-white/10" />

            {/* Shopping Card */}

            <div className="relative z-10 w-[330px] rotate-2 rounded-3xl bg-white p-5 shadow-2xl transition duration-300 hover:rotate-0 hover:scale-105">

              {/* Image */}

              <div className="overflow-hidden rounded-2xl bg-gray-100">

                <img
                  src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80"
                  alt="Online Shopping"
                  className="h-64 w-full object-cover"
                />

              </div>

              {/* Card Content */}

              <div className="px-2 pb-2 pt-4">

                <p className="text-sm font-medium text-gray-500">
                  ShopEase Collection
                </p>

                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  Smart Shopping
                </h3>

                <div className="mt-3 flex items-center justify-between">

                  <span className="font-bold text-blue-600">
                    Best Deals
                  </span>

                  <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-600">
                    Explore →
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================
          FEATURED COLLECTION
      ================================= */}

      <section className="py-12">

        {/* Section Heading */}

        <div className="mb-8">

          <p className="font-semibold text-blue-600">
            Featured Collection
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Discover Our Products
          </h2>

          <p className="mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
            Explore our collection of quality products designed
            for your everyday needs.
          </p>

        </div>

        {/* ================================
            PRODUCTS SECTION
        ================================= */}

        <div
          id="products"
          className="scroll-mt-28"
        >

          {/* Category Buttons */}

          <div className="mb-8 flex flex-wrap gap-3">

            {categories.map((category) => (

              <button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`rounded-xl px-5 py-2.5 font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
                }`}
              >
                {category}
              </button>

            ))}

          </div>

          {/* ================================
              PRODUCT COUNT
          ================================= */}

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

            <p className="text-sm text-gray-600 dark:text-gray-400">

              Showing{" "}

              <span className="font-semibold text-gray-900 dark:text-white">
                {filteredProducts.length}
              </span>{" "}

              products

            </p>

            {searchTerm && (

              <p className="text-sm text-gray-500 dark:text-gray-400">

                Search:{" "}

                <span className="font-semibold text-gray-900 dark:text-white">
                  {searchTerm}
                </span>

              </p>

            )}

          </div>

        </div>

        {/* ================================
            PRODUCTS GRID
        ================================= */}

        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={onViewDetails}
              />

            ))}

          </div>

        ) : (

          /* ================================
             NO PRODUCTS
          ================================= */

          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-gray-700 dark:bg-gray-900">

            <div className="text-5xl">
              🔍
            </div>

            <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
              No products found
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Try searching for another product.
            </p>

            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Show All Products
            </button>

          </div>

        )}

      </section>

    </main>
  )
}

export default Home

