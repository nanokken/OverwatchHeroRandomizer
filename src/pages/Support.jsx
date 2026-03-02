import { useState } from "react";
import { Link } from "react-router-dom";
import heroesData from "../data/heroes.json";
import Footer from "../components/Footer";

export default function Support() {
  const supports = heroesData.heroes.filter((hero) => hero.role === "support");
  const [selectedHero, setSelectedHero] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayHero, setDisplayHero] = useState(null);

  const randomize = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedHero(null);

    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * supports.length);
      setDisplayHero(supports[randomIndex]);
      iterations++;

      if (iterations >= maxIterations) {
        clearInterval(interval);
        const finalHero = supports[Math.floor(Math.random() * supports.length)];
        setDisplayHero(finalHero);
        setSelectedHero(finalHero);
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8">
      <Link
        to="/"
        className="absolute top-4 left-4 text-white hover:text-green-400 transition-colors"
      >
        ← Back
      </Link>
      <h1 className="text-5xl font-bold text-green-500 mb-8">Support</h1>

      <div className="w-64 h-64 mb-8 rounded-xl bg-gray-700 flex items-center justify-center overflow-hidden shadow-2xl border-4 border-green-500">
        {displayHero ? (
          <img
            src={displayHero.image}
            alt={displayHero.name}
            className={`w-full h-full object-cover ${isSpinning ? "animate-pulse" : ""}`}
          />
        ) : (
          <span className="text-gray-400 text-6xl">?</span>
        )}
      </div>

      <p className="text-2xl text-white mb-6 h-8">
        {selectedHero
          ? selectedHero.name
          : displayHero
            ? displayHero.name
            : "Press to randomize!"}
      </p>

      <button
        onClick={randomize}
        disabled={isSpinning}
        className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 disabled:scale-100"
      >
        {isSpinning ? "Randomizing..." : "Randomize"}
      </button>
      <Footer />
    </div>
  );
}
