import React, { useEffect, useState, useRender } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [failed, setFailed] = useState("");
  const [finalResponse, setFinalResponse] = useState("");

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get("https://api.adviceslip.com/advice");
      setAdvice(response.data.slip.advice);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="app">
      <div className="card">
        {error ? (
          <h2 className="heading error">{error}</h2>
        ) : (
          <h2 className="heading">
            {loading ? "Loading advice..." : advice}
          </h2>
          <h1 className="bigHeading">
            {loading ? "Failed cases loading..." : failed}
          </h1>
        )}

        <button
          className="button"
          onClick={fetchAdvice}
          disabled={loading}
        >
          <span>{loading ? "Migrating..." : "Get me some content which is in quotes?"}</span>
          <div>{finalResponse ? "Fetching..." : "Final response if fetched and here is the result!"}</span>
        </button>
      </div>
    </div>
  );
};

export default App;
