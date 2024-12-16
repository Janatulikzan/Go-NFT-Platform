import { useState } from "react";
import { Go-NFT-backend } from "declarations/Go-NFT-backend";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [greeting, setGreeting] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;

    try {
      const response = await Go-NFT-backend.greet(name);
      setGreeting(response);
    } catch (error) {
      console.error("Error while calling backend:", error);
      alert("Failed to fetch greeting. Please check your backend setup.");
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/navbar" element={<Navbar />} /> {/* Sesuaikan path ini */}
      </Routes>
    </Router>
  );
}

export default App;
