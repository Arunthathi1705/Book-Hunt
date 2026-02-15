import axios from "axios";

const BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_KEY;

export async function fetchBooksByGenrePaginated(genre, startIndex = 0, maxResults = 20) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        q: `subject:${genre}`,
        startIndex,
        maxResults,
        key: API_KEY,
      },
    });

    return (res.data.items || []).map((book, index) => ({
      id: book.id || `${genre}-${startIndex + index}`,
      volumeInfo: {
        title: book.volumeInfo?.title || "No title",
        authors: book.volumeInfo?.authors || ["Unknown author"],
        description: book.volumeInfo?.description || "No description available",
        publisher: book.volumeInfo?.publisher || "Unknown publisher",
        publishedDate: book.volumeInfo?.publishedDate || "",
        pageCount: book.volumeInfo?.pageCount || 0,
        categories: book.volumeInfo?.categories || [],
        averageRating: book.volumeInfo?.averageRating ?? null,
        imageLinks: {
          large: book.volumeInfo?.imageLinks?.large,
          medium: book.volumeInfo?.imageLinks?.medium,
          thumbnail: book.volumeInfo?.imageLinks?.thumbnail,
          smallThumbnail: book.volumeInfo?.imageLinks?.smallThumbnail,
        },
      },
    }));
  } catch (error) {
    console.error(`Error fetching books for genre "${genre}":`, error);
    return [];
  }
}


export async function searchBooks(term, startIndex = 0, maxResults = 20) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        q: `intitle:${term}`,
        startIndex,
        maxResults,
        key: API_KEY,
      },
    });

    return (res.data.items || []).map((book, index) => ({
      id: book.id || `${term}-${startIndex + index}`,
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
  } catch (error) {
    console.error(`Error searching books for term "${term}":`, error);
    return [];
  }
}
