import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import searchIcon from "../../Assets/search-icon.png";
import { searchBooks } from "../../Services/googleBooksApi";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const HomeSearchBar = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const cache = useRef({});

  const navigate = useNavigate();

  useEffect(() => {
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }



    const fetchSuggestions = async () => {
      const normalizedTerm = value.replace(/\s+/g, ' ').trim();


      if (cache.current[normalizedTerm]) {
        setSuggestions(cache.current[normalizedTerm]);
        return;
      }

      try {
        const results = await searchBooks(normalizedTerm, 0, 6);
        const filteredResults = results.filter(book =>
          book.volumeInfo.title.toLowerCase().includes(normalizedTerm.toLowerCase())
        );
        cache.current[normalizedTerm] = filteredResults;

        setSuggestions(filteredResults);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    };


    const t = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(t);
  }, [value]);

  const handleSelect = (title) => {
    navigate(`/library/explore?search=${encodeURIComponent(title)}`);
    setValue("");
    setSuggestions([]);
  };

  const handleClear = () => {
    setValue("");
    setSuggestions([]);
  };


  return (
    <div className="relative w-[92%] sm:w-[75%] md:w-[60%] max-w-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="
    w-full flex items-center gap-2 sm:gap-3

    bg-white
   px-4 py-2 sm:px-6 sm:py-3

    rounded-full
    border border-white/90

    shadow-[0_0_25px_rgba(255,255,255,0.9),0_0_40px_rgba(0,0,0,0.6)]
    transition-all duration-300
    focus-within:shadow-[0_0_35px_rgba(255,255,255,1),0_0_60px_rgba(0,0,0,0.9)]
  "
      >
        {/* Input */}
        <img src={searchIcon} alt="search-icon" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
        <input
          type="text"
          placeholder="Search for books..."
          className="
    w-full
    bg-transparent
    outline-none
    border-none
    text-base sm:text-lg

    text-gray-800
    placeholder-gray-500
    
  "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <span
            onClick={handleClear}
            className="cursor-pointer absolute right-7 top-1/2 -translate-y-1/2 text-md text-gray-500 hover:text-gray-900"
          >
            ✕
          </span>
        )}

      </motion.div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow z-20">
            {suggestions.map((book) => (
              <li
                key={book.id}
                onClick={() => handleSelect(book.volumeInfo.title)}
                className="px-2 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                <span>{book.volumeInfo.title}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Unknown"}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>

  );
};

export default HomeSearchBar;
