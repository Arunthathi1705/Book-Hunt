import NoBooksFound from "./NoBooksFound";
import BookCard from "./BookCard";

const BooksSearchLayout = ({ 
  search, 
  onBookSelect, 
  mode = "explore",
  wishlist,
  toggleBook
}) => {

  const { results, loading } = search;

  if (!results.length && !loading) {
    return <NoBooksFound />
  }

  return (
    <div
      className={`grid gap-4 ${
        mode === "home"
          ? "grid-cols-2 sm:grid-cols-4"
          : "grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7"
      }`}
    >
     {results.map((book, index) => (
  <BookCard
    key={book.id || book.title || index}
    book={book}
    bookmarked={wishlist.some((b) => b.id === book.id)}
    onClick={() => onBookSelect(book)}
    onBookmarkChange={() => toggleBook(book)}
  />
))}
</div>
  );
};

export default BooksSearchLayout;

