import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import placeholder from "../../Assets/book-placeholder.png";

const BookCard = ({ book, onClick, bookmarked, onBookmarkChange }) => {
  const [thumbnail, setThumbnail] = useState(placeholder);
  const info = useMemo(() => book.volumeInfo || {}, [book.volumeInfo]);



  useEffect(() => {
    const urls = [
      info.imageLinks?.large,
      info.imageLinks?.medium,
      info.imageLinks?.thumbnail,
      info.imageLinks?.smallThumbnail,
    ];
    for (let url of urls) {
      if (url) {
        setThumbnail(url);
        return;
      }
    }
    setThumbnail(placeholder);
  }, [info]);

  return (
    <motion.div
      layout
      className="relative w-[110px] h-[180px] md:w-[140px] md:h-[210px] flex flex-col justify-between cursor-pointer rounded-md shadow-md bg-white overflow-hidden"

      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >

      <div
        className="absolute top-1 right-1 z-10 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          if (onBookmarkChange) onBookmarkChange();
        }}
      >
        {bookmarked ? (
          <FaBookmark className="text-yellow-500" size={18} />
        ) : (
          <FaRegBookmark className="text-black" size={18} />
        )}
      </div>

      {/* Book Image */}
      <div className="h-[130px] md:h-[160px] flex items-center justify-center p-1">

        <img
          src={thumbnail}
          alt={info.title || "Book cover"}
          onError={(e) => (e.target.src = placeholder)}
          className="max-h-full max-w-full object-contain rounded-sm"
          loading="lazy"
        />
      </div>


      <p className="text-[10px] md:text-xs text-gray-800 font-medium text-center mt-1 line-clamp-2 leading-tight px-1">
        {info.title || "No title"}
      </p>
    </motion.div>
  );
};

export default BookCard;
