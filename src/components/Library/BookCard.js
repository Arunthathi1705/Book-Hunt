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
      className="relative w-[95px] h-[160px]
 md:w-[140px] md:h-[210px] flex flex-col rounded-md shadow-md bg-white overflow-hidden"

      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >

      {/* Book Image */}
      <div className="h-[115px] md:h-[160px] w-full flex items-center justify-center flex-shrink-0">

        <img
          src={thumbnail}
          alt={info.title || "Book cover"}
          onError={(e) => (e.target.src = placeholder)}
          className={`${thumbnail === placeholder
            ? "w-[60%] h-[60%] object-contain"
            : "w-full h-full object-cover"
            }`}
          loading="lazy"
        />
      </div>
      <div className="flex justify-center mt-1 flex-shrink-0">
        {bookmarked ? (
          <FaBookmark
            className="text-yellow-500 cursor-pointer"
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              if (onBookmarkChange) onBookmarkChange();
            }}
          />
        ) : (
          <FaRegBookmark
            className="text-black cursor-pointer"
            size={16}
            onClick={(e) => {
              e.stopPropagation();
              if (onBookmarkChange) onBookmarkChange();
            }}
          />
        )}
      </div>


      <p className="text-[10px] md:text-xs text-gray-800 font-medium text-center mt-1 px-2 truncate flex-shrink-0">

        {info.title || "No title"}
      </p>




    </motion.div>
  );
};

export default BookCard;
