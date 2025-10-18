import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProgressStats } from "../services/api";

const Progress = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getProgressStats();
      // normalize byLevel to an object for easy lookup
      const byLevel = (data.byLevel || []).reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {});

      setStats({
        totalProblems: data.totalProblems,
        completedProblems: data.completedProblems,
        percentage: data.percentage,
        byLevel,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load progress");
    } finally {
      setLoading(false);
    }
  };

  const percentFor = (level) => {
    if (!stats) return "0%";
    const count = stats.byLevel[level] || 0;
    const pct =
      stats.totalProblems > 0
        ? ((count / stats.totalProblems) * 100).toFixed(2)
        : "0.00";
    return `${pct}%`;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <div className="card">
          <h2>Progress Report</h2>
          <p>
            Overall completion: {stats.percentage}% ({stats.completedProblems}/
            {stats.totalProblems})
          </p>
        </div>

        <div className="card">
          <h3>By Difficulty</h3>
          <div className="progress-grid">
            <div className="progress-item">
              <h4>Easy</h4>
              <p>{percentFor("Easy")}</p>
            </div>
            <div className="progress-item">
              <h4>Medium</h4>
              <p>{percentFor("Medium")}</p>
            </div>
            <div className="progress-item">
              <h4>Hard</h4>
              <p>{percentFor("Tough") /* backend uses 'Tough' for hard */}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
