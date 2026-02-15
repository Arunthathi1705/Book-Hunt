import { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { motion } from "framer-motion";
import placeholder from "../../Assets/book-placeholder.png";

const BookDetails = ({ book, onClose, wishlist, toggleBookmark }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!book) return null;

  const info = book.volumeInfo || {};
  const imageLinks = info.imageLinks || {};
  const thumbnail =
    imageLinks.large ||
    imageLinks.medium ||
    imageLinks.thumbnail ||
    imageLinks.smallThumbnail ||
    placeholder;

  const isBookmarked = wishlist.some((b) => b.id === book.id);

  const handleBookmarkClick = () => {
    toggleBookmark(book);
  };


  const charLimit = isMobile ? 200 : 600;
  const showReadMore = info.description && info.description.length > charLimit;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="
          relative z-50
          w-[90%] md:w-[70%] lg:w-[60%]
          min-h-[360px] md:min-h-[420px]
          bg-white rounded-xl shadow-lg overflow-hidden
          flex flex-col md:flex-row
        "
      >

        <span
          onClick={onClose}
          className="absolute top-3 right-4 cursor-pointer text-xl text-gray-500 hover:text-black z-10"
        >
          ✕
        </span>


        <div className="w-full md:w-[35%] bg-gray-100 flex items-center justify-center p-3 md:p-4">
          <img
            src={thumbnail}
            alt={info.title}
            onError={(e) => (e.target.src = placeholder)}
            className="h-[180px] w-[120px] md:h-[320px] md:w-[220px] object-contain rounded-md shadow-md"
          />
        </div>


        <div className="w-full md:w-[65%] h-auto flex flex-col px-3 md:px-4 py-2">
          <div className="pb-2">
            <h2 className="text-lg md:text-xl font-semibold">{info.title}</h2>
            {info.authors && (
              <p className="text-xs md:text-sm text-gray-600">
                {info.authors.join(", ")}
              </p>
            )}
            {info.averageRating && (
              <p className="text-sm mt-1">⭐ {info.averageRating} / 5</p>
            )}
          </div>


          {info.description && (
            <div className="mb-3">
              <div
                className={`text-xs md:text-sm text-gray-700 leading-relaxed ${isExpanded ? "h-[160px] md:h-[220px] overflow-y-auto" : "line-clamp-4 md:line-clamp-6"
                  }`}
              >
                {isExpanded || !showReadMore
                  ? info.description
                  : info.description.slice(0, charLimit) + "..."}
              </div>

              {showReadMore && (
                <span
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-500 underline ml-1 cursor-pointer text-xs md:text-sm"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </span>
              )}
            </div>
          )}


          <div className="text-xs text-gray-500 space-y-1 mb-2">
            {info.publisher && <p>Publisher: {info.publisher}</p>}
            {info.publishedDate && <p>Year: {info.publishedDate}</p>}
            {info.pageCount && <p>Pages: {info.pageCount}</p>}
            {info.categories && <p>Category: {info.categories.join(", ")}</p>}
          </div>


          <div
            className="flex items-center cursor-pointer mt-3 mb-2"
            onClick={handleBookmarkClick}
          >
            {isBookmarked ? (
              <FaBookmark className="text-yellow-500 mr-1" />
            ) : (
              <FaRegBookmark className="text-gray-500 mr-1" />
            )}
            <span className="text-sm font-medium">
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookDetails;
