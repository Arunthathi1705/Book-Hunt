import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@mantine/core";
import BannerSlider from "./BannerSlider";
import RecommendedBooks from "./RecommendedBooks";
import { useWishList } from "../../hooks/useWishList";
import bookQuotes from "../../Data/quotes";



export default function Home({ triggerLogin }) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const wishlistState = useWishList();


  const cachedBooks = {};
  ["Fiction", "Romance", "History", "Science", "Adventure", "Technology"].forEach(
    (genre) => {
      const saved = localStorage.getItem(`books-${genre}`);
      if (saved) cachedBooks[genre] = JSON.parse(saved);
    }
  );



  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % bookQuotes.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % bookQuotes.length);
  };

  const quote = bookQuotes[quoteIndex];

  return (
    <div id="home" className=" w-full">
      <BannerSlider />
      {/* === Quote Section === */}
      <div className="px-4 pt-2">
        <div className="flex flex-col md:flex-row gap-6">

          <div className="w-full md:w-[440px]">
            <div className="relative h-[200px] sm:h-[240px] bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <img
                    src={quote.image}
                    alt={quote.author}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover shadow-md"

                  />
                  <div>
                    <p className="text-sm sm:text-lg italic text-red-800 font-medium leading-snug sm:leading-relaxed font-serif">

                      “{quote.content}”
                    </p>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 font-medium tracking-wide"
                    >
                      — {quote.author}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 left-4">
                <Button
                  variant="light"
                  className="text-xs sm:text-md px-3 sm:px-4 py-1 sm:py-2 rounded-full"
                  onClick={nextQuote}
                >
                  Next Quote →
                </Button>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Recommended Books */}
          <div className="flex-1">
            <RecommendedBooks
              booksCache={cachedBooks}
              wishlistState={wishlistState}
              triggerLogin={triggerLogin}
            />
          </div>
        </div>
      </div>
    </div>

  );
}
