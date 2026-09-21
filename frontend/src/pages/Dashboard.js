// // import { useEffect, useState } from "react";
// // import api from "../api";
// // import "./dashboard.css";
// // import FilterDropdown from "./FilterDropdown";

// // import {
// //   BarChart, Bar,
// //   PieChart, Pie, Cell,
// //   LineChart, Line,
// //   XAxis, YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   CartesianGrid
// // } from "recharts";

// // const COLORS = ["#e5fa24", "#fcbf56", "#40c8e0", "#a64afc", "#4863b9"];

// // function Dashboard() {

// //   const [data, setData] = useState(null);

// //   // ✅ changed to array (multi select)
// //   const [entityFilter, setEntityFilter] = useState([]);
// //   const [stateFilter, setStateFilter] = useState([]);
// //   const [statusFilter, setStatusFilter] = useState([]);

// //   // ✅ date filter
// //   const [fromDate, setFromDate] = useState("");
// //   const [toDate, setToDate] = useState("");

// //   useEffect(() => {
// //     api.get("/dashboard").then(res => setData(res.data));
// //   }, []);

// //   if (!data) return <p className="loading">Loading dashboard...</p>;

// //   // ✅ UPDATED FILTER LOGIC (safe)
// //   const filteredCases = data.cases.filter(c => {

// //     const caseDate = c.registration_date ? new Date(c.registration_date) : null;

// //     return (
// //       (entityFilter.length === 0 || entityFilter.includes(c["Entity Name"])) &&
// //       (stateFilter.length === 0 || stateFilter.includes(c.state)) &&
// //       (statusFilter.length === 0 || statusFilter.includes(c.case_status)) &&
// //       (!fromDate || (caseDate && caseDate >= new Date(fromDate))) &&
// //       (!toDate || (caseDate && caseDate <= new Date(toDate)))
// //     );
// //   });

// //   const kpi = {
// //     total: filteredCases.length,
// //     entities: new Set(filteredCases.map(c => c["Entity Name"])).size,
// //     active: filteredCases.filter(c => c.case_status === "Pending").length,
// //     highRisk: filteredCases.filter(c => c.litigation_risk_score >= 7).length
// //   };

// //   const groupData = (key) => {
// //     const map = {};
// //     filteredCases.forEach(c => {
// //       const val = c[key] || "Unknown";
// //       map[val] = (map[val] || 0) + 1;
// //     });
// //     return Object.entries(map).map(([k, v]) => ({ name: k, value: v }));
// //   };

// //   const statusData = groupData("case_status");
// //   const stateData = groupData("state");
// //   const courtData = groupData("court");

// //   const timelineMap = {};
// //   filteredCases.forEach(c => {
// //     const m = (c.registration_date || "").slice(0, 7);
// //     if (!m) return;
// //     timelineMap[m] = (timelineMap[m] || 0) + 1;
// //   });
// //   const timelineData = Object.entries(timelineMap).map(([k, v]) => ({ month: k, cases: v }));

// //   return (
// //     <div className="dashboard">

// //       {/* HEADER (UNCHANGED) */}
// //       <div className="header1">
// //         <div className="header1-left">
// //           <h1>Legal Intelligence Dashboard</h1>
// //         </div>
// //         <div className="header1-right">
// //           <span>Welcome, Admin</span>
// //         </div>
// //       </div>

// //       {/* ✅ FILTERS UPDATED ONLY */}
// //       <div className="filters">

// //         <FilterDropdown
// //           label="Entities"
// //           options={[...new Set(data.cases.map(c => c["Entity Name"]))]}
// //           selected={entityFilter}
// //           setSelected={setEntityFilter}
// //         />

// //         <FilterDropdown
// //           label="States"
// //           options={[...new Set(data.cases.map(c => c.state))]}
// //           selected={stateFilter}
// //           setSelected={setStateFilter}
// //         />

// //         <FilterDropdown
// //           label="Status"
// //           options={["Pending","Dismissed","Allowed","Disposed"]}
// //           selected={statusFilter}
// //           setSelected={setStatusFilter}
// //         />

// //         {/* DATE FILTER */}
// //         <div className="filter-box">
// //           <label>From Date</label>
// //           <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
// //         </div>

// //         <div className="filter-box">
// //           <label>To Date</label>
// //           <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
// //         </div>

// //       </div>

// //       {/* EVERYTHING BELOW SAME */}

// //       <div className="kpi-grid">
// //         {[{ label: "Total Cases", value: kpi.total },
// //           { label: "Entities", value: kpi.entities },
// //           { label: "Active", value: kpi.active },
// //           { label: "High Risk", value: kpi.highRisk }
// //         ].map((item, i) => (
// //           <div className="card" key={i}>
// //             <p>{item.label}</p>
// //             <h2>{item.value}</h2>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="charts">
// //         <div className="chart">
// //           <h3>Case Status</h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <PieChart>
// //               <Pie data={statusData} dataKey="value">
// //                 {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
// //               </Pie>
// //               <Tooltip />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="chart">
// //           <h3>Cases by State</h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={stateData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="name" />
// //               <YAxis />
// //               <Tooltip />
// //               <Bar dataKey="value" fill="#018c91" radius={[6,6,0,0]} />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       <div className="charts">
// //         <div className="chart">
// //           <h3>Cases by Court</h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={courtData}>
// //               <CartesianGrid strokeDasharray="3 3" />
// //               <XAxis dataKey="name" />
// //               <YAxis />
// //               <Tooltip />
// //               <Bar dataKey="value" fill="#186460" radius={[6,6,0,0]} />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>

// //         <div className="chart">
// //           <h3>Timeline</h3>
// //           <ResponsiveContainer width="90%" height={300}>
// //             <LineChart data={timelineData}>
// //               <CartesianGrid strokeDasharray="1 1" />
// //               <XAxis dataKey="month" />
// //               <YAxis />
// //               <Tooltip />
// //               <Line type="monotone" dataKey="cases" stroke="rgb(106, 117, 0)" strokeWidth={2} />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>

// //       <h2 className="table-title">Case Details</h2>

