import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-white mb-4 text-center">
        Overwatch Randomizer
      </h1>

      <p className="text-gray-400 text-center mb-12 max-w-md">
        Pick a role to randomize a single hero, or use Team to roll a full comp with 1 tank, 2 DPS, and 2 supports!
      </p>
      <nav className="flex flex-col gap-6 items-center">
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to="/tank"
            className="w-40 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-center"
          >
            TANK
          </Link>
          <Link
            to="/dps"
            className="w-40 px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-center"
          >
            DPS
          </Link>
          <Link
            to="/support"
            className="w-40 px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-center"
          >
            SUPPORT
          </Link>
        </div>
        <Link
          to="/team"
          className="w-40 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 text-center"
        >
          TEAM
        </Link>
      </nav>
      <Footer />
    </div>
  );
}
