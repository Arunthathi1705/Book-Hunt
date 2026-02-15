import React, { useState } from "react";
import { Text, Container } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";
import BookCard from "../components/Library/BookCard";
import BookDetails from "../components/Library/BookDetails";

const WishList = ({ wishlistState }) => {
  const { wishlist, toggleBook, isBookInWishlist } = wishlistState;
  const [selectedBook, setSelectedBook] = useState(null);


  return (
    <div id="wishlist" className="min-h-[calc(100vh-60px)] w-full pt-10">
      <Container size="xl" className="my-8">
        <div className="mb-6 text-center">
          <Text size="xl" fw={800} c="orange">
            Your Wishlist
          </Text>
          <Text size="sm" c="gray">
            Save your favorite books here. Click the bookmark icon to remove any book.
          </Text>
        </div>

        {wishlist.length === 0 ? (
          <Text size="sm" c="gray" className="text-center mt-8">
            Your wishlist is empty. Browse books and add your favorites!
          </Text>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">

              <AnimatePresence>
                {wishlist.map((book) => (
                  <motion.div
                    key={book.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BookCard
                      book={book}
                      bookmarked={isBookInWishlist(book)}
                      onClick={() => setSelectedBook(book)}
                      onBookmarkChange={() => toggleBook(book)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        )}

        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            wishlist={wishlist}
            toggleBookmark={toggleBook}
            isBookInWishlist={isBookInWishlist}
          />
        )}
      </Container>
    </div>
  );
};

export default WishList;