// //       <div className="table-wrapper">
// //         <table className="cases-table">
// //           <thead>
// //             <tr>
// //               <th>Case</th>
// //               <th>Entity</th>
// //               <th>Court</th>
// //               <th>State</th>
// //               <th>Status</th>
// //               <th>Risk</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredCases.map((c, i) => (
// //               <tr key={i}>
// //                 <td>{c.case_number}</td>
// //                 <td>{c["Entity Name"]}</td>
// //                 <td>{c.court}</td>
// //                 <td>{c.state}</td>
// //                 <td>{c.case_status}</td>
// //                 <td className={c.litigation_risk_score >= 7 ? "risk-high" : "risk-low"}>
// //                   {c.litigation_risk_score}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //     </div>
// //   );
// // }

// // export default Dashboard;









































// import { useEffect, useState } from "react";
// import api from "../api";
// import "./dashboard.css";
// import FilterDropdown from "./FilterDropdown";

// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid
// } from "recharts";

// const COLORS = [
//   "#e5fa24",
//   "#fcbf56",
//   "#40c8e0",
//   "#a64afc",
//   "#4863b9"
// ];

// function Dashboard() {

//   // =====================================================
//   // DATA
//   // =====================================================

//   const [data, setData] = useState(null);

//   // =====================================================
//   // SOURCE FILTER
//   // =====================================================

//   const [sourceFilter, setSourceFilter] = useState("all");

//   // =====================================================
//   // eCOURTS FILTERS
//   // =====================================================

//   const [entityFilter, setEntityFilter] = useState([]);
//   const [stateFilter, setStateFilter] = useState([]);
//   const [statusFilter, setStatusFilter] = useState([]);

//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   // =====================================================
//   // OFAC FILTERS
//   // =====================================================

//   const [typeFilter, setTypeFilter] = useState([]);
//   const [programFilter, setProgramFilter] = useState([]);
//   const [regionFilter, setRegionFilter] = useState([]);
//   const [vesselTypeFilter, setVesselTypeFilter] = useState([]);

//   // =====================================================
//   // LOAD DATA
//   // =====================================================

//   useEffect(() => {

//     api
//       .get("/dashboard")
//       .then(res => {
//         setData(res.data);
//       })
//       .catch(error => {
//         console.error("Dashboard API error:", error);
//       });

