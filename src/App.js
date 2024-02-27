import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./components/bookdetails/BookDetails";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
