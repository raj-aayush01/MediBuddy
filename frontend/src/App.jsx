import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MedicineDetails from "./MedicineDetails";
import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <header className="header">
        <h2>MediBuddy</h2>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medicine" element={<MedicineDetails />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;