//   }, []);

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (!data) {
//     return (
//       <p className="loading">
//         Loading dashboard...
//       </p>
//     );
//   }

//   // =====================================================
//   // SAFE DATA
//   // =====================================================

//   const cases = Array.isArray(data.cases)
//     ? data.cases
//     : [];

//   const sanctions = Array.isArray(data.sanctions)
//     ? data.sanctions
//     : [];

//   // =====================================================
//   // SOURCE OPTIONS
//   // =====================================================

//   const sourceOptions = [
//     {
//       value: "all",
//       label: "All Sources"
//     },
//     {
//       value: "ecourts",
//       label: "eCourts"
//     },
//     {
//       value: "ofac",
//       label: "U.S. Sanction (OFAC/Treasury)"
//     }
//   ];

//   // =====================================================
//   // eCOURTS FILTER OPTIONS
//   // =====================================================

//   const entityOptions = [
//     ...new Set(
//       cases
//         .map(c => c["Entity Name"])
//         .filter(Boolean)
//     )
//   ];

//   const stateOptions = [
//     ...new Set(
//       cases
//         .map(c => c.state)
//         .filter(Boolean)
//     )
//   ];

//   const statusOptions = [
//     ...new Set(
//       cases
//         .map(c => c.case_status)
//         .filter(Boolean)
//     )
//   ];

//   // =====================================================
//   // OFAC FILTER OPTIONS
//   // =====================================================

//   const typeOptions = [
//     ...new Set(
//       sanctions
//         .map(s => s.Type)
//         .filter(Boolean)
//     )
//   ];

//   const programOptions = [
//     ...new Set(
//       sanctions
//         .map(s => s.Program)
//         .filter(Boolean)
//         .filter(value => value !== "-0-")
//     )
//   ];

//   const regionOptions = [
//     ...new Set(
//       sanctions
//         .map(s => s.Region)
//         .filter(Boolean)
//         .filter(value => value !== "-0-")
//     )
//   ];

//   const vesselTypeOptions = [
//     ...new Set(
//       sanctions
//         .map(s => s["Vessel Type"])
//         .filter(Boolean)
//         .filter(value => value !== "-0-")
//     )
//   ];

//   // =====================================================
//   // FILTER eCOURTS
//   // =====================================================

//   const filteredCases = cases.filter(c => {

//     const caseDate = c.registration_date
//       ? new Date(c.registration_date)
//       : null;

//     let matchesFromDate = true;
//     let matchesToDate = true;

//     if (fromDate) {

//       const from =
//         new Date(`${fromDate}T00:00:00`);

//       matchesFromDate =
//         caseDate &&
//         caseDate >= from;
//     }

//     if (toDate) {

//       const to =
//         new Date(`${toDate}T23:59:59`);

//       matchesToDate =
//         caseDate &&
//         caseDate <= to;
//     }

//     return (

//       (
//         entityFilter.length === 0 ||
//         entityFilter.includes(c["Entity Name"])
//       )

//       &&

//       (
//         stateFilter.length === 0 ||
//         stateFilter.includes(c.state)
//       )

//       &&

//       (
//         statusFilter.length === 0 ||
//         statusFilter.includes(c.case_status)
//       )

//       &&

//       matchesFromDate

//       &&

//       matchesToDate

//     );

//   });

//   // =====================================================
//   // FILTER OFAC
//   // =====================================================

//   const filteredSanctions = sanctions.filter(s => {

//     return (

//       (
//         typeFilter.length === 0 ||
//         typeFilter.includes(s.Type)
//       )

//       &&

//       (
//         programFilter.length === 0 ||
//         programFilter.includes(s.Program)
//       )

//       &&

//       (
//         regionFilter.length === 0 ||
//         regionFilter.includes(s.Region)
//       )

//       &&

//       (
//         vesselTypeFilter.length === 0 ||
//         vesselTypeFilter.includes(s["Vessel Type"])
//       )

//     );

//   });

//   // =====================================================
//   // eCOURTS KPI
//   // =====================================================

//   const ecourtsKpi = {

//     total:
//       filteredCases.length,

//     entities:
//       new Set(
//         filteredCases
//           .map(c => c["Entity Name"])
//           .filter(Boolean)
//       ).size,

//     active:
//       filteredCases.filter(
//         c =>
//           String(c.case_status || "")
//             .toLowerCase() === "pending"
//       ).length,

//     highRisk:
//       filteredCases.filter(
//         c =>
//           Number(c.litigation_risk_score) >= 7
//       ).length

//   };

//   // =====================================================
//   // OFAC KPI
//   // =====================================================

//   const ofacKpi = {

//     total:
//       filteredSanctions.length,

//     vessels:
//       filteredSanctions.filter(
//         s =>
//           String(s.Type || "")
//             .toLowerCase() === "vessel"
//       ).length,

//     programs:
//       new Set(
//         filteredSanctions
//           .map(s => s.Program)
//           .filter(
//             value =>
//               value &&
//               value !== "-0-"
//           )
//       ).size,

//     regions:
//       new Set(
//         filteredSanctions
//           .map(s => s.Region)
//           .filter(
//             value =>
//               value &&
//               value !== "-0-"
//           )
//       ).size

//   };

//   // =====================================================
//   // ALL SOURCE KPI
//   // =====================================================

//   const allSourceKpi = {

//     totalRecords:
//       filteredCases.length +
//       filteredSanctions.length,

//     ecourtsRecords:
//       filteredCases.length,

//     ofacRecords:
//       filteredSanctions.length,

//     ecourtsEntities:
//       ecourtsKpi.entities,

//     ofacVessels:
//       ofacKpi.vessels

//   };

//   // =====================================================
//   // eCOURTS GROUP DATA
//   // =====================================================

//   const groupCaseData = (key) => {

//     const map = {};

//     filteredCases.forEach(c => {

//       const value =
//         c[key] || "Unknown";

//       map[value] =
//         (map[value] || 0) + 1;

//     });

//     return Object.entries(map).map(
//       ([name, value]) => ({
//         name,
//         value
//       })
//     );

//   };

//   const statusData =
//     groupCaseData("case_status");

//   const stateData =
//     groupCaseData("state");

//   const courtData =
//     groupCaseData("court");

//   // =====================================================
//   // eCOURTS TIMELINE
//   // =====================================================

//   const timelineMap = {};

//   filteredCases.forEach(c => {

//     const registrationDate =
//       c.registration_date || "";

//     const month =
//       String(registrationDate).slice(0, 7);

//     if (!month) return;

//     timelineMap[month] =
//       (timelineMap[month] || 0) + 1;

//   });

//   const timelineData =
//     Object.entries(timelineMap)
//       .sort(([a], [b]) =>
//         a.localeCompare(b)
//       )
//       .map(([month, casesCount]) => ({
//         month,
//         cases: casesCount
//       }));

//   // =====================================================
//   // OFAC GROUP DATA
//   // =====================================================

//   const groupSanctionData = (key) => {

//     const map = {};

//     filteredSanctions.forEach(s => {

//       let value = s[key];

//       if (
//         !value ||
//         value === "-0-"
//       ) {
//         value = "Unknown";
//       }

//       map[value] =
//         (map[value] || 0) + 1;

//     });

//     return Object.entries(map).map(
//       ([name, value]) => ({
//         name,
//         value
//       })
//     );

//   };

//   const sanctionTypeData =
//     groupSanctionData("Type");

//   const sanctionRegionData =
//     groupSanctionData("Region");

//   const sanctionProgramData =
//     groupSanctionData("Program");

//   const vesselTypeData =
//     groupSanctionData("Vessel Type");

//   // =====================================================
//   // SOURCE CHANGE
//   // =====================================================

//   const handleSourceChange = (value) => {

//     setSourceFilter(value);

//     // Clear eCourts filters

//     setEntityFilter([]);
//     setStateFilter([]);
//     setStatusFilter([]);

//     setFromDate("");
//     setToDate("");

//     // Clear OFAC filters

//     setTypeFilter([]);
//     setProgramFilter([]);
//     setRegionFilter([]);
//     setVesselTypeFilter([]);

//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (

//     <div className="dashboard">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div className="header1">

//         <div className="header1-left">

//           <h1>
//             Compliance Intelligence Dashboard
//           </h1>

//         </div>

//         <div className="header1-right">

//           <span>
//             Welcome, Admin
//           </span>

//         </div>

//       </div>


//       {/* =================================================
//           SOURCE + FILTERS
//       ================================================= */}

//       <div className="filters">

//         {/* SOURCE */}

//         <div className="filter-box">

//           <label>
//             Source
//           </label>

//           <select
//             value={sourceFilter}
//             onChange={(e) =>
//               handleSourceChange(e.target.value)
//             }
//           >

//             {sourceOptions.map(source => (

//               <option
//                 key={source.value}
//                 value={source.value}
//               >
//                 {source.label}
//               </option>

//             ))}

//           </select>

//         </div>


//         {/* =================================================
//             eCOURTS FILTERS
//         ================================================= */}

//         {(sourceFilter === "all" ||
//           sourceFilter === "ecourts") && (

//           <>

//             <FilterDropdown
//               label="Entities"
//               options={entityOptions}
//               selected={entityFilter}
//               setSelected={setEntityFilter}
//             />

//             <FilterDropdown
//               label="States"
//               options={stateOptions}
//               selected={stateFilter}
//               setSelected={setStateFilter}
//             />

//             <FilterDropdown
//               label="Status"
//               options={statusOptions}
//               selected={statusFilter}
//               setSelected={setStatusFilter}
//             />

//             <div className="filter-box">

//               <label>
//                 From Date
//               </label>

//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={(e) =>
//                   setFromDate(e.target.value)
//                 }
//               />

//             </div>

//             <div className="filter-box">

//               <label>
//                 To Date
//               </label>

//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={(e) =>
//                   setToDate(e.target.value)
//                 }
//               />

//             </div>

//           </>

//         )}


//         {/* =================================================
//             OFAC FILTERS
//         ================================================= */}

//         {sourceFilter === "ofac" && (

//           <>

//             <FilterDropdown
//               label="Type"
//               options={typeOptions}
//               selected={typeFilter}
//               setSelected={setTypeFilter}
//             />

//             <FilterDropdown
//               label="Program"
//               options={programOptions}
//               selected={programFilter}
//               setSelected={setProgramFilter}
//             />

//             <FilterDropdown
//               label="Region"
//               options={regionOptions}
//               selected={regionFilter}
//               setSelected={setRegionFilter}
//             />

//             <FilterDropdown
//               label="Vessel Type"
//               options={vesselTypeOptions}
//               selected={vesselTypeFilter}
//               setSelected={setVesselTypeFilter}
//             />

//           </>

//         )}

//       </div>


//       {/* =================================================
//           ALL SOURCES
//       ================================================= */}

//       {sourceFilter === "all" && (

//         <>

//           {/* ALL SOURCE KPI */}

//           <div className="kpi-grid">

//             {[
//               {
//                 label: "Total Records",
//                 value:
//                   allSourceKpi.totalRecords
//               },
//               {
//                 label: "eCourts Records",
//                 value:
//                   allSourceKpi.ecourtsRecords
//               },
//               {
//                 label: "OFAC Records",
//                 value:
//                   allSourceKpi.ofacRecords
//               },
//               {
//                 label: "eCourts Entities",
//                 value:
//                   allSourceKpi.ecourtsEntities
//               },
//               {
//                 label: "OFAC Vessels",
//                 value:
//                   allSourceKpi.ofacVessels
//               }
//             ].map((item, i) => (

//               <div
//                 className="card"
//                 key={i}
//               >

//                 <p>
//                   {item.label}
//                 </p>

//                 <h2>
//                   {item.value}
//                 </h2>

//               </div>

//             ))}

//           </div>


//           {/* SOURCE CHARTS */}

//           <div className="charts">

//             <div className="chart">

//               <h3>
//                 Records by Source
//               </h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <PieChart>

//                   <Pie
//                     data={[
//                       {
//                         name: "eCourts",
//                         value:
//                           filteredCases.length
//                       },
//                       {
//                         name:
//                           "OFAC / Treasury",
//                         value:
//                           filteredSanctions.length
//                       }
//                     ]}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={100}
//                     label
//                   >

//                     {[0, 1].map(i => (

//                       <Cell
//                         key={i}
//                         fill={
//                           COLORS[
//                             i %
//                             COLORS.length
//                           ]
//                         }
//                       />

//                     ))}

//                   </Pie>

//                   <Tooltip />

//                 </PieChart>

//               </ResponsiveContainer>

//             </div>


//             <div className="chart">

//               <h3>
//                 Source Record Summary
//               </h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <BarChart
//                   data={[
//                     {
//                       name: "eCourts",
//                       value:
//                         filteredCases.length
//                     },
//                     {
//                       name: "OFAC",
//                       value:
//                         filteredSanctions.length
//                     }
//                   ]}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                   />

//                   <XAxis
//                     dataKey="name"
//                   />

//                   <YAxis />

//                   <Tooltip />

//                   <Bar
//                     dataKey="value"
//                     fill="#018c91"
//                     radius={[
//                       6,
//                       6,
//                       0,
//                       0
//                     ]}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>

//             </div>

//           </div>

//         </>

//       )}


//       {/* =================================================
//           eCOURTS
//       ================================================= */}

//       {sourceFilter === "ecourts" && (

//         <>

//           {/* KPI */}

//           <div className="kpi-grid">

//             {[
//               {
//                 label: "Total Records",
//                 value:
//                   ecourtsKpi.total
//               },
//               {
//                 label: "Entities",
//                 value:
//                   ecourtsKpi.entities
//               },
//               {
//                 label: "Active",
//                 value:
//                   ecourtsKpi.active
//               },
//               {
//                 label: "High Risk",
//                 value:
//                   ecourtsKpi.highRisk
//               }
//             ].map((item, i) => (

//               <div
//                 className="card"
//                 key={i}
//               >

//                 <p>
//                   {item.label}
//                 </p>

//                 <h2>
//                   {item.value}
//                 </h2>

//               </div>

//             ))}

//           </div>


//           {/* eCOURTS CHART ROW 1 */}

//           <div className="charts">

//             <div className="chart">

//               <h3>
//                 Case Status
//               </h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <PieChart>

//                   <Pie
//                     data={statusData}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={100}
//                     label
//                   >

//                     {statusData.map(
//                       (_, i) => (

//                         <Cell
//                           key={i}
//                           fill={
//                             COLORS[
//                               i %
//                               COLORS.length
//                             ]
//                           }
//                         />

//                       )
//                     )}

//                   </Pie>

//                   <Tooltip />

//                 </PieChart>

//               </ResponsiveContainer>

//             </div>


//             <div className="chart">

//               <h3>
//                 Cases by State
//               </h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <BarChart
//                   data={stateData}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                   />

//                   <XAxis
//                     dataKey="name"
//                   />

//                   <YAxis />

//                   <Tooltip />

//                   <Bar
//                     dataKey="value"
//                     fill="#018c91"
//                     radius={[
//                       6,
//                       6,
//                       0,
//                       0
//                     ]}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>

//             </div>

//           </div>


//           {/* eCOURTS CHART ROW 2 */}

//           <div className="charts">

//             <div className="chart">

//               <h3>
//                 Cases by Court
//               </h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <BarChart
//                   data={courtData}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                   />

//                   <XAxis
//                     dataKey="name"
//                   />

//                   <YAxis />

//                   <Tooltip />

//                   <Bar
//                     dataKey="value"
//                     fill="#186460"
//                     radius={[
//                       6,
//                       6,
//                       0,
//                       0
//                     ]}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>

//             </div>


//             <div className="chart">

//               <h3>
//                 Timeline
//               </h3>

//               <ResponsiveContainer
//                 width="90%"
//                 height={300}
//               >

//                 <LineChart
//                   data={timelineData}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="1 1"
//                   />

//                   <XAxis
//                     dataKey="month"
//                   />

//                   <YAxis />

//                   <Tooltip />

//                   <Line
//                     type="monotone"
//                     dataKey="cases"
//                     stroke="rgb(106, 117, 0)"
//                     strokeWidth={2}
//                   />

//                 </LineChart>

//               </ResponsiveContainer>

//             </div>

//           </div>


//           {/* eCOURTS TABLE */}

//           <h2 className="table-title">
//             Case Details
//           </h2>

//           <div className="table-wrapper">

//             <table className="cases-table">

//               <thead>

//                 <tr>

//                   <th>
//                     Case
//                   </th>

//                   <th>
//                     Entity
//                   </th>

//                   <th>
//                     Court
//                   </th>

//                   <th>
//                     State
//                   </th>

//                   <th>
//                     Status
//                   </th>

//                   <th>
//                     Risk
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {filteredCases.length > 0 ? (

//                   filteredCases.map(
//                     (c, i) => (

//                       <tr key={i}>

//                         <td>
//                           {c.case_number}
//                         </td>

//                         <td>
//                           {c["Entity Name"]}
//                         </td>

//                         <td>
//                           {c.court}
//                         </td>

//                         <td>
//                           {c.state}
//                         </td>

//                         <td>
//                           {c.case_status}
//                         </td>

//                         <td
//                           className={
//                             Number(
//                               c.litigation_risk_score
//                             ) >= 7
//                               ? "risk-high"
//                               : "risk-low"
//                           }
//                         >
//                           {
//                             c.litigation_risk_score
//                           }
//                         </td>

//                       </tr>

//                     )
//                   )

//                 ) : (

//                   <tr>

//                     <td
//                       colSpan="6"
//                       style={{
//                         textAlign: "center"
//                       }}
//                     >
//                       No records found
//                     </td>

//                   </tr>

//                 )}

//               </tbody>

//             </table>

//           </div>

//         </>

//       )}


//       {/* =================================================
//           OFAC / TREASURY
//       ================================================= */}

//       {sourceFilter === "ofac" && (

//         <>

//           {/* OFAC KPI */}

//           <div className="kpi-grid">

//             {[
//               {
//                 label: "Total Records",
//                 value:
//                   ofacKpi.total
//               },
//               {
//                 label: "Vessels",
//                 value:
//                   ofacKpi.vessels
//               },
//               {
//                 label: "Programs",
//                 value:
//                   ofacKpi.programs
//               },
//               {
//                 label: "Regions",
//                 value:
//                   ofacKpi.regions
//               }
//             ].map((item, i) => (

//               <div
//                 className="card"
//                 key={i}
//               >

//                 <p>
//                   {item.label}
//                 </p>

//                 <h2>
//                   {item.value}
//                 </h2>

//               </div>

//             ))}

//           </div>


//           {/* OFAC CHART ROW 1 */}

//           <div className="charts">

//             <div className="chart">

//               <h3>
//                 Sanctions by Type
//               </h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <PieChart>

//                   <Pie
//                     data={sanctionTypeData}
//                     dataKey="value"
//                     nameKey="name"
//                     outerRadius={100}
//                     label
//                   >

//                     {sanctionTypeData.map(
//                       (_, i) => (

//                         <Cell
//                           key={i}
//                           fill={
//                             COLORS[
//                               i %
//                               COLORS.length
//                             ]
//                           }
//                         />

//                       )
//                     )}

//                   </Pie>

//                   <Tooltip />

//                 </PieChart>

//               </ResponsiveContainer>

//             </div>


//             <div className="chart">

//               <h3>
//                 Sanctions by Region
//               </h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <BarChart
//                   data={sanctionRegionData}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                   />

//                   <XAxis
//                     dataKey="name"
//                   />

//                   <YAxis />

//                   <Tooltip />

//                   <Bar
//                     dataKey="value"
//                     fill="#018c91"
//                     radius={[
//                       6,
//                       6,
//                       0,
//                       0
//                     ]}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>

//             </div>

//           </div>


//           {/* OFAC CHART ROW 2 */}

//           <div className="charts">

//             <div className="chart">

//               <h3>
//                 Sanctions by Program
//               </h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <BarChart
//                   data={sanctionProgramData}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                   />

//                   <XAxis
//                     dataKey="name"
//                   />

//                   <YAxis />

//                   <Tooltip />

//                   <Bar
//                     dataKey="value"
//                     fill="#186460"
//                     radius={[
//                       6,
//                       6,
//                       0,
//                       0
//                     ]}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>

//             </div>


//             <div className="chart">

//               <h3>
//                 Vessel Types
//               </h3>

//               <ResponsiveContainer
//                 width="100%"
//                 height={300}
//               >

//                 <BarChart
//                   data={vesselTypeData}
//                 >

//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                   />

//                   <XAxis
//                     dataKey="name"
//                   />

//                   <YAxis />

//                   <Tooltip />

//                   <Bar
//                     dataKey="value"
//                     fill="#a64afc"
//                     radius={[
//                       6,
//                       6,
//                       0,
//                       0
//                     ]}
//                   />

//                 </BarChart>

//               </ResponsiveContainer>

//             </div>

//           </div>


//           {/* OFAC TABLE */}

//           <h2 className="table-title">
//             Sanction Details
//           </h2>

//           <div className="table-wrapper">

//             <table className="cases-table">

//               <thead>

//                 <tr>

//                   <th>
//                     Sr No
//                   </th>

//                   <th>
//                     Name
//                   </th>

//                   <th>
//                     Type
//                   </th>

//                   <th>
//                     Program
//                   </th>

//                   <th>
//                     Vessel Type
//                   </th>

//                   <th>
//                     Region
//                   </th>

//                   <th>
//                     Additional
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {filteredSanctions.length > 0 ? (

//                   filteredSanctions.map(
//                     (s, i) => (

//                       <tr key={i}>

//                         <td>
//                           {s["Sr No"]}
//                         </td>

//                         <td>
//                           {s.Name}
//                         </td>

//                         <td>
//                           {s.Type}
//                         </td>

//                         <td>
//                           {s.Program}
//                         </td>

//                         <td>
//                           {
//                             s["Vessel Type"] === "-0-"
//                               ? "-"
//                               : s["Vessel Type"]
//                           }
//                         </td>

//                         <td>
//                           {
//                             s.Region === "-0-"
//                               ? "-"
//                               : s.Region
//                           }
//                         </td>

//                         <td>
//                           {s.Additional}
//                         </td>

//                       </tr>

//                     )
//                   )

//                 ) : (

//                   <tr>

//                     <td
//                       colSpan="7"
//                       style={{
//                         textAlign: "center"
//                       }}
//                     >
//                       No sanction records found
//                     </td>

//                   </tr>

//                 )}

//               </tbody>

//             </table>

//           </div>

//         </>

//       )}

//     </div>

//   );
// }

// export default Dashboard;











































import { useEffect, useState } from "react";
import api from "../api";
import "./dashboard.css";
import FilterDropdown from "./FilterDropdown";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const COLORS = [
  "#e5fa24",
  "#fcbf56",
  "#40c8e0",
  "#a64afc",
  "#4863b9"
];

function Dashboard() {

  // =====================================================
  // DATA
  // =====================================================

  const [data, setData] = useState(null);

  // =====================================================
  // SOURCE FILTER
  // =====================================================

  const [sourceFilter, setSourceFilter] = useState("all");

  // =====================================================
  // eCOURTS FILTERS
  // =====================================================

  const [entityFilter, setEntityFilter] = useState([]);
  const [stateFilter, setStateFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // =====================================================
  // OFAC FILTERS
  // =====================================================

  const [sanctionEntityFilter, setSanctionEntityFilter] =
    useState([]);

  const [typeFilter, setTypeFilter] = useState([]);
  const [programFilter, setProgramFilter] = useState([]);
  const [regionFilter, setRegionFilter] = useState([]);
  const [vesselTypeFilter, setVesselTypeFilter] =
    useState([]);

  // =====================================================
  // LOAD DASHBOARD DATA
  // =====================================================

  useEffect(() => {

    api
      .get("/dashboard")
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.error(
          "Dashboard API error:",
          error
        );
      });

  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (!data) {

    return (
      <p className="loading">
        Loading dashboard...
      </p>
    );

  }

  // =====================================================
  // SAFE DATA
  // =====================================================

  const cases =
    Array.isArray(data.cases)
      ? data.cases
      : [];

  const sanctions =
    Array.isArray(data.sanctions)
      ? data.sanctions
      : [];

  // =====================================================
  // SOURCE OPTIONS
  // =====================================================

  const sourceOptions = [
    {
      value: "all",
      label: "All Sources"
    },
    {
      value: "ecourts",
      label: "eCourts"
    },
    {
      value: "ofac",
      label: "U.S. Sanction (OFAC/Treasury)"
    }
  ];

  // =====================================================
  // eCOURTS FILTER OPTIONS
  // =====================================================

  const entityOptions = [
    ...new Set(
      cases
        .map(c => c["Entity Name"])
        .filter(Boolean)
    )
  ];

  const stateOptions = [
    ...new Set(
      cases
        .map(c => c.state)
        .filter(Boolean)
    )
  ];

  const statusOptions = [
    ...new Set(
      cases
        .map(c => c.case_status)
        .filter(Boolean)
    )
  ];

  // =====================================================
  // OFAC FILTER OPTIONS
  // =====================================================

  const sanctionEntityOptions = [
    ...new Set(
      sanctions
        .map(s => s.Name)
        .filter(Boolean)
    )
  ];

  const typeOptions = [
    ...new Set(
      sanctions
        .map(s => s.Type)
        .filter(Boolean)
    )
  ];

  const programOptions = [
    ...new Set(
      sanctions
        .map(s => s.Program)
        .filter(Boolean)
        .filter(value => value !== "-0-")
    )
  ];

  const regionOptions = [
    ...new Set(
      sanctions
        .map(s => s.Region)
        .filter(Boolean)
        .filter(value => value !== "-0-")
    )
  ];

  const vesselTypeOptions = [
    ...new Set(
      sanctions
        .map(s => s["Vessel Type"])
        .filter(Boolean)
        .filter(value => value !== "-0-")
    )
  ];

  // =====================================================
  // FILTER eCOURTS
  // =====================================================

  const filteredCases = cases.filter(c => {

    const caseDate =
      c.registration_date
        ? new Date(c.registration_date)
        : null;

    let matchesFromDate = true;
    let matchesToDate = true;

    if (fromDate) {

      const from =
        new Date(`${fromDate}T00:00:00`);

      matchesFromDate =
        caseDate &&
        caseDate >= from;

    }

    if (toDate) {

      const to =
        new Date(`${toDate}T23:59:59`);

      matchesToDate =
        caseDate &&
        caseDate <= to;

    }

    return (

      (
        entityFilter.length === 0 ||
        entityFilter.includes(
          c["Entity Name"]
        )
      )

      &&

      (
        stateFilter.length === 0 ||
        stateFilter.includes(c.state)
      )

      &&

      (
        statusFilter.length === 0 ||
        statusFilter.includes(
          c.case_status
        )
      )

      &&

      matchesFromDate

      &&

      matchesToDate

    );

  });

  // =====================================================
  // FILTER OFAC
  // =====================================================

  const filteredSanctions =
    sanctions.filter(s => {

      return (

        (
          sanctionEntityFilter.length === 0 ||
          sanctionEntityFilter.includes(
            s.Name
          )
        )

        &&

        (
          typeFilter.length === 0 ||
          typeFilter.includes(s.Type)
        )

        &&

        (
          programFilter.length === 0 ||
          programFilter.includes(
            s.Program
          )
        )

        &&

        (
          regionFilter.length === 0 ||
          regionFilter.includes(
            s.Region
          )
        )

        &&

        (
          vesselTypeFilter.length === 0 ||
          vesselTypeFilter.includes(
            s["Vessel Type"]
          )
        )

      );

    });

  // =====================================================
  // eCOURTS KPI
  // =====================================================

  const ecourtsKpi = {

    total:
      filteredCases.length,

    entities:
      new Set(
        filteredCases
          .map(c => c["Entity Name"])
          .filter(Boolean)
      ).size,

    active:
      filteredCases.filter(
        c =>
          String(c.case_status || "")
            .toLowerCase() === "pending"
      ).length,

    highRisk:
      filteredCases.filter(
        c =>
          Number(
            c.litigation_risk_score
          ) >= 7
      ).length

  };

  // =====================================================
  // OFAC KPI
  // =====================================================

  const ofacKpi = {

    total:
      filteredSanctions.length,

    vessels:
      filteredSanctions.filter(
        s =>
          String(s.Type || "")
            .toLowerCase() === "vessel"
      ).length,

    programs:
      new Set(
        filteredSanctions
          .map(s => s.Program)
          .filter(
            value =>
              value &&
              value !== "-0-"
          )
      ).size,

    regions:
      new Set(
        filteredSanctions
          .map(s => s.Region)
          .filter(
            value =>
              value &&
              value !== "-0-"
          )
      ).size

  };

  // =====================================================
  // ALL SOURCE KPI
  // =====================================================

  const allSourceKpi = {

    totalRecords:
      filteredCases.length +
      filteredSanctions.length,

    ecourtsRecords:
      filteredCases.length,

    ofacRecords:
      filteredSanctions.length,

    ecourtsEntities:
      ecourtsKpi.entities,

    ofacVessels:
      ofacKpi.vessels

  };

  // =====================================================
  // eCOURTS GROUP DATA
  // =====================================================

  const groupCaseData = key => {

    const map = {};

    filteredCases.forEach(c => {

      const value =
        c[key] || "Unknown";

      map[value] =
        (map[value] || 0) + 1;

    });

    return Object.entries(map).map(
      ([name, value]) => ({
        name,
        value
      })
    );

  };

  const statusData =
    groupCaseData("case_status");

  const stateData =
    groupCaseData("state");

  const courtData =
    groupCaseData("court");

  // =====================================================
  // eCOURTS TIMELINE
  // =====================================================

  const timelineMap = {};

  filteredCases.forEach(c => {

    const registrationDate =
      c.registration_date || "";

    const month =
      String(registrationDate).slice(0, 7);

    if (!month) return;

    timelineMap[month] =
      (timelineMap[month] || 0) + 1;

  });

  const timelineData =
    Object.entries(timelineMap)
      .sort(([a], [b]) =>
        a.localeCompare(b)
      )
      .map(
        ([month, casesCount]) => ({
          month,
          cases: casesCount
        })
      );

  // =====================================================
  // OFAC GROUP DATA
  // =====================================================

  const groupSanctionData = key => {

    const map = {};

    filteredSanctions.forEach(s => {

      let value = s[key];

      if (
        !value ||
        value === "-0-"
      ) {
        value = "Unknown";
      }

      map[value] =
        (map[value] || 0) + 1;

    });

    return Object.entries(map).map(
      ([name, value]) => ({
        name,
        value
      })
    );

  };

  const sanctionTypeData =
    groupSanctionData("Type");

  const sanctionRegionData =
    groupSanctionData("Region");

  const sanctionProgramData =
    groupSanctionData("Program");

  const vesselTypeData =
    groupSanctionData("Vessel Type");

  // =====================================================
  // CHANGE SOURCE
  // =====================================================

  const handleSourceChange = value => {

    setSourceFilter(value);

    // Reset eCourts filters

    setEntityFilter([]);
    setStateFilter([]);
    setStatusFilter([]);

    setFromDate("");
    setToDate("");

    // Reset OFAC filters

    setSanctionEntityFilter([]);

    setTypeFilter([]);
    setProgramFilter([]);
    setRegionFilter([]);
    setVesselTypeFilter([]);

  };

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="dashboard">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="header1">

        <div className="header1-left">

          <h1>
            Compliance Intelligence Dashboard
          </h1>

        </div>

        <div className="header1-right">

          <span>
            Welcome, Admin
          </span>

        </div>

      </div>


      {/* =================================================
          FILTER AREA
      ================================================= */}

      <div className="filters">

        {/* =================================================
            SOURCE FILTER - LEFT
        ================================================= */}

        <div className="filter-box source-filter-box">

          <label>
            Source
          </label>

          <select
            value={sourceFilter}
            onChange={e =>
              handleSourceChange(
                e.target.value
              )
            }
          >

            {sourceOptions.map(source => (

              <option
                key={source.value}
                value={source.value}
              >
                {source.label}
              </option>

            ))}

          </select>

        </div>


        {/* =================================================
            eCOURTS FILTERS - RIGHT
        ================================================= */}

        {sourceFilter === "ecourts" && (

          <>

            <FilterDropdown
              label="Entity"
              options={entityOptions}
              selected={entityFilter}
              setSelected={setEntityFilter}
            />

            <FilterDropdown
              label="State"
              options={stateOptions}
              selected={stateFilter}
              setSelected={setStateFilter}
            />

            <FilterDropdown
              label="Status"
              options={statusOptions}
              selected={statusFilter}
              setSelected={setStatusFilter}
            />

            <div className="filter-box">

              <label>
                From Date
              </label>

              <input
                type="date"
                value={fromDate}
                onChange={e =>
                  setFromDate(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="filter-box">

              <label>
                To Date
              </label>

              <input
                type="date"
                value={toDate}
                onChange={e =>
                  setToDate(
                    e.target.value
                  )
                }
              />

            </div>

          </>

        )}


        {/* =================================================
            OFAC FILTERS - RIGHT
        ================================================= */}

        {sourceFilter === "ofac" && (

          <>

            <FilterDropdown
              label="Entity / Name"
              options={sanctionEntityOptions}
              selected={sanctionEntityFilter}
              setSelected={
                setSanctionEntityFilter
              }
            />

            <FilterDropdown
              label="Type"
              options={typeOptions}
              selected={typeFilter}
              setSelected={setTypeFilter}
            />

            <FilterDropdown
              label="Program"
              options={programOptions}
              selected={programFilter}
              setSelected={setProgramFilter}
            />

            <FilterDropdown
              label="Region"
              options={regionOptions}
              selected={regionFilter}
              setSelected={setRegionFilter}
            />

            <FilterDropdown
              label="Vessel Type"
              options={vesselTypeOptions}
              selected={vesselTypeFilter}
              setSelected={
                setVesselTypeFilter
              }
            />

          </>

        )}

      </div>


      {/* =================================================
          ALL SOURCES
      ================================================= */}

      {sourceFilter === "all" && (

        <>

          <div className="kpi-grid">

            {[
              {
                label: "Total Records",
                value:
                  allSourceKpi.totalRecords
              },
              {
                label: "eCourts Records",
                value:
                  allSourceKpi.ecourtsRecords
              },
              {
                label: "OFAC Records",
                value:
                  allSourceKpi.ofacRecords
              },
              {
                label: "eCourts Entities",
                value:
                  allSourceKpi.ecourtsEntities
              },
              {
                label: "OFAC Vessels",
                value:
                  allSourceKpi.ofacVessels
              }
            ].map((item, i) => (

              <div
                className="card"
                key={i}
              >

                <p>
                  {item.label}
                </p>

                <h2>
                  {item.value}
                </h2>

              </div>

            ))}

          </div>


          <div className="charts">

            <div className="chart">

              <h3>
                Records by Source
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={[
                      {
                        name: "eCourts",
                        value:
                          filteredCases.length
                      },
                      {
                        name:
                          "OFAC / Treasury",
                        value:
                          filteredSanctions.length
                      }
                    ]}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {[0, 1].map(i => (

                      <Cell
                        key={i}
                        fill={
                          COLORS[
                            i %
                            COLORS.length
                          ]
                        }
                      />

                    ))}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>


            <div className="chart">

              <h3>
                Source Record Summary
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={[
                    {
                      name: "eCourts",
                      value:
                        filteredCases.length
                    },
                    {
                      name: "OFAC",
                      value:
                        filteredSanctions.length
                    }
                  ]}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#018c91"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </>

      )}


      {/* =================================================
          eCOURTS DASHBOARD
      ================================================= */}

      {sourceFilter === "ecourts" && (

        <>

          <div className="kpi-grid">

            {[
              {
                label: "Total Records",
                value:
                  ecourtsKpi.total
              },
              {
                label: "Entities",
                value:
                  ecourtsKpi.entities
              },
              {
                label: "Active",
                value:
                  ecourtsKpi.active
              },
              {
                label: "High Risk",
                value:
                  ecourtsKpi.highRisk
              }
            ].map((item, i) => (

              <div
                className="card"
                key={i}
              >

                <p>
                  {item.label}
                </p>

                <h2>
                  {item.value}
                </h2>

              </div>

            ))}

          </div>


          <div className="charts">

            <div className="chart">

              <h3>
                Case Status
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {statusData.map(
                      (_, i) => (

                        <Cell
                          key={i}
                          fill={
                            COLORS[
                              i %
                              COLORS.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>


            <div className="chart">

              <h3>
                Cases by State
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={stateData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#018c91"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          <div className="charts">

            <div className="chart">

              <h3>
                Cases by Court
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={courtData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#186460"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>


            <div className="chart">

              <h3>
                Timeline
              </h3>

              <ResponsiveContainer
                width="90%"
                height={300}
              >

                <LineChart
                  data={timelineData}
                >

                  <CartesianGrid
                    strokeDasharray="1 1"
                  />

                  <XAxis
                    dataKey="month"
                  />

                  <YAxis />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="cases"
                    stroke="rgb(106, 117, 0)"
                    strokeWidth={2}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>


          <h2 className="table-title">
            Case Details
          </h2>

          <div className="table-wrapper">

            <table className="cases-table">

              <thead>

                <tr>

                  <th>Case</th>
                  <th>Entity</th>
                  <th>Court</th>
                  <th>State</th>
                  <th>Status</th>
                  <th>Risk</th>

                </tr>

              </thead>

              <tbody>

                {filteredCases.length > 0 ? (

                  filteredCases.map(
                    (c, i) => (

                      <tr key={i}>

                        <td>
                          {c.case_number}
                        </td>

                        <td>
                          {c["Entity Name"]}
                        </td>

                        <td>
                          {c.court}
                        </td>

                        <td>
                          {c.state}
                        </td>

                        <td>
                          {c.case_status}
                        </td>

                        <td
                          className={
                            Number(
                              c.litigation_risk_score
                            ) >= 7
                              ? "risk-high"
                              : "risk-low"
                          }
                        >
                          {
                            c.litigation_risk_score
                          }
                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center"
                      }}
                    >
                      No records found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </>

      )}


      {/* =================================================
          OFAC / TREASURY DASHBOARD
      ================================================= */}

      {sourceFilter === "ofac" && (

        <>

          <div className="kpi-grid">

            {[
              {
                label: "Total Records",
                value:
                  ofacKpi.total
              },
              {
                label: "Vessels",
                value:
                  ofacKpi.vessels
              },
              {
                label: "Programs",
                value:
                  ofacKpi.programs
              },
              {
                label: "Regions",
                value:
                  ofacKpi.regions
              }
            ].map((item, i) => (

              <div
                className="card"
                key={i}
              >

                <p>
                  {item.label}
                </p>

                <h2>
                  {item.value}
                </h2>

              </div>

            ))}

          </div>


          <div className="charts">

            <div className="chart">

              <h3>
                Sanctions by Type
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <PieChart>

                  <Pie
                    data={sanctionTypeData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >

                    {sanctionTypeData.map(
                      (_, i) => (

                        <Cell
                          key={i}
                          fill={
                            COLORS[
                              i %
                              COLORS.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>


            <div className="chart">

              <h3>
                Sanctions by Region
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={sanctionRegionData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#018c91"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          <div className="charts">

            <div className="chart">

              <h3>
                Sanctions by Program
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={sanctionProgramData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#186460"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>


            <div className="chart">

              <h3>
                Vessel Types
              </h3>

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={vesselTypeData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#a64afc"
                    radius={[
                      6,
                      6,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>


          <h2 className="table-title">
            Sanction Details
          </h2>

          <div className="table-wrapper">

            <table className="cases-table">

              <thead>

                <tr>

                  <th>
                    Sr No
                  </th>

                  <th>
                    Name
                  </th>

                  <th>
                    Type
                  </th>

                  <th>
                    Program
                  </th>

                  <th>
                    Vessel Type
                  </th>

                  <th>
                    Region
                  </th>

                  <th>
                    Additional
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredSanctions.length > 0 ? (

                  filteredSanctions.map(
                    (s, i) => (

                      <tr key={i}>

                        <td>
                          {s["Sr No"]}
                        </td>

                        <td>
                          {s.Name}
                        </td>

                        <td>
                          {s.Type}
                        </td>

                        <td>
                          {s.Program}
                        </td>

                        <td>
                          {
                            s["Vessel Type"] ===
                            "-0-"
                              ? "-"
                              : s["Vessel Type"]
                          }
                        </td>

                        <td>
                          {
                            s.Region ===
                            "-0-"
                              ? "-"
                              : s.Region
                          }
                        </td>

                        <td>
                          {s.Additional}
                        </td>

                      </tr>

                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      style={{
                        textAlign: "center"
                      }}
                    >
                      No sanction records found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </>

      )}

    </div>

  );

}

export default Dashboard;
