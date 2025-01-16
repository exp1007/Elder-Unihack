import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Patients from "./pages/Patients";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Admin from "./pages/Admin";


function App() {
  return (
      <Router>
      <Navbar />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
  );
}

export default App;
