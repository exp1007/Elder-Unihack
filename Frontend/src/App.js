import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";


function App() {
  return (
    <div className="app">
      <header className="app-header">
      <Router>
      <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Router>

      </header>
    </div>
  );
}

export default App;
