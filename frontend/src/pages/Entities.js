// // import "./entities.css";

// // function Entities() {
// //   return (
// //     <div className="entities-container">
// //       <img
// //         src="https://thumbs.dreamstime.com/b/d-webpage-under-construction-concept-d-cartoon-characters-workers-wearing-vests-helmets-holding-jackhammer-laptop-114162972.jpg?w=992"
// //         alt="Under Construction"
// //         className="entities-image"
// //       />
// //     </div>
// //   );
// // }

// // // export default Entities;
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./entities.css";

// // const API_BASE = "https://compclean.onrender.com";

// // function DataCenter() {

// //   const [sources, setSources] = useState([]);
// //   const [menuOpen, setMenuOpen] = useState(null);

// //   const fetchSources = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/data-sources`);
// //       console.log("API RESPONSE:", res.data);

// //       setSources(Array.isArray(res.data) ? res.data : []);
// //     } catch (error) {
// //       console.error("Error fetching sources:", error);
// //       setSources([]);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSources();
// //   }, []);

// //   const toggleSource = async (id) => {
// //     await axios.post(`${API_BASE}/data-sources/${id}/toggle`);
// //     fetchSources();
// //   };

// //   const runNow = async (id) => {
// //     await axios.post(`${API_BASE}/data-sources/${id}/run`);
// //     alert("Scraper triggered!");
// //     fetchSources();
// //   };

// //   return (
// //     <div className="data-center">

// //       <h2>Data Center</h2>

// //       {sources.map(src => (
// //         <div className="data-card" key={src.id}>

// //           <div className="left">
// //           <img
// //             src="https://services.ecourts.gov.in/ecourtindia_v6/images/ecourts-logo.png"
// //             alt="logo"
// //           />
// //         </div>

// //           <div className="middle">
// //             <p><b>Source:</b> {src.source_url}</p>
// //             <p><b>Last Refresh:</b> {src.last_run || "Not run yet"}</p>
// //             <p>
// //               <b>Status:</b>
// //               <span className={src.status === "active" ? "active" : "paused"}>
// //                 {src.status}
// //               </span>
// //             </p>
// //           </div>

// //           <div className="right">
// //               <div className="gear" onClick={() => setMenuOpen(src.id)}>
// //                 ⚙️
// //               </div>
            
// //               {menuOpen === src.id && (
// //                 <div className="menu">
// //                   <div onClick={() => toggleSource(src.id)}>Pause / Resume</div>
// //                   <div onClick={() => runNow(src.id)}>Run Now</div>
// //                 </div>
// //               )}
// //             </div>

// //         </div>
// //       ))}

// //     </div>
// //   );
// // }

// // export default DataCenter;





// import { useEffect, useState } from "react";
// import axios from "axios";
// import { FaCog } from "react-icons/fa";   // ✅ SAME AS ALERTS
// import "./dataCenter.css";

// const API_BASE = "https://compclean.onrender.com";

// function DataCenter() {
//   const [sources, setSources] = useState([]);
//   const [activeMenu, setActiveMenu] = useState(null);

//   useEffect(() => {
//     fetchSources();
//   }, []);

//   const fetchSources = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/data-sources`);
//       setSources(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error(err);
//       setSources([]);
//     }
//   };

//   const toggleSource = async (id) => {
//     await axios.post(`${API_BASE}/data-sources/${id}/toggle`);
//     fetchSources();
//   };

//   const runNow = async (id) => {
//     await axios.post(`${API_BASE}/data-sources/${id}/run`);
//     alert("Scraper triggered!");
//     fetchSources();
//   };

//   return (
//     <div className="alerts-container">  {/* ✅ SAME CONTAINER */}

//       {/* HEADER SAME AS ALERT */}
//       <div className="header1">
//         <div className="header-left">
//           <h1>Data Center</h1>
//         </div>
//       </div>

//       {/* LIST SAME AS ALERT */}
//       <div className="alerts-list">

