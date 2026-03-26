// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Header from "./components/Header";

// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Entities from "./pages/Entities";
// import Alerts from "./pages/Alerts";
// import Reports from "./pages/Reports";
// import Automation from "./pages/Automation";
// const api = axios.create({
//   baseURL: "https://compclean.onrender.com"
// });
// import "./App.css";

// function App() {

//   return (

//     <BrowserRouter>

//       <Header />

//       <div className="page">

//         <Routes>

//           <Route path="/" element={<Home />} />

//           <Route path="/dashboard" element={<Dashboard />} />

//           <Route path="/entities" element={<Entities />} />

//           <Route path="/alerts" element={<Alerts />} />

//           <Route path="/reports" element={<Reports />} />

//           <Route path="/automation" element={<Automation />} />

//         </Routes>

//       </div>

//     </BrowserRouter>

//   );

// }

// export default App;









import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Entities from "./pages/Entities";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Automation from "./pages/Automation";
import Logs from "./pages/Logs";


import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/entities" element={<Entities />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
