import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [quote, setQuote] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const getQuote = async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await axios.get("https://api.adviceslip.com/advice");
      setQuote(`"${res.data.slip.advice}"`);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong while fetching content.");
      setStatus("error");
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div className="app">
      <div className="card">
        {/* Content Area */}
        {status === "loading" && (
          <h2 className="heading">Fetching wisdom for you… 🧠</h2>
        )}

        {status === "error" && (
          <h2 className="heading error">{errorMessage}</h2>
        )}

        {status === "success" && (
          <h2 className="heading">{quote}</h2>
        )}

        {/* Action Button */}
        <button
          className="button"
          onClick={getQuote}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Loading..." : "Get New Quote"}
        </button>
      </div>
    </div>
  );
};

export default App;
