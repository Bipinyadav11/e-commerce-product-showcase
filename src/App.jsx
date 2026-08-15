import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [darkMode, setDarkMode] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Checkout
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
const [orderDetails, setOrderDetails] = useState(null)
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  // =====================================================
  // ADD PRODUCT TO CART
  // =====================================================

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ]
    })
  }

  // =====================================================
  // INCREASE QUANTITY
  // =====================================================

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }

  // =====================================================
  // DECREASE QUANTITY
  // =====================================================

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // =====================================================
  // REMOVE PRODUCT
  // =====================================================

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    )
  }

  // =====================================================
  // CART COUNT
  // =====================================================

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  )

  // =====================================================
  // CART TOTAL
  // =====================================================

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  // =====================================================
  // CUSTOMER FORM
  // =====================================================

  const handleCustomerChange = (event) => {
    const { name, value } = event.target

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value,
    }))
  }

  // =====================================================
  // PLACE ORDER
  // =====================================================
const handlePlaceOrder = (event) => {
  event.preventDefault()

  const newOrderId = `SE-${Date.now().toString().slice(-6)}`

  setOrderDetails({
    orderId: newOrderId,
    customerName: customer.name,
    email: customer.email,
    total: cartTotal,
    items: cartCount,
    date: new Date().toLocaleDateString("en-IN"),
  })

  setIsCheckoutOpen(false)
  setIsCartOpen(false)
  setOrderPlaced(true)

  setCart([])

  setCustomer({
    name: "",
    email: "",
    phone: "",
    address: "",
  })
}

  // =====================================================
  // OPEN CHECKOUT
  // =====================================================

  const openCheckout = () => {
    if (cart.length === 0) {
      return
    }

    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "dark bg-gray-950 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-purple-50"
      }`}
    >

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cart={cart}
        onCartClick={() => setIsCartOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* =====================================================
          HOME
      ===================================================== */}

      <Home
        searchTerm={searchTerm}
        addToCart={addToCart}
        onViewDetails={setSelectedProduct}
      />

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />

      {/* =====================================================
          PRODUCT DETAILS MODAL
      ===================================================== */}

      {selectedProduct && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className={`relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
            }`}
            onClick={(event) => event.stopPropagation()}
          >

            {/* Close Button */}

            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className={`absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-md transition ${
                darkMode
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              ✕
            </button>

            <div className="grid md:grid-cols-2">

              {/* Product Image */}

              <div className="h-80 bg-gray-100 md:h-full">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product Information */}

              <div className="p-6 md:p-10">

                <p className="font-semibold text-blue-600">
                  {selectedProduct.category}
                </p>

                <h2
                  className={`mt-3 text-3xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  {selectedProduct.title}
                </h2>

                {/* Rating */}

                <div className="mt-4 flex items-center gap-2">

                  <span className="text-lg text-yellow-500">
                    ★
                  </span>

                  <span
                    className={
                      darkMode
                        ? "font-medium text-gray-300"
                        : "font-medium text-gray-700"
                    }
                  >
                    {selectedProduct.rating}
                  </span>

                  <span className="text-gray-400">
                    / 5
                  </span>

                </div>

                {/* Price */}

                <p
                  className={`mt-6 text-3xl font-bold ${
                    darkMode
                      ? "text-white"
                      : "text-gray-900"
                  }`}
                >
                  ₹
                  {selectedProduct.price.toLocaleString("en-IN")}
                </p>

                {/* Description */}

                <p
                  className={`mt-5 leading-7 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  Premium quality{" "}
                  {selectedProduct.title.toLowerCase()}{" "}
                  designed for everyday use. Enjoy a stylish
                  design, reliable performance, and a comfortable
                  shopping experience.
                </p>

                {/* Add To Cart */}

                <button
                  type="button"
                  onClick={() => {
                    addToCart(selectedProduct)
                    setSelectedProduct(null)
                  }}
                  className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
                >
                  🛒 Add to Cart
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CART DRAWER
      ===================================================== */}

      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}

          <div
            className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto shadow-2xl ${
              darkMode
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >

            {/* Cart Header */}

            <div
              className={`sticky top-0 z-10 flex items-center justify-between border-b px-6 py-5 ${
                darkMode
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >

              <div>

                <h2 className="text-xl font-bold">
                  Shopping Cart
                </h2>

                <p
                  className={
                    darkMode
                      ? "text-sm text-gray-400"
                      : "text-sm text-gray-500"
                  }
                >
                  {cartCount}{" "}
                  {cartCount === 1 ? "item" : "items"}
                </p>

              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                ✕
              </button>

            </div>

            {/* Empty Cart */}

            {cart.length === 0 ? (

              <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">

                <div className="text-6xl">
                  🛒
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Your cart is empty
                </h3>

                <p
                  className={`mt-2 ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  Add some products to get started.
                </p>

                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Continue Shopping
                </button>

              </div>

            ) : (

              /* Cart Items */

              <div className="p-6">

                <div className="space-y-5">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className={`rounded-2xl border p-4 ${
                        darkMode
                          ? "border-gray-800 bg-gray-800/50"
                          : "border-gray-200 bg-white"
                      }`}
                    >

                      <div className="flex gap-4">

                        {/* Image */}

                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-20 w-20 rounded-xl object-cover"
                        />

                        {/* Information */}

                        <div className="min-w-0 flex-1">

                          <h3 className="font-semibold">
                            {item.title}
                          </h3>

                          <p className="mt-1 font-bold text-blue-600">
                            ₹
                            {item.price.toLocaleString("en-IN")}
                          </p>

                          {/* Quantity */}

                          <div className="mt-3 flex items-center justify-between">

                            <div
                              className={`flex items-center rounded-lg border ${
                                darkMode
                                  ? "border-gray-700 bg-gray-900"
                                  : "border-gray-300 bg-white"
                              }`}
                            >

                              {/* Minus */}

                              <button
                                type="button"
                                onClick={() =>
                                  decreaseQuantity(item.id)
                                }
                                className="px-3 py-1.5 text-lg transition hover:bg-gray-200 dark:hover:bg-gray-700"
                              >
                                −
                              </button>

                              {/* Quantity */}

                              <span className="px-3 font-medium">
                                {item.quantity}
                              </span>

                              {/* Plus */}

                              <button
                                type="button"
                                onClick={() =>
                                  increaseQuantity(item.id)
                                }
                                className="px-3 py-1.5 text-lg transition hover:bg-gray-200 dark:hover:bg-gray-700"
                              >
                                +
                              </button>

                            </div>

                            {/* Remove */}

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.id)
                              }
                              className="text-sm font-medium text-red-500 transition hover:text-red-700"
                            >
                              Remove
                            </button>

                          </div>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                {/* Cart Summary */}

                <div
                  className={`mt-8 border-t pt-6 ${
                    darkMode
                      ? "border-gray-800"
                      : "border-gray-200"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <span
                      className={
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                    >
                      Subtotal
                    </span>

                    <span className="text-2xl font-bold">
                      ₹
                      {cartTotal.toLocaleString("en-IN")}
                    </span>

                  </div>

                  {/* Checkout Button */}
<button
  type="button"
  onClick={() => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }}
  className="mt-5 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
>
  Checkout
</button>

                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* =====================================================
          CHECKOUT MODAL
      ===================================================== */}

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div
            className={`max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl shadow-2xl ${
              darkMode
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >

            {/* Checkout Header */}

            <div
              className={`sticky top-0 z-10 flex items-center justify-between border-b px-6 py-5 ${
                darkMode
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >

              <div>

                <h2 className="text-2xl font-bold">
                  Checkout
                </h2>

                <p
                  className={
                    darkMode
                      ? "mt-1 text-sm text-gray-400"
                      : "mt-1 text-sm text-gray-500"
                  }
                >
                  Complete your order
                </p>

              </div>

              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                ✕
              </button>

            </div>

            {/* Checkout Form */}

            <form
              onSubmit={handlePlaceOrder}
              className="grid gap-8 p-6 md:grid-cols-2"
            >

              {/* Customer Information */}

              <div>

                <h3 className="text-lg font-bold">
                  Contact Information
                </h3>

                <div className="mt-5 space-y-4">

                  {/* Name */}

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={customer.name}
                      onChange={handleCustomerChange}
                      placeholder="Enter your name"
                      required
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 ${
                        darkMode
                          ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    />

                  </div>

                  {/* Email */}

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleCustomerChange}
                      placeholder="Enter your email"
                      required
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 ${
                        darkMode
                          ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    />

                  </div>

                  {/* Phone */}

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleCustomerChange}
                      placeholder="10-digit phone number"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      required
                      className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 ${
                        darkMode
                          ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    />

                  </div>

                  {/* Address */}

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Delivery Address
                    </label>

                    <textarea
                      name="address"
                      value={customer.address}
                      onChange={handleCustomerChange}
                      rows="4"
                      placeholder="Enter your complete delivery address"
                      required
                      className={`w-full resize-none rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 ${
                        darkMode
                          ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500"
                          : "border-gray-300 bg-gray-50"
                      }`}
                    />

                  </div>

                </div>

              </div>

              {/* Order Summary */}

              <div
                className={`rounded-2xl p-5 ${
                  darkMode
                    ? "bg-gray-800"
                    : "bg-gray-50"
                }`}
              >

                <h3 className="text-lg font-bold">
                  Order Summary
                </h3>

                <div className="mt-5 space-y-4">

                  {cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center gap-3"
                    >

                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">

                        <h4 className="truncate font-semibold">
                          {item.title}
                        </h4>

                        <p
                          className={
                            darkMode
                              ? "text-sm text-gray-400"
                              : "text-sm text-gray-500"
                          }
                        >
                          Qty: {item.quantity}
                        </p>

                      </div>

                      <p className="font-semibold">
                        ₹
                        {(
                          item.price * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  ))}

                </div>

                {/* Total */}

                <div
                  className={`mt-6 border-t pt-5 ${
                    darkMode
                      ? "border-gray-700"
                      : "border-gray-200"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <span
                      className={
                        darkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }
                    >
                      Total
                    </span>

                    <span className="text-2xl font-bold">
                      ₹
                      {cartTotal.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

                {/* Place Order */}

                <button
                  type="submit"
                  className="mt-5 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
                >
                  ✓ Place Order
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
      {/* ================================================= */}
      {/* ORDER SUCCESS */}
      {/* ================================================= */}

      {orderPlaced && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setOrderPlaced(false)}
        >
          <div
            className={`w-full max-w-md rounded-3xl p-8 text-center shadow-2xl ${
              darkMode
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-900"
            }`}
            onClick={(event) => event.stopPropagation()}
          >

            {/* Success Icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl shadow-sm">
              ✅
            </div>

            {/* Title */}
            <h2 className="mt-6 text-2xl font-bold">
              Order Placed Successfully!
            </h2>

            {/* Message */}
            <p
              className={`mt-3 leading-6 ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Thank you for shopping with ShopEase.
              Your order has been placed successfully.
            </p>

            {/* Order Info */}
            <div
              className={`mt-6 rounded-2xl p-4 text-left ${
                darkMode
                  ? "bg-gray-800"
                  : "bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }
                >
                  Status
                </span>

                <span className="font-semibold text-green-600">
                  Confirmed ✓
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span
                  className={
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }
                >
                  Payment
                </span>

                <span className="font-semibold">
                  Cash on Delivery
                </span>
              </div>
            </div>

            {/* Continue Shopping */}
            <button
              type="button"
              onClick={() => setOrderPlaced(false)}
              className="mt-7 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
            >
              Continue Shopping
            </button>

          </div>
        </div>
      )}

    </div>
  )
}

export default App