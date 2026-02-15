import homeIcon from "../Assets/nav-icons/home.png";
import aboutIcon from "../Assets/nav-icons/about.png";
import libraryIcon from "../Assets/nav-icons/books.png";
import wishListIcon from "../Assets/nav-icons/favorites.png";
import feedbackIcon from "../Assets/nav-icons/feedback.png";


export const navItems = [
  { id: "home", label: "Home", icon: homeIcon },
  { id: "about", label: "About", icon: aboutIcon },
  { id: "library", label: "Library", icon: libraryIcon },

  { id: "wishList", label: "Wish List", icon: wishListIcon, route: "/wishList" },
  { id: "feedback", label: "Feedback", icon: feedbackIcon, route: "/feedback" },
];

