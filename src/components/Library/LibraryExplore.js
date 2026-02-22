import { useEffect, useState } from "react";
import { Radio, Stack, Button } from "@mantine/core";
import { useSearchParams, useNavigate } from "react-router-dom";
import menuIcon from "../../Assets/menu.png"
import BookCard from "./BookCard";
import BookDetails from "./BookDetails";
import ExploreSearchBar from "./ExploreSearchBar";
import BookSkeletonCard from "./BookSkeletonCard";
import { useBookSearch } from "../../hooks/useBookSearch";
import { fetchBooksByGenrePaginated } from "../../Services/googleBooksApi";
import { BOOK_GENRES } from "../../Data/Book-Genres";
import { useBookmarkHandler } from "../../hooks/useWishList";
import { IconArrowLeft } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import NoBooksFound from "./NoBooksFound";


const LibraryExplore = ({ wishlistState, triggerLogin }) => {
  const [activeGenre, setActiveGenre] = useState("Fiction");
  const [books, setBooks] = useState([]);
  const [booksCache, setBooksCache] = useState({});
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const navigate = useNavigate();

  const { wishlist, toggleBook, isBookInWishlist } = wishlistState;
  const handleBookmarkChange = useBookmarkHandler(toggleBook, triggerLogin);

  const {
    searchTerm,
    setSearchTerm,
    results,
    loading: searchLoading,
    clearSearch
  } = useBookSearch();

  useEffect(() => setSelectedBook(null), []);
  useEffect(() => { if (!urlSearch) setSearchTerm(""); }, [urlSearch, setSearchTerm]);
  useEffect(() => { if (urlSearch) setSearchTerm(prev => prev !== urlSearch ? urlSearch : prev); }, [urlSearch, setSearchTerm]);

// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (searchTerm.trim()) return;

    const loadBooks = async () => {
      setLoading(true);
      try {
        const cacheKey = `explore-${activeGenre}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const parsed = JSON.parse(cached);
          setBooks(parsed);
          setBooksCache(prev => ({ ...prev, [activeGenre]: parsed }));
          setLoading(false);
          return;
        }

        if (booksCache[activeGenre]) {
          setBooks(booksCache[activeGenre]);
          setLoading(false);
          return;
        }

        const rawBooks = await fetchBooksByGenrePaginated(activeGenre, 0, 35);
        const allBooks = rawBooks.map((book, index) => ({
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

        setBooks(allBooks);
        setBooksCache(prev => ({ ...prev, [activeGenre]: allBooks }));
        localStorage.setItem(cacheKey, JSON.stringify(allBooks));
      } catch (error) {
        console.error("Error fetching books", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();

  }, [activeGenre, searchTerm]);

  const isSearchMode = searchTerm.trim().length > 0;

  return (
    <div className="pt-6 min-h-[calc(100vh-64px)] flex gap-6 px-6 relative">

      {/* ==================== MOBILE LEFT SIDEBAR ==================== */}
      <AnimatePresence>
        {isGenreMenuOpen && (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            className="sm:hidden absolute top-0 left-0 h-full w-48 bg-white shadow-lg z-40 p-4"
          >
            <h3 className="font-bold text-base text-slate-600 mb-2">Explore Genres</h3>
            <Radio.Group
              value={activeGenre}
              onChange={(genre) => {
                setActiveGenre(genre);
                setIsGenreMenuOpen(false);
                clearSearch();
              }}
            >
              <Stack gap={3}>
                {BOOK_GENRES.map((genre) => (
                  <Radio key={genre} value={genre} label={genre} size="xs" color="orange" />
                ))}
              </Stack>
            </Radio.Group>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== DESKTOP LEFT SIDEBAR ==================== */}
      <div className="hidden sm:flex w-[240px] shrink-0 bg-white rounded-lg shadow-sm p-4 flex-col">
        <h3 className="font-bold text-base text-slate-600 mb-2">Explore Genres</h3>
        <div className="overflow-y-auto pr-2">
          <Radio.Group
            value={activeGenre}
            onChange={(genre) => { setActiveGenre(genre); clearSearch(); }}
          >
            <Stack gap={6}>
              {BOOK_GENRES.map((genre) => (
                <Radio key={genre} value={genre} label={genre} size="xs" color="orange" />
              ))}
            </Stack>
          </Radio.Group>
        </div>
      </div>

      {/* ==================== RIGHT SECTION ==================== */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center mt-1">
          <Button
            variant="light"
            radius="xl"
            size="xs"
            className="flex items-center gap-2"
            onClick={() => navigate("/library")}
          >
            <IconArrowLeft size={16} />
            Back to Library
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-2 sm:hidden">
          <span
            className="p-2 bg-gray-100 rounded-md flex flex-col gap-[3px]"
            onClick={() => setIsGenreMenuOpen(prev => !prev)}
          >
            <img src={menuIcon} alt="menu" className="w-6 h-6 cursor-pointer" />
          </span>
          <span className="font-semibold text-base">
            {isSearchMode ? "Search Results" : `${activeGenre} Books`}
          </span>
        </div>


        <span className="hidden sm:block font-semibold text-base mb-1">
          {isSearchMode ? "Search Results" : `${activeGenre} Books`}
        </span>


        {/* Search bar */}
        <div className="mt-2 w-full">
          <ExploreSearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            title={isSearchMode ? "Search Results" : ""}
          />
        </div>

        {/* GRID */}
        <div className="flex-1 mt-4 overflow-y-auto max-h-[calc(100vh-16rem)]">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 p-2">
            {(loading || searchLoading) ? (
              Array.from({ length: 35 }).map((_, i) => <BookSkeletonCard key={i} />)
            ) : isSearchMode ? (
              results.length > 0 ? (
                results.map((book, index) => (
                  <BookCard
                    key={book.id || `search-${index}`}
                    book={book}
                    bookmarked={wishlist.some((b) => b.id === book.id)}
                    onClick={() => setSelectedBook(book)}
                    onBookmarkChange={() => handleBookmarkChange(book)}
                  />
                ))
              ) : (
                <p className="col-span-3 sm:col-span-4 md:col-span-6 lg:col-span-7 text-center text-gray-500">
                  <NoBooksFound />
                </p>
              )
            ) : (
              books.map((book, index) => (
                <BookCard
                  key={book.id || `${activeGenre}-${index}`}
                  book={book}
                  bookmarked={wishlist.some((b) => b.id === book.id)}
                  onClick={() => setSelectedBook(book)}
                  onBookmarkChange={() => handleBookmarkChange(book)}
                />
              ))
            )}
          </div>
        </div>

        {/* DETAILS */}
        {selectedBook && (
          <BookDetails
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
            wishlist={wishlist}
            toggleBookmark={handleBookmarkChange}
            isBookInWishlist={isBookInWishlist}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/30"
          />
        )}

      </div>
    </div >
  );
};

export default LibraryExplore;
