import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tank from "./pages/Tank";
import Dps from "./pages/Dps";
import Support from "./pages/Support";
import Team from "./pages/Team";
import Team6v6 from "./pages/Team6v6";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tank" element={<Tank />} />
      <Route path="/dps" element={<Dps />} />
      <Route path="/support" element={<Support />} />
      <Route path="/team" element={<Team />} />
      <Route path="/team6v6" element={<Team6v6 />} />
    </Routes>
  );
}
