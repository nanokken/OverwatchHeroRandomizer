import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import heroesData from "../data/heroes.json";
import Footer from "../components/Footer";
import rollSound from "../assets/roll2.mp3";
import rolledSound from "../assets/rolled.mp3";

export default function Dps() {
  const dpsHeroes = heroesData.heroes.filter((hero) => hero.role === "dps");
  const [selectedHero, setSelectedHero] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayHero, setDisplayHero] = useState(null);
  const [slideKey, setSlideKey] = useState(0);

  const randomize = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedHero(null);

    const audio = new Audio(rollSound);
    audio.play();

    let iterations = 0;
    const maxIterations = 35;
    const baseDelay = 40;

    const spin = () => {
      const randomIndex = Math.floor(Math.random() * dpsHeroes.length);
      setDisplayHero(dpsHeroes[randomIndex]);
      setSlideKey((prev) => prev + 1);
      iterations++;

      if (iterations >= maxIterations) {
        const finalHero =
          dpsHeroes[Math.floor(Math.random() * dpsHeroes.length)];
        setDisplayHero(finalHero);
        setSlideKey((prev) => prev + 1);
        setSelectedHero(finalHero);
        setIsSpinning(false);
        const rolledAudio = new Audio(rolledSound);
        rolledAudio.play();
      } else {
        const progress = iterations / maxIterations;
        const delay = baseDelay + Math.pow(progress, 3) * 350;
        setTimeout(spin, delay);
      }
    };

    spin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8">
      <Link
        to="/"
        className="absolute top-4 left-4 text-white hover:text-red-400 transition-colors"
      >
        ← Back
      </Link>
      <h1 className="text-5xl font-bold text-red-500 mb-8">DPS</h1>

      <div className="w-64 h-64 mb-8 rounded-xl bg-gray-700 flex items-center justify-center overflow-hidden shadow-2xl border-4 border-red-500 relative">
        <AnimatePresence mode="popLayout">
          {displayHero ? (
            <motion.img
              key={slideKey}
              src={displayHero.image}
              alt={displayHero.name}
              className="w-full h-full object-cover absolute"
              initial={{ y: -280, opacity: 0.7 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 280, opacity: 0.7 }}
              transition={{ duration: isSpinning ? 0.06 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            />
          ) : (
            <motion.span
              key="placeholder"
              className="text-gray-400 text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ?
            </motion.span>
          )}
        </AnimatePresence>
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
        className="px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 disabled:scale-100"
      >
        {isSpinning ? "Randomizing..." : "Randomize"}
      </button>
      <Footer />
    </div>
  );
}
