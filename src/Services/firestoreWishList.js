import { db, auth } from "../components/firebase-auth/Firebase";
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

// Add or update bookmark
export const addBookmark = async (book) => {
  if (!auth.currentUser) throw new Error("User not logged in");
  const docRef = doc(db, "users", auth.currentUser.uid, "bookmarks", book.id);
  await setDoc(docRef, book);
};

// Remove bookmark
export const removeBookmark = async (bookId) => {
  if (!auth.currentUser) throw new Error("User not logged in");
  const docRef = doc(db, "users", auth.currentUser.uid, "bookmarks", bookId);
  await deleteDoc(docRef);
};

// Get all bookmarks
export const getBookmarks = async () => {
  if (!auth.currentUser) return [];
  const colRef = collection(db, "users", auth.currentUser.uid, "bookmarks");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => doc.data());
};
