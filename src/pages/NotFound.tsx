import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Logo Taxi Time en grand */}
      <img src="/cabslogo.png" alt="Taxi Time" className="h-24 mb-6" />

      <h1 className="text-6xl font-extrabold text-yellow-500">404</h1>
      <p className="text-xl text-gray-400 mt-2">Oops ! Page introuvable.</p>
      <p className="text-sm text-gray-500 mt-1">
        L'URL que vous avez demandée n'existe pas ou a été déplacée.
      </p>

      {/* Bouton pour revenir à l'accueil */}
      <Link
        to="/"
        className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
      >
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
