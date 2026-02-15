import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBookSearch } from "../../hooks/useBookSearch";
import { useNavigate } from "react-router-dom";

import img1 from "../../Assets/slider-images/img1.jpg";
import img2 from "../../Assets/slider-images/img2.jpg";
import img3 from "../../Assets/slider-images/img3.jpg";
import img4 from "../../Assets/slider-images/img4.jpg";
import img5 from "../../Assets/slider-images/img5.jpg";
import startQuote from "../../Assets/quote1.png";
import endQuote from "../../Assets/quote2.png";
import BookDetails from "../Library/BookDetails";
import HomeSearchBar from "./HomeSearchBar";

const images = [img1, img2, img3, img4, img5];

const captions = [
  "Discover Your Next Favorite Book",
  "Read. Learn. Grow.",
  "Adventure Awaits Inside Every Page",
  "Find Books That Match Your Curiosity",
  "Explore Stories That Inspire"
];



export default function BannerSlider() {
  const [index, setIndex] = useState(0);
  const search = useBookSearch();
  const navigate = useNavigate();

  const handleSelect = (book) => {
    navigate(`/library/explore?search=${encodeURIComponent(book.title)}`);
  };

  /* === Image Slider === */


  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % images.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);



  return (

    <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] overflow-hidden">
      <img
        src={images[0]}
        alt="Book banner"
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
      />
      <AnimatePresence>
        {index > 0 && (
          <motion.img
            key={index}
            src={images[index]}
            alt="Book banner"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
          />
        )}
      </AnimatePresence>



      {/* === Center Content === */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.div
            key={captions[index]}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-white text-xs sm:text-sm md:text-base font-semibold bg-black/40 px-3 py-1 rounded-lg backdrop-blur-sm text-center"

          >
            {captions[index]}
          </motion.div>
        </AnimatePresence>
        {/* === Search Bar === */}
        <HomeSearchBar
          searchTerm={search.searchTerm || ""}
          suggestions={search.suggestions || []}
          onChange={search.setSearchTerm}
          onSelect={handleSelect}
        />
        {search.selectedBook && (
          <BookDetails book={search.selectedBook} onClose={search.clearSearch} />
        )}

        <div>
          <p className="max-w-[92%] sm:max-w-xl text-xs sm:text-sm md:text-base text-center font-semibold italic text-white px-4 leading-relaxed">
            <span className="inline-block align-top mr-1">
              <img src={startQuote} alt="start-quote" className="w-4 h-4 sm:w-5 sm:h-5 inline" />
            </span>
            Discover books you love with BookHunt. Search and explore detailed book information.
            Bookmark your favorite reads effortlessly. Everything you need to find your next book —
            all in one place.
            <span className="inline-block align-bottom ml-1">
              <img src={endQuote} alt="end-quote" className="w-4 h-4 sm:w-5 sm:h-5 inline" />
            </span>
          </p>
        </div>
      </div>
    </div>

  );
}