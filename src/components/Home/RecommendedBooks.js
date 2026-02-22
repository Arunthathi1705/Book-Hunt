import { useState, useEffect, useRef } from "react";
import { Text, Tooltip } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useBookmarkHandler } from "../../hooks/useWishList";

import BookCard from "../Library/BookCard";
import BookDetails from "../Library/BookDetails";
import BookSkeletonCard from "../Library/BookSkeletonCard";
import moreThan from "../../Assets/more-than.png";

const RecommendedBooks = ({ booksCache, wishlistState, triggerLogin }) => {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { wishlist = [], toggleBook = () => { } } = wishlistState;
  const handleBookmarkChange = useBookmarkHandler(toggleBook, triggerLogin);


  const recommendedRef = useRef([]);


  useEffect(() => {
    const allBooks = Object.values(booksCache).flat();
    if (allBooks.length === 0) {
      setLoading(false);
      return;
    }

    const shuffled = [...allBooks].sort(() => 0.5 - Math.random());
    recommendedRef.current = shuffled.slice(0, 6);
    setLoading(false);

    // We intentionally exclude booksCache to prevent re-fetch loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className="w-full">
      <Text weight={700} size="lg" mb="sm">
        Recommended Books for you...
      </Text>


      <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 md:flex md:flex-nowrap md:items-start"
      >

        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[30%] md:w-auto">
              <BookSkeletonCard />
            </div>
          ))
          : recommendedRef.current.map((book) => (
            <div key={book.id} className="w-[30%] md:w-auto">
              <BookCard
                book={book}
                bookmarked={wishlist.some((b) => b.id === book.id)}
                onClick={() => setSelectedBook(book)}
                onBookmarkChange={() => handleBookmarkChange(book)}
              />
            </div>
          ))}

        {/* Desktop Arrow */}
        {!loading && (
          <div className="hidden md:flex items-center">
            <Tooltip
              label="See All Recommendations"
              color="gray"
              transitionProps={{ transition: "skew-up", duration: 300 }}
            >
              <img
                src={moreThan}
                alt="more"
                className="w-8 h-8 cursor-pointer hover:scale-110 transition"
                onClick={() => navigate("/library/explore")}
              />
            </Tooltip>
          </div>
        )}
      </div>

      {/* Mobile Arrow */}
      {!loading && (
        <div className="flex md:hidden justify-center mt-6">
          <Tooltip
            label="See All Recommendations"
            color="gray"
            transitionProps={{ transition: "skew-up", duration: 300 }}
          >
            <img
              src={moreThan}
              alt="more"
              className="w-8 h-8 cursor-pointer hover:scale-110 transition"
              onClick={() => navigate("/library/explore")}
            />
          </Tooltip>
        </div>
      )}

      {/* Book Details */}
      {selectedBook && (
        <BookDetails
          book={selectedBook}
          wishlist={wishlist}
          toggleBookmark={handleBookmarkChange}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );

};

export default RecommendedBooks;
