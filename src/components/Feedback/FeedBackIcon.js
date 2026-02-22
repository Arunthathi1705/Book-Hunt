import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import feedbackIcon from "../../Assets/feedback-img.png"; // your FlatIcon image

const FeedbackIcon = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide icon on Feedback page
  if (location.pathname === "/feedback") return null;

  return (
    <div
      onClick={() => navigate("/feedback")}
      className={`
    fixed right-4 md:right-10
bottom-24 sm:bottom-20 md:bottom-8        
    w-12 h-12 cursor-pointer z-50 
    rounded-full flex items-center justify-center
    bg-white
    filter grayscale
    shadow-[0_0_15px_rgba(0,0,0,0.2)] 
    hover:shadow-[0_0_25px_rgba(0,0,0,0.5)]
    transition-all duration-300
    hover:scale-110
  `}
      title="Give Feedback"
    >
      <img
        src={feedbackIcon}
        alt="Feedback"
        className="w-7 h-7 object-contain filter drop-shadow-lg"
      />
    </div>

  );
};

export default FeedbackIcon;
