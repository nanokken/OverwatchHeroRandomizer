import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import heroesData from "../data/heroes.json";
import Footer from "../components/Footer";
import teamRollSound from "../assets/teamRoll.mp3";

export default function Team() {
  const tanks = heroesData.heroes.filter((hero) => hero.role === "tank");
  const dpsHeroes = heroesData.heroes.filter((hero) => hero.role === "dps");
  const supports = heroesData.heroes.filter((hero) => hero.role === "support");

  const [team, setTeam] = useState([null, null, null, null, null]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(-1);

  const roleColors = {
    tank: "border-blue-500",
    dps: "border-red-500",
    support: "border-green-500",
  };

  const roleBgColors = {
    tank: "bg-blue-500/20",
    dps: "bg-red-500/20",
    support: "bg-green-500/20",
  };

  const randomize = () => {
    if (isRolling) return;
    setIsRolling(true);
    setTeam([null, null, null, null, null]);
    setCurrentSlot(-1);

    const newTeam = [
      tanks[Math.floor(Math.random() * tanks.length)],
    ];

    // Pick 2 unique DPS
    const dpsShuffled = [...dpsHeroes].sort(() => Math.random() - 0.5);
    newTeam.push(dpsShuffled[0], dpsShuffled[1]);

    // Pick 2 unique supports
    const supportsShuffled = [...supports].sort(() => Math.random() - 0.5);
    newTeam.push(supportsShuffled[0], supportsShuffled[1]);

    // Play sound after 1 second
    setTimeout(() => {
      const audio = new Audio(teamRollSound);
      audio.play();
    }, 1000);

    // Reveal each character one per second
    newTeam.forEach((hero, index) => {
      setTimeout(() => {
        setCurrentSlot(index);
        setTeam((prev) => {
          const updated = [...prev];
          updated[index] = hero;
          return updated;
        });

        if (index === newTeam.length - 1) {
          setIsRolling(false);
        }
      }, (index + 1) * 1000);
    });
  };

  const slotLabels = ["Tank", "DPS 1", "DPS 2", "Support 1", "Support 2"];
  const slotRoles = ["tank", "dps", "dps", "support", "support"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8">
      <Link
        to="/"
        className="absolute top-4 left-4 text-white hover:text-purple-400 transition-colors"
      >
        ← Back
      </Link>
      <h1 className="text-5xl font-bold text-purple-500 mb-8">Team Roll</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {team.map((hero, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-gray-400 text-sm mb-2">{slotLabels[index]}</span>
            <div
              className={`w-32 h-32 rounded-xl bg-gray-700 flex items-center justify-center overflow-hidden shadow-xl border-4 ${roleColors[slotRoles[index]]} relative`}
            >
              <AnimatePresence mode="wait">
                {hero ? (
                  <motion.img
                    key={hero.name}
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-full object-cover"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                  />
                ) : (
                  <motion.span
                    key="placeholder"
                    className={`text-gray-400 text-4xl ${currentSlot === index - 1 || (currentSlot === -1 && index === 0 && isRolling) ? "animate-pulse" : ""}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ?
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="text-white text-sm mt-2 h-5">
              {hero ? hero.name : ""}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={randomize}
        disabled={isRolling}
        className="px-8 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 disabled:scale-100"
      >
        {isRolling ? "Rolling..." : "Roll Team"}
      </button>
      <Footer />
    </div>
  );
}
