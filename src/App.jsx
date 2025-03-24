import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import AuthCallback from "./pages/AuthCallback";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;
