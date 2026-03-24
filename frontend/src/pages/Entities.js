// import "./entities.css";

// function Entities() {
//   return (
//     <div className="entities-container">
//       <img
//         src="https://thumbs.dreamstime.com/b/d-webpage-under-construction-concept-d-cartoon-characters-workers-wearing-vests-helmets-holding-jackhammer-laptop-114162972.jpg?w=992"
//         alt="Under Construction"
//         className="entities-image"
//       />
//     </div>
//   );
// }

// export default Entities;
import { useEffect, useState } from "react";
import axios from "axios";
import "./entities.css";

const API_BASE = "https://compclean.onrender.com";

function DataCenter() {

  const [sources, setSources] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  const fetchSources = async () => {
    try {
      const res = await axios.get(`${API_BASE}/data-sources`);
      console.log("API RESPONSE:", res.data);

      setSources(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching sources:", error);
      setSources([]);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const toggleSource = async (id) => {
    await axios.post(`${API_BASE}/data-sources/${id}/toggle`);
    fetchSources();
  };

  const runNow = async (id) => {
    await axios.post(`${API_BASE}/data-sources/${id}/run`);
    alert("Scraper triggered!");
    fetchSources();
  };

  return (
    <div className="data-center">

      <h2>Data Center</h2>

      {sources.map(src => (
        <div className="data-card" key={src.id}>

          <div className="left">
          <img
            src="https://services.ecourts.gov.in/ecourtindia_v6/images/ecourts-logo.png"
            alt="logo"
          />
        </div>

          <div className="middle">
            <p><b>Source:</b> {src.source_url}</p>
            <p><b>Last Refresh:</b> {src.last_run || "Not run yet"}</p>
            <p>
              <b>Status:</b>
              <span className={src.status === "active" ? "active" : "paused"}>
                {src.status}
              </span>
            </p>
          </div>

          <div className="right">
            <div className="gear" onClick={() => setMenuOpen(src.id)}>
              ⚙️
            </div>

            {menuOpen === src.id && (
              <div className="menu">
                <div onClick={() => toggleSource(src.id)}>Pause / Resume</div>
                <div onClick={() => runNow(src.id)}>Run Now</div>
              </div>
            )}
          </div>

        </div>
      ))}

    </div>
  );
}

export default DataCenter;
