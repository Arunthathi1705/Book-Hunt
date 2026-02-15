import { useState, useEffect } from 'react';
import { AppShell } from '@mantine/core';
import './App.css';
import TopNavbar from './components/Navbar/TopNavbar.js';
import BottomNavbar from './components/Navbar/BottomNavbar.js';
import Library from './components/Library/Library.js';
import WishList from './components/WishList.js';
import FeedBack from "./components/Feedback/FeedBack.js";
import FeedbackIcon from "./components/Feedback/FeedBackIcon.js";
import Footer from "./components/Footer.js";
import { Routes, Route, useLocation } from "react-router-dom";
import LibraryExplore from "./components/Library/LibraryExplore";
import HomePage from "./components/HomePage";
import { useWishList } from "./hooks/useWishList.js";
import SplashScreen from "./components/SplashScreen.js";
import Login from "./components/firebase-auth/Login.js";
import Register from "./components/firebase-auth/Register.js";

function App() {
  const location = useLocation();
  const wishlistState = useWishList();
  const [activeNav, setActiveNav] = useState("home");

  const [loading, setLoading] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen,] = useState(false);

  const triggerLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  const triggerRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  const closeLogin = () => setLoginModalOpen(false);
  const closeRegister = () => setRegisterModalOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <AppShell
        header={{ height: 60 }}

        padding={0}
      >
        {/* Desktop Top Navbar */}
        <AppShell.Header>
          <TopNavbar triggerLogin={triggerLogin} activeNav={activeNav} setActiveNav={setActiveNav} />
        </AppShell.Header>

        {/* Main Content */}
        <AppShell.Main className="bg-gray-50 pb-[60px] md:pb-0">
          <div className="flex flex-col min-h-[calc(100vh-60px)]">


            <div>
              <Routes location={location} key={location.pathname + location.search}>
                <Route path="/" element={<HomePage wishlistState={wishlistState} triggerLogin={triggerLogin} />} />
                <Route path="/wishList" element={<WishList wishlistState={wishlistState} triggerLogin={triggerLogin} />} />
                <Route path="/feedback" element={<FeedBack />} />
                <Route path="/library" element={<Library wishlistState={wishlistState} triggerLogin={triggerLogin} />} />
                <Route path="/library/explore" element={<LibraryExplore wishlistState={wishlistState} triggerLogin={triggerLogin} />} />
              </Routes>
              <FeedbackIcon />
            </div>

            {/* Footer at bottom of scroll */}
            <Footer />
          </div>
        </AppShell.Main>

        {loginModalOpen && <Login opened={loginModalOpen} onClose={closeLogin} switchToRegister={triggerRegister} />}
        {registerModalOpen && <Register onClose={closeRegister} switchToLogin={triggerLogin} />}
      </AppShell>
      <BottomNavbar activeNav={activeNav} setActiveNav={setActiveNav} />
    </>
  );
}

export default App;
