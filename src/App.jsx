import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AuthCallback from "./pages/AuthCallBack";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Playlists from "./pages/Playlists";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/callback" element={<AuthCallback />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/playlists" element={<Playlists />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
