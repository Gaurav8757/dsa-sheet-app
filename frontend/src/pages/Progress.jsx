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
    if (!stats) return 0;
    const count = stats.byLevel[level] || 0;
    const pct =
      stats.totalProblems > 0 ? (count / stats.totalProblems) * 100 : 0;
    return Math.round(pct);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app progress-page">
      <Navbar />

      <section className="progress-hero">
        <div className="progress-hero-inner">
          <h1>Learning Progress</h1>
          <p className="lead">
            Track your journey. Small steps every day add up.
          </p>
          <div className="progress-overview">
            <div className="overview-card">
              <div className="overview-title">Overall Completion</div>
              <div className="overview-value">{stats.percentage}%</div>
              <div className="overview-sub">
                {stats.completedProblems} / {stats.totalProblems} solved
              </div>
            </div>
            <div className="overview-card muted">
              <div className="overview-title">Easy</div>
              <div className="overview-value">{percentFor("Easy")}%</div>
            </div>
            <div className="overview-card muted">
              <div className="overview-title">Medium</div>
              <div className="overview-value">{percentFor("Medium")}%</div>
            </div>
            <div className="overview-card muted">
              <div className="overview-title">Hard</div>
              <div className="overview-value">{percentFor("Tough")}%</div>
            </div>
          </div>
        </div>
      </section>

      <main className="container">
        <div className="card glass-card">
          <h2>Progress Breakdown</h2>
          <p className="muted">
            Completion distributed across difficulty levels.
          </p>

          <div className="breakdown">
            <div className="break-item">
              <div className="break-label">Easy</div>
              <div className="progress-bar">
                <div
                  className="progress-fill easy"
                  style={{ width: `${percentFor("Easy")}%` }}
                />
              </div>
              <div className="break-value">{percentFor("Easy")}%</div>
            </div>

            <div className="break-item">
              <div className="break-label">Medium</div>
              <div className="progress-bar">
                <div
                  className="progress-fill medium"
                  style={{ width: `${percentFor("Medium")}%` }}
                />
              </div>
              <div className="break-value">{percentFor("Medium")}%</div>
            </div>

            <div className="break-item">
              <div className="break-label">Hard</div>
              <div className="progress-bar">
                <div
                  className="progress-fill hard"
                  style={{ width: `${percentFor("Tough")}%` }}
                />
              </div>
              <div className="break-value">{percentFor("Tough")}%</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Progress;
