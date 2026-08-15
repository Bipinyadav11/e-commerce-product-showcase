function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-3">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                🛍️
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  ShopEase
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Smart Shopping
                </p>
              </div>

            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
              A modern and responsive e-commerce product showcase
              built with React.js and Tailwind CSS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">

              <button
                type="button"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="w-fit text-gray-500 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Home
              </button>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="w-fit text-gray-500 transition hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
              >
                Products
              </button>

            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Built With
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">

              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                React.js
              </span>

              <span className="rounded-lg bg-cyan-50 px-3 py-1.5 text-xs font-medium text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400">
                JavaScript
              </span>

              <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
                Tailwind CSS
              </span>

              <span className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-600 dark:bg-green-950/40 dark:text-green-400">
                Vite
              </span>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-800">

          <div className="flex flex-col gap-3 text-center text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">

            <p>
              © {new Date().getFullYear()} ShopEase. All rights reserved.
            </p>

            <p>
              Built with{" "}
              <span className="text-red-500">
                ❤️
              </span>{" "}
              by{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                BIPIN YADAV
              </span>
            </p>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer