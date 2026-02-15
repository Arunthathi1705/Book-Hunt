import { useEffect, useState } from "react";
import { Loader, Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import introVideo from "../Assets/intro-1.mp4";
import searchVideo from "../Assets/intro-2.mp4";

export default function SplashScreen() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3500),
      setTimeout(() => navigate("/"), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[radial-gradient(circle_at_center,_white_0%,_#fff7f7_40%,_#ffe5e5_100%)] px-4">

      <AnimatePresence mode="wait">

        {/* First Video */}
        {step === 1 && (
          <motion.video
            key="video1"
            src={introVideo}
            autoPlay
            muted
            className="w-48 sm:w-64 md:w-72 max-w-full mix-blend-multiply"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}

        {/*Second Video */}
        {step === 2 && (
          <motion.video
            key="video2"
            src={searchVideo}
            autoPlay
            muted
            className="w-48 sm:w-64 md:w-72 max-w-full mix-blend-multiply"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}


        {step === 3 && (
          <motion.div
            key="title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-1 sm:gap-2"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-center">
              <span className="text-red-600">Book</span>
              <span className="text-black">Hunt</span>
            </h1>

            <Text size="sm" sm="md" className="text-gray-600 text-center">
              Explore your books here...
            </Text>

            <Loader color="red" size="sm" sm="md" type="dots" />
          </motion.div>
        )}

      </AnimatePresence>
    </div>

  );
}
