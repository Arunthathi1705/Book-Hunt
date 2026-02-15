import { useState, useEffect } from "react";
import NavItems from "./NavItems";
import userIcon from "../../Assets/user.png"
import Login from "../../components/firebase-auth/Login";
import Register from "../../components/firebase-auth/Register";
import { auth } from "../../components/firebase-auth/Firebase";

const TopNavbar = ({ triggerLogin, activeNav, setActiveNav }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("Logged out successfully!");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      <nav className="h-[60px] bg-gray-200 flex items-center justify-between px-6 shadow-md">
        {/* Left Side */}
        <div className="flex flex-col justify-center">
          <h1 className="m-0 text-xl font-bold leading-none">
            <span className="text-red-500">Book</span>
            <span className="text-stone-700">Hunt</span>
          </h1>
          <p className="text-xs italic mt-0 text-gray-600">
            Search, Discover, Explore
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center">

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex h-full items-center gap-4">
            <NavItems activeNav={activeNav} setActiveNav={setActiveNav} />
          </div>


          {!user ? (
            <button
              onClick={triggerLogin}
              className="ml-4 flex items-center gap-2 px-3 py-1 rounded-md border border-gray-300 bg-white text-red-800 hover:bg-gray-100 transition"
            >
              <img src={userIcon} alt="user" className="h-4 w-4" />
              <span className="text-sm">Login</span>
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="ml-4 flex items-center gap-2 px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 transition"
            >
              <img src={userIcon} alt="user" className="h-4 w-4" />
              <span className="text-sm">Logout</span>
            </button>
          )}
        </div>
      </nav>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          switchToRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          switchToLogin={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
};

export default TopNavbar;