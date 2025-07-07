import { useState, useEffect, useRef } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { ForgetPasswordForm } from "@/components/auth/ForgetPasswordForm";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  const fullText =
    "La plateforme dédiée aux sociétés de taxi pour gérer leurs chauffeurs simplement et efficacement.";
  const [visibleText, setVisibleText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowSplash(false), 1000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        if (indexRef.current < fullText.length) {
          setVisibleText((prev) => prev + fullText.charAt(indexRef.current));
          indexRef.current++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showSplash]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative p-4">
      {showSplash && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gray-900 z-50 ${
            fadeOut
              ? "opacity-0 transition-opacity duration-1000 ease-in-out"
              : "opacity-100"
          }`}
        >
          <img src="/cabslogo.png" alt="Cabs" className="h-40 animate-pulse" />
        </div>
      )}

      {!showSplash && (
        <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl">
          <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {!showForgetPassword ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm
                    onSuccess={() => {}}
                    onForgetPassword={() => setShowForgetPassword(true)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="forget"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ForgetPasswordForm
                    onCancel={() => setShowForgetPassword(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-black p-6">
            <a
              href="https://www.taxitime.be"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg font-bold hover:text-yellow-400"
            >
              Cabs.
            </a>
            <p className="text-sm mt-2 text-center">{visibleText}</p>
            <p className="text-xs mt-10 text-gray-400">
              Made with love in Brussels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
