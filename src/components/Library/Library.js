import { useEffect, useState } from "react";
import { fetchBooksByGenrePaginated } from "../../Services/googleBooksApi";
import { useBookmarkHandler } from "../../hooks/useWishList";
import LibraryPreview from "./LibraryPreview";
import BookDetails from "./BookDetails";


const GENRES = [
  "Fiction",
  "Romance",
  "History",
  "Science",
  "Adventure",
  "Technology",
];

const Library = ({ wishlistState, triggerLogin }) => {
  const [libraryBooks, setLibraryBooks] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const { wishlist, toggleBook, isBookInWishlist } = wishlistState;
  const handleBookmarkChange = useBookmarkHandler(toggleBook, triggerLogin);


  useEffect(() => {
    const fetchActiveGenre = async () => {
      const activeGenre = GENRES[0];
      setLoading(true);

      try {
        const cached = localStorage.getItem(`books-${activeGenre}`);
        if (cached) {
          setLibraryBooks({ [activeGenre]: JSON.parse(cached) });
        } else {
          const rawBooks = await fetchBooksByGenrePaginated(activeGenre, 0, 18);
          const books = rawBooks.map((book, index) => ({
            id: `${activeGenre}-${book.id || index}`,
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
          setLibraryBooks({ [activeGenre]: books });
          localStorage.setItem(`books-${activeGenre}`, JSON.stringify(books));
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveGenre();
  }, []);

  const openBookDetails = (book) => setSelectedBook(book);
  const closeBookDetails = () => setSelectedBook(null);

  return (
    <div id="library" className="mt-16 min-h-[calc(100vh-60px)] w-full">
      <LibraryPreview
        genres={GENRES}
        booksByGenre={libraryBooks}
        setLibraryBooks={setLibraryBooks}
        loading={loading}
        onBookClick={openBookDetails}
        wishlist={wishlist}
        toggleBook={wishlistState.toggleBook}
        triggerLogin={triggerLogin}
        isBookInWishlist={isBookInWishlist}
      />

      {selectedBook && (
        <BookDetails
          book={selectedBook}
          onClose={closeBookDetails}
          wishlist={wishlist}
          toggleBookmark={handleBookmarkChange}
          isBookInWishlist={isBookInWishlist}
        />
      )}
    </div>
  );
};

export default Library;
