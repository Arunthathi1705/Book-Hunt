import NavItems from "./NavItems";

const BottomNavbar = ({ activeNav, setActiveNav }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full h-[60px] bg-gray-200 shadow-lg md:hidden z-50 flex items-center">
      <NavItems isMobile={true} activeNav={activeNav} setActiveNav={setActiveNav} />
    </nav>
  );
};

export default BottomNavbar;

