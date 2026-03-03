import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import heroesData from "../data/heroes.json";
import Footer from "../components/Footer";
import teamRollSound from "../assets/teamRoll.mp3";

export default function Team6v6() {
  const tanks = heroesData.heroes.filter((hero) => hero.role === "tank");
  const dpsHeroes = heroesData.heroes.filter((hero) => hero.role === "dps");
  const supports = heroesData.heroes.filter((hero) => hero.role === "support");

  const [team, setTeam] = useState([null, null, null, null, null, null]);
  const [isRolling, setIsRolling] = useState(false);
  const [spinningSlot, setSpinningSlot] = useState(-1);
  const [structuredMode, setStructuredMode] = useState(false);
  const [slotLabels, setSlotLabels] = useState(["", "", "", "", "", ""]);
  const [slotRoles, setSlotRoles] = useState(["", "", "", "", "", ""]);

  const roleColors = {
    tank: "border-blue-500",
    dps: "border-red-500",
    support: "border-green-500",
  };

  const randomize = () => {
    if (isRolling) return;
    setIsRolling(true);
    setTeam([null, null, null, null, null, null]);
    setSpinningSlot(-1);

    let newTeam = [];
    let labels = [];
    let roles = [];

    if (structuredMode) {
      // 2-2-2 composition
      const tanksShuffled = [...tanks].sort(() => Math.random() - 0.5);
      const dpsShuffled = [...dpsHeroes].sort(() => Math.random() - 0.5);
      const supportsShuffled = [...supports].sort(() => Math.random() - 0.5);

      newTeam = [
        tanksShuffled[0],
        tanksShuffled[1],
        dpsShuffled[0],
        dpsShuffled[1],
        supportsShuffled[0],
        supportsShuffled[1],
      ];
      labels = ["Tank 1", "Tank 2", "DPS 1", "DPS 2", "Support 1", "Support 2"];
      roles = ["tank", "tank", "dps", "dps", "support", "support"];
    } else {
      // Flexible: 0-2 tanks, rest filled with DPS/supports
      const tankCount = Math.floor(Math.random() * 3); // 0, 1, or 2 tanks
      const remainingSlots = 6 - tankCount;

      const tanksShuffled = [...tanks].sort(() => Math.random() - 0.5);
      const flexPool = [...dpsHeroes, ...supports].sort(
        () => Math.random() - 0.5,
      );

      // Add tanks
      for (let i = 0; i < tankCount; i++) {
        newTeam.push(tanksShuffled[i]);
        labels.push(`Tank ${i + 1}`);
        roles.push("tank");
      }

      // Fill remaining with unique DPS/supports
      const usedNames = new Set();
      let flexIndex = 0;
      for (let i = 0; i < remainingSlots; i++) {
        while (usedNames.has(flexPool[flexIndex].name)) {
          flexIndex++;
        }
        const hero = flexPool[flexIndex];
        usedNames.add(hero.name);
        newTeam.push(hero);
        labels.push(hero.role === "dps" ? "DPS" : "Support");
        roles.push(hero.role);
        flexIndex++;
      }
    }

    setSlotLabels(labels);
    setSlotRoles(roles);

    // Play sound after 1 second
    setTimeout(() => {
      const audio = new Audio(teamRollSound);
      audio.play();
    }, 1000);

    // Reveal each character one per second with spinning effect
    newTeam.forEach((hero, index) => {
      setTimeout(
        () => {
          setSpinningSlot(index);
        },
        (index + 1) * 1000 - 500,
      );

      setTimeout(
        () => {
          setSpinningSlot(-1);
          setTeam((prev) => {
            const updated = [...prev];
            updated[index] = hero;
            return updated;
          });

          if (index === newTeam.length - 1) {
            setIsRolling(false);
          }
        },
        (index + 1) * 1000,
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-8">
      <Link
        to="/"
        className="absolute top-4 left-4 text-white hover:text-orange-400 transition-colors"
      >
        ← Back
      </Link>
      <h1 className="text-5xl font-bold text-orange-500 mb-4">6v6 Team Roll</h1>

      <div className="flex items-center gap-3 mb-8">
        <span
          className={`text-sm ${!structuredMode ? "text-white" : "text-gray-500"}`}
        >
          Flexible
        </span>
        <button
          onClick={() => setStructuredMode(!structuredMode)}
          disabled={isRolling}
          className={`w-14 h-8 rounded-full transition-colors duration-200 ${
            structuredMode ? "bg-orange-500" : "bg-gray-600"
          } relative disabled:opacity-50`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
              structuredMode ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
        <span
          className={`text-sm ${structuredMode ? "text-white" : "text-gray-500"}`}
        >
          2-2-2
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8 max-w-3xl">
        {team.map((hero, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="text-gray-400 text-sm mb-2 h-5">
              {slotLabels[index] || "???"}
            </span>
            <div
              className={`w-28 h-28 rounded-xl bg-gray-700 flex items-center justify-center overflow-hidden shadow-xl border-4 ${
                slotRoles[index]
                  ? roleColors[slotRoles[index]]
                  : "border-gray-500"
              } relative ${spinningSlot === index ? "animate-pulse" : ""}`}
            >
              <AnimatePresence mode="wait">
                {hero ? (
                  <motion.img
                    key={hero.name}
                    src={hero.image}
                    alt={hero.name}
                    className="w-full h-full object-cover will-change-transform"
                    initial={{ y: -150, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.34, 1.56, 0.64, 1],
                      opacity: { duration: 0.2 },
                    }}
                  />
                ) : (
                  <motion.span
                    key="placeholder"
                    className={`text-gray-400 text-4xl ${
                      spinningSlot === index ? "animate-bounce" : ""
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    ?
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <p className="text-white text-sm mt-2 h-5 text-center w-28 truncate">
              {hero ? hero.name : ""}
            </p>
          </div>
        ))}
      </div>

      <button
        onClick={randomize}
        disabled={isRolling}
        className="px-8 py-4 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-800 text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-200 hover:scale-105 disabled:scale-100"
      >
        {isRolling ? "Rolling..." : "Roll Team"}
      </button>
      <Footer />
    </div>
  );
}
