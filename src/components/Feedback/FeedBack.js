import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Rating } from "@mantine/core";
import { motion } from "framer-motion";
import feedbackImg from "../../Assets/feedback-img.jpg";
import successImg from "../../Assets/success-img.png";
import Lottie from 'lottie-react';
import blastAnimation from '../../Assets/blast.json';

const FeedBack = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_6qfkg2e",
        "template_m6wxopr",
        { name, email, feedback, rating },
        "CgV3AtUX5clO-jtB4"
      )
      .then(
        () => {
          setSubmitted(true);
          setName("");
          setEmail("");
          setFeedback("");
          setRating(0);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          alert("Failed to send feedback. Try again.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="min-h-[calc(100vh-60px)] w-full flex flex-col items-center py-14 bg-gray-100">


      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${feedbackImg})` }}
      />

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
    relative
    w-[92%] sm:w-full
    max-w-sm sm:max-w-xl md:max-w-2xl
    mx-auto
    bg-white
    rounded-2xl
    p-4 sm:p-6
    shadow-2xl
  " >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-xl font-semibold text-slate-700 mb-1">

            Share Your BookHunt Experience
          </h2>
          <p className="text-gray-500 text-sm sm:text-xs max-w-full">

            Tell us what you love — Every suggestion brings us one step closer to a better BookHunt experience.
          </p>
        </div>

        {/* Submitted */}
        {submitted ? (
          <>
            <span
              onClick={() => setSubmitted(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl cursor-pointer z-50"
            >
              ✕
            </span>
            <div className="relative w-full flex items-center justify-center mt-6">
              <div className="absolute left-0 top-0 w-20 h-20 sm:w-24 sm:h-24">
                <Lottie animationData={blastAnimation} loop={true} />
              </div>
              <div className="absolute right-0 top-0  w-28 h-28 sm:w-24 sm:h-24 scale-x-[-1]">
                <Lottie animationData={blastAnimation} loop={true} />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.img
                  src={successImg}
                  alt="Success"
                  className="w-40 sm:w-48 mb-1"
                  initial={{ y: -10 }}
                  animate={{ y: 10 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 2, ease: "easeInOut" }}
                />
                <h3 className="text-2xl font-semibold text-slate-700 mb-1">Thank you! 💜</h3>
                <p className="text-gray-500 text-sm max-w-md mb-0">
                  Your feedback helps us improve BookHunt and create a better reading experience for everyone.
                </p>
              </div>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-6">
            <motion.input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
              required
              animate={{
                scale: focusedField === "name" ? 1.02 : 1,
                boxShadow: focusedField === "name" ? "0 0 15px rgba(147, 51, 234, 0.4)" : "0 1px 3px rgba(0,0,0,0.05)",
              }}
              transition={{ duration: 0.2 }}
              className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm sm:text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"


            />

            <motion.input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              required
              animate={{
                scale: focusedField === "email" ? 1.02 : 1,
                boxShadow: focusedField === "email" ? "0 0 15px rgba(147, 51, 234, 0.4)" : "0 1px 3px rgba(0,0,0,0.05)",
              }}
              transition={{ duration: 0.2 }}
              className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm sm:text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"


            />

            <motion.textarea
              placeholder="Tell us about your experience with BookHunt..."
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              onFocus={() => setFocusedField("feedback")}
              onBlur={() => setFocusedField(null)}
              required
              animate={{
                scale: focusedField === "feedback" ? 1.02 : 1,
                boxShadow: focusedField === "feedback" ? "0 0 18px rgba(147, 51, 234, 0.4)" : "0 1px 3px rgba(0,0,0,0.05)",
              }}
              transition={{ duration: 0.2 }}
              className="w-full bg-slate-100 border-none rounded-lg px-3 py-1.5 text-sm sm:text-xs text-slate-800 outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"

            />

            <div className="flex items-center gap-4">
              <span className="font-medium text-slate-700 text-sm">Rate your experience:</span>
              <Rating value={rating} onChange={setRating} fractions={2} color="orange" />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-lime-500 hover:bg-lime-600 disabled:opacity-60 border-none text-white font-medium rounded-full px-4 py-1.5 text-sm"

              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default FeedBack;
