import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getTopics, getProgressStats } from '../services/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [topics, setTopics] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [topicsData, statsData] = await Promise.all([
        getTopics(),
        getProgressStats(),
      ]);
      setTopics(topicsData);
      setStats(statsData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleTopicClick = (topicId) => {
    navigate(`/topics/${topicId}`);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <div className="card">
          <h2>Welcome back, {user?.name}!</h2>
          <p>Track your DSA learning progress and ace your interviews</p>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{stats.completedProblems}</h3>
              <p>Problems Solved</p>
            </div>
            <div className="stat-card">
              <h3>{stats.totalProblems}</h3>
              <p>Total Problems</p>
            </div>
            <div className="stat-card">
              <h3>{stats.percentage}%</h3>
              <p>Completion Rate</p>
            </div>
          </div>
        )}

        <div className="card">
          <h2>DSA Topics</h2>
          <div className="topics-grid">
            {topics.map((topic) => (
              <div
                key={topic._id}
                className="topic-card"
                onClick={() => handleTopicClick(topic._id)}
              >
                <div className="topic-icon">{topic.icon}</div>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
