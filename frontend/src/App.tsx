import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AnimatedRoutes } from "./components/AnimatedRoutes";
import { Navbar } from "./components/Navbar";
import React from "react";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <AnimatedRoutes />
        {/* <button className="btn btn-warning floating">G</button> */}
      </Router>
    </RecoilRoot>
  );
}

export default App;
