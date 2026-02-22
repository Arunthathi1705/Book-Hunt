import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../Data/navData.js";

const NavItems = ({ isMobile = false, activeNav, setActiveNav }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile || location.pathname !== "/") return;


    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveNav(visible[0].target.id);
        }
      },
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    );

    navItems.forEach(item => {
      if (!item.route) {
        const section = document.getElementById(item.id);
        if (section) observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname, isMobile, setActiveNav]);



  useEffect(() => {
    const routeToNav = {
      "/": "home",
      "/wishList": "wishList",
      "/feedback": "feedback",
      "/library": "library",
      "/library/explore": "explore"
    };
    if (routeToNav[location.pathname]) {
      setActiveNav(routeToNav[location.pathname]);
    }
  }, [location.pathname, setActiveNav]);



  //  navigate handler
  const scrollToSection = (id, route) => {
    if (route) {
      setActiveNav(route);
      navigate(route);
    } else {
      setActiveNav(id);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/", { replace: false });
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  };


  return (
    <div
      className={`flex ${isMobile ? "justify-around items-center w-full h-full" : "justify-end h-full"
        }`}
    >
      {navItems.map((item, idx) => (
        <div key={item.id} className="flex items-center">
          {!isMobile && (
            <>
              <div
                onClick={() => scrollToSection(item.id, item.route)}
                className={`px-3 cursor-pointer transition-colors text-sm
  ${activeNav === item.id || activeNav === item.route ? "text-red-500" : "text-gray-800"}
  hover:text-red-500 h-full flex items-center`}
              >
                {item.label}
              </div>
              {idx !== navItems.length - 1 && (
                <div className="w-px h-6 bg-gray-300 mx-2" />
              )}
            </>
          )}

          {isMobile && (
            <div
              onClick={() => scrollToSection(item.id, item.route)}
              className={`flex flex-col items-center justify-center cursor-pointer px-2 py-1 transition-colors
                ${activeNav === item.id ? "text-red-500" : "text-gray-800"}
                hover:text-red-500
              `}
            >
              {item.icon && <img src={item.icon} alt={item.label} className="h-5 w-5 mb-1" />}
              <span className="text-xs">{item.label}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default NavItems;
