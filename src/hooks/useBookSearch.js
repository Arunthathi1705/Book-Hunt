import { useEffect, useState, useRef } from "react";
import { searchBooks } from "../Services/googleBooksApi";

export function useBookSearch(initialTerm = "") {
  const [searchTerm, setSearchTerm] = useState(initialTerm);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const cacheRef = useRef({});
  const lastSearchedRef = useRef("");

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const runSearch = async () => {
      if (lastSearchedRef.current === searchTerm) return;

      lastSearchedRef.current = searchTerm;
      setLoading(true);

      try {
        // Use cache if available
        if (cacheRef.current[searchTerm]) {
          setResults(cacheRef.current[searchTerm]);
        } else {
          const items = await searchBooks(searchTerm, 0, 35);
          cacheRef.current[searchTerm] = items;
          setResults(items);
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(runSearch, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
  };

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    clearSearch,
  };
}
