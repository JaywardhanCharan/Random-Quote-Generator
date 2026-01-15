import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          <h1 className="heading error">{error}</h1>
        ) : (
          <h1 className="heading">
            {loading ? "Loading advice..." : advice}
          </h1>
        )}

        <button
          className="button"
          onClick={fetchAdvice}
          disabled={loading}
        >
          <span>{loading ? "FETCHING..." : "GIVE ME ADVICE!"}</span>
        </button>
      </div>
    </div>
  );
};

export default App;
