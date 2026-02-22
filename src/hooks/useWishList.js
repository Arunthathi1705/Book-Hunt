import { useState, useEffect } from "react";
import { auth, db } from "../components/firebase-auth/Firebase";
import { collection, doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";



// Main hook for wishlist
export const useWishList = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
  let unsubscribeSnapshot = null;

  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {

    // If user logs out → clear wishlist immediately
    if (!user) {
      setWishlist([]);
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }
      return;
    }

    // If user logs in → attach Firestore listener
    const colRef = collection(db, "users", user.uid, "bookmarks");

    unsubscribeSnapshot = onSnapshot(colRef, (snapshot) => {
      const books = snapshot.docs.map(doc => doc.data());
      setWishlist(books);
    });
  });

  return () => {
    if (unsubscribeSnapshot) unsubscribeSnapshot();
    unsubscribeAuth();
  };
}, []);


  const toggleBook = async (book) => {
    if (!auth.currentUser) return;
    const docRef = doc(db, "users", auth.currentUser.uid, "bookmarks", book.id);

    if (wishlist.some(b => b.id === book.id)) {
      await deleteDoc(docRef);
      setWishlist(prev => prev.filter(b => b.id !== book.id));
    } else {
      await setDoc(docRef, book);
      setWishlist(prev => [...prev, book]);
    }
  };

  const isBookInWishlist = (book) => wishlist.some(b => b.id === book.id);

  return { wishlist, toggleBook, isBookInWishlist };
};

//navigating to login through alert
export const useBookmarkHandler = (toggleBook, triggerLogin) => {
  const handleBookmarkChange = (book) => {
    if (!auth.currentUser) {
      alert("Please login to bookmark books!");
      triggerLogin?.();
      return;
    }
    toggleBook(book);
  };

  return handleBookmarkChange;
};
