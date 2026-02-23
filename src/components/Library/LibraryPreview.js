import { useState } from "react";
import { Divider } from "@mantine/core";
import { useNavigate, createSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import BookCard from "./BookCard";
import BookSkeletonCard from "./BookSkeletonCard";
import { fetchBooksByGenrePaginated } from "../../Services/googleBooksApi";
import searchIcon from "../../Assets/search.png";
import { useBookmarkHandler } from "../../hooks/useWishList";

const LibraryPreview = ({
  genres,
  booksByGenre,
  loading,
  setLibraryBooks,
  onBookClick,
  toggleBook,
  triggerLogin,
  wishlist = [],
}) => {
  const [activeGenre, setActiveGenre] = useState(genres[0]);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleBookmarkChange = useBookmarkHandler(toggleBook, triggerLogin);


  const handleViewMore = () => {
    navigate({
      pathname: "/library/explore",
      search: createSearchParams({ genre: activeGenre }).toString(),
    });
  };

  return (
    <div>
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start px-4 pt-4 pb-2">
        <div>
          <h2 className="text-2xl sm:text-lg font-semibold leading-tight m-0">Library</h2>
          <p className="text-sm sm:text-[14px] text-gray-500 leading-snug m-0 max-w-md">
            Browse books by genre, discover new reads, and explore curated collections in one place.
          </p>
        </div>
        <div className="relative inline-block">
          <div
            className="flex items-center p-2"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute right-full mr-3 px-4 py-1 rounded-xl bg-gradient-to-r from-slate-200 to-slate-400 shadow-md whitespace-nowrap z-50"
              >
                <p className="text-sm font-medium text-gray-900">
                  Search & explore books effortlessly
                </p>
              </motion.div>
            )}

            <motion.img
              src={searchIcon}
              alt="search"
              className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer relative z-10"
              whileHover={{ scale: 1.15 }}
              onClick={() => navigate("/library/explore")}
            />
          </div>
        </div>

      </div>



      <div className="px-[15px]">
        <Divider my={0} />
      </div>

      {/* ================= GENRE NAV ================= */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 py-2 px-2">
        {genres.map((genre, index) => (
          <div key={genre} className="flex items-center gap-3">
            <span
              onClick={async () => {
                setActiveGenre(genre);

                if (!booksByGenre[genre]) {
                  const cached = localStorage.getItem(`books-${genre}`);
                  if (cached) {

                    setLibraryBooks(prev => ({
                      ...prev,
                      [genre]: JSON.parse(cached)
                    }));
                  } else {
                    try {
                      const rawBooks = await fetchBooksByGenrePaginated(genre, 0, 18);
                      const books = rawBooks.map((book, index) => ({
                        id: `${genre}-${book.id || index}`,
                        volumeInfo: {
                          title: book.volumeInfo?.title || "No title",
                          authors: book.volumeInfo?.authors || ["Unknown author"],
                          description: book.volumeInfo?.description || "No description available",
                          publisher: book.volumeInfo?.publisher || "Unknown publisher",
                          publishedDate: book.volumeInfo?.publishedDate || "",
                          pageCount: book.volumeInfo?.pageCount || 0,
                          categories: book.volumeInfo?.categories || [],
                          averageRating: book.volumeInfo?.averageRating ?? null,
                          imageLinks: book.volumeInfo?.imageLinks || {},
                        },
                      }));

                      setLibraryBooks(prev => ({
                        ...prev,
                        [genre]: books
                      }));

                      localStorage.setItem(`books-${genre}`, JSON.stringify(books));
                    } catch (err) {
                      console.error("Error fetching books for genre", genre, err);
                    }
                  }
                }
              }}
              className={`cursor-pointer text-[10px] sm:text-xs font-medium transition-colors
    ${activeGenre === genre
                  ? "text-orange-500"
                  : "text-black hover:text-orange-400"
                }`}
            >
              {genre}
            </span>


            {index !== genres.length - 1 && (
              <span className="h-4 w-px bg-gray-300" />
            )}
          </div>
        ))}
      </div>

      {/*====grid section====*/}
      <div className="w-full">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2 sm:gap-2 px-2 sm:px-4 py-4">

          {loading
            ? Array.from({ length: 18 }).map((_, i) => (
              <BookSkeletonCard key={i} />
            ))
            : booksByGenre[activeGenre]?.length
              ? booksByGenre[activeGenre].slice(0, 18).map((book, index) => (
                <BookCard
                  key={book.id}
                  book={book}
                  bookmarked={wishlist.some((b) => b.id === book.id)}
                  onClick={() => onBookClick(book)}
                  onBookmarkChange={() => handleBookmarkChange(book)}
                />
              ))
              : !loading && (
                <p className="text-gray-500 col-span-2 sm:col-span-3 md:col-span-6 lg:col-span-9 text-center">
                  No books available
                </p>
              )
          }
        </div>
      </div>

      {/* ================= VIEW MORE BUTTON ================= */}
      <div className="flex justify-center py-4 sm:py-6">
        <button
          onClick={handleViewMore}
          className="
           px-4 sm:px-6 py-2 sm:py-3
            text-white
            text-sm font-medium
            rounded-full
            bg-gradient-to-r from-sky-600 to-green-400
            border border-gray-300
            hover:from-sky-700 hover:to-green-500
            transition
          "
        >
          View More
        </button>
      </div>
    </div>

  );
};

export default LibraryPreview;
