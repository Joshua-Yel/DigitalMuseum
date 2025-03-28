import logo from "./logo.svg";
import "./App.css";

import Home from "./Home";
import Gallery from "./Gallery";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Painting from "./Painting";

function App() {
  return (
    <Router>
      <div className="bg-red-900 min-h-screen text-white">
        {/* <nav className="p-4 flex justify-center gap-4 bg-black">
          <Link
            to="/"
            className="text-white"
          >
            Home
          </Link>
          <Link
            to="/gallery"
            className="text-white"
          >
            Gallery
          </Link>
        </nav> */}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/gallery/:category"
            element={<Gallery />}
          />
          <Route
            path="/paintingtest"
            element={<Painting />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
