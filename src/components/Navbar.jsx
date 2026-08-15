function Navbar({
  searchTerm,
  setSearchTerm,
  cart,
  onCartClick,
  darkMode,
  setDarkMode,
}) {
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        darkMode
          ? "border-gray-800 bg-gray-950/95"
          : "border-gray-200 bg-white/95"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">

        {/* Logo */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white shadow-md">
            🛍️
          </div>

          <div className="hidden sm:block">
            <h1
              className={`text-xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              ShopEase
            </h1>

            <p
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Smart Shopping
            </p>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="relative hidden flex-1 md:block">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
            className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition ${
              darkMode
                ? "border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
            🔍
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`font-medium transition ${
              darkMode
                ? "text-gray-300 hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className={`font-medium transition ${
              darkMode
                ? "text-gray-300 hover:text-blue-400"
                : "text-gray-700 hover:text-blue-600"
            }`}
          >
            Products
          </button>
        </div>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2">

          {/* Dark Mode */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition ${
              darkMode
                ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100"
            }`}
            title="Toggle dark mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={onCartClick}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition ${
              darkMode
                ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                : "border-gray-200 bg-gray-50 hover:bg-gray-100"
            }`}
            title="Shopping cart"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-4 md:hidden">
        <div className="relative">

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search products..."
            className={`w-full rounded-xl border px-4 py-3 pr-12 text-sm outline-none transition ${
              darkMode
                ? "border-gray-700 bg-gray-900 text-white placeholder-gray-500 focus:border-blue-500"
                : "border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:border-blue-500"
            }`}
          />

          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
            🔍
          </span>

        </div>
      </div>
    </nav>
  )
}

export default Navbar