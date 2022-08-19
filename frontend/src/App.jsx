import "./App.scss";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatedRoutes } from "./components/AnimatedRoutes";
import { Navbar } from "./components/Navbar";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
      {/* <button className="btn btn-warning floating">G</button> */}
    </Router>
  );
}

export default App;

/**
 * <h1>フロントエンド</h1>
      <p>{ message }</p>
 */
