import { useState } from "react";

function Entities() {
  const [logs, setLogs] = useState("Click button to run script...");
  const [loading, setLoading] = useState(false);

  const runScript = async () => {
    setLoading(true);
    setLogs("Running script...");

    try {
      const res = await fetch("http://127.0.0.1:8000/run-script");
      const data = await res.json();

      setLogs(JSON.stringify(data, null, 2));
    } catch (err) {
      setLogs("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Entities</h1>
      <p>This page will manage monitored vendors and clients.</p>

      <button onClick={runScript} disabled={loading}>
        {loading ? "Running..." : "Run Scraper"}
      </button>

      <pre style={{ marginTop: "20px", background: "#000", color: "#0f0", padding: "10px" }}>
        {logs}
      </pre>
    </div>
  );
}

export default Entities;
