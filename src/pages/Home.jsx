import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-white mb-12 text-center">
        Overwatch Randomizer
      </h1>
      <nav className="flex flex-col sm:flex-row gap-6">
        <Link
          to="/tank"
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-center"
        >
          Tank
        </Link>
        <Link
          to="/dps"
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-center"
        >
          Dps
        </Link>
        <Link
          to="/support"
          className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-center"
        >
          Support
        </Link>
      </nav>
      <Footer />
    </div>
  );
}
