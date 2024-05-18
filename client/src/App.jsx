import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Histograma from "./components/Histograma";
import { InitialForm } from "./components/Form";
import "./App.css"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InitialForm />} />
          <Route path="/histograma" element={<Histograma />}/>
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
