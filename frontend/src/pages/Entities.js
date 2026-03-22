import { useState } from "react";

function Entities() {
  const [logs, setLogs] = useState("");
  const [loading, setLoading] = useState(false);

  const runScraper = async () => {
    setLoading(true);
    setLogs("Running scraper...");

    try {
      const res = await fetch("http://127.0.0.1:8000/run-scraper");
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

      <button onClick={runScraper} disabled={loading}>
        {loading ? "Running..." : "Run Scraper"}
      </button>

      <pre style={{ marginTop: "20px" }}>
        {logs}
      </pre>
    </div>
  );
}

export default Entities;
