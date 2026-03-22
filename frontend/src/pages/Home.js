import { useNavigate } from "react-router-dom";
import { FaChartBar, FaBell, FaFileAlt, FaBuilding } from "react-icons/fa";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* Welcome Section */}
      <div className="home-header">
        <h1>Legal Monitoring Platform</h1>
        <p>
          Monitor court cases related to vendors and clients and manage alerts efficiently.
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="quick-actions">

        <div className="action-card" onClick={() => navigate("/dashboard")}>
          <FaChartBar />
          <h3>Dashboard</h3>
          <p>View analytics and case insights</p>
        </div>

        <div className="action-card" onClick={() => navigate("/alerts")}>
          <FaBell />
          <h3>Alerts</h3>
          <p>Manage and monitor alerts</p>
        </div>

        <div className="action-card" onClick={() => navigate("/reports")}>
          <FaFileAlt />
          <h3>Reports</h3>
          <p>Download case reports</p>
        </div>

        <div className="action-card" onClick={() => navigate("/entities")}>
          <FaBuilding />
          <h3>Data Center</h3>
          <p>Manage entities</p>
        </div>

      </div>

    </div>
  );
}

export default Home;