//         {sources.map((src) => (
//           <div className="alert-row" key={src.id}>

//             {/* LEFT ICON */}
//             <div className="left">
//               <img
//                 src="https://services.ecourts.gov.in/ecourtindia_v6/images/ecourts-logo.png"
//                 alt="logo"
//                 style={{ width: "40px" }}
//               />
//             </div>

//             {/* MIDDLE */}
//             <div className="middle">
//               <div className="alert-name">
//                 {src.source_url}
//               </div>

//               <div className="alert-meta">
//                 <span>
//                   {src.last_run || "Not run yet"}
//                 </span>

//                 <span> | </span>

//                 <span className={
//                   src.status === "active"
//                     ? "status-active"
//                     : "status-paused"
//                 }>
//                   {src.status}
//                 </span>
//               </div>
//             </div>

//             {/* RIGHT */}
//             <div className="right">
//               <div
//                 className="gear-container"
//                 onClick={(e) => e.stopPropagation()}
//               >

//                 <FaCog onClick={() =>
//                   setActiveMenu(activeMenu === src.id ? null : src.id)
//                 } />

//                 {activeMenu === src.id && (
//                   <div className="dropdown">

//                     <button onClick={() => toggleSource(src.id)}>
//                       {src.status === "active" ? "Pause" : "Resume"}
//                     </button>

//                     <button onClick={() => runNow(src.id)}>
//                       Run Now
//                     </button>

//                   </div>
//                 )}

//               </div>
//             </div>

//           </div>
//         ))}

//       </div>
//     </div>
//   );
// }

// export default DataCenter;












import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaCog } from "react-icons/fa";
import "./dataCenter.css";

const API_BASE = "https://compclean.onrender.com";

function DataCenter() {
  const [sources, setSources] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);

  const menuRef = useRef(null);

  // =========================
  // FETCH DATA
  // =========================
  const fetchSources = async () => {
    try {
      const res = await axios.get(`${API_BASE}/data-sources`);
      setSources(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching sources:", error);
      setSources([]);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  // =========================
  // OUTSIDE CLICK CLOSE
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================
  // ACTIONS
  // =========================
  const toggleSource = async (id) => {
    try {
      await axios.post(`${API_BASE}/data-sources/${id}/toggle`);
      setMenuOpen(null);
      fetchSources();
    } catch (err) {
      console.error(err);
    }
  };

  const runNow = async (id) => {
    try {
      await axios.post(`${API_BASE}/data-sources/${id}/run`);
      alert("Scraper triggered!");
      setMenuOpen(null);
      fetchSources();
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="alerts-container">

      {/* HEADER */}
      <div className="header1">
        <h1>Data Center</h1>
      </div>

      <div className="wip-banner">
              🚧 Data Center is currently in progress. Core features are functional.
            </div>

      {/* LIST */}
      <div className="alerts-list">
        {sources.map((src) => (
          <div className="alert-row" key={src.id}>

            {/* LEFT ICON */}
            <div className="left">
              <img
                src="https://services.ecourts.gov.in/ecourtindia_v6/images/ecourts-logo.png"
                alt="logo"
              />
            </div>

            {/* MIDDLE */}
            <div className="middle">
              <div className="alert-name">
                Source: {src.source_url}
              </div>

              <div className="alert-meta">
                Last Refresh: {src.last_run || "Not run yet"} |{" "}
                <span
                  className={
                    src.status === "active"
                      ? "status-active"
                      : "status-paused"
                  }
                >
                  {src.status}
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <div className="right" ref={menuRef}>
              <div className="gear-container">
                <FaCog
                  onClick={() =>
                    setMenuOpen(menuOpen === src.id ? null : src.id)
                  }
                />
              </div>

              {menuOpen === src.id && (
                <div className="dropdown">
                  <button onClick={() => toggleSource(src.id)}>
                    {src.status === "active" ? "Pause" : "Resume"}
                  </button>

                  <button onClick={() => runNow(src.id)}>
                    Run Now
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default DataCenter;
