import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaYoutube, FaBook } from "react-icons/fa";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { BsArrowLeftCircleFill } from "react-icons/bs";
import {
  getProblemsByTopic,
  getTopicById,
  getUserProgress,
  updateProgress,
} from "../services/api";
import Navbar from "../components/Navbar";

const TopicProblems = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState(null);
  const [problems, setProblems] = useState([]);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [topicId]);

  const fetchData = async () => {
    try {
      const [topicData, problemsData, progressData] = await Promise.all([
        getTopicById(topicId),
        getProblemsByTopic(topicId),
        getUserProgress(),
      ]);

      setTopic(topicData);
      setProblems(problemsData);

      // Create a map of problem IDs to progress
      const progressMap = {};
      progressData.forEach((p) => {
        if (p.problem && p.problem._id) {
          progressMap[p.problem._id] = p.completed;
        }
      });
      setProgress(progressMap);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = async (problemId, currentStatus) => {
    try {
      await updateProgress({
        problemId,
        completed: !currentStatus,
      });

      // Update local state
      setProgress((prev) => ({
        ...prev,
        [problemId]: !currentStatus,
      }));
    } catch (err) {
      console.error("Failed to update progress:", err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <div className="card">
          <button onClick={() => navigate("/dashboard")} className="button-72">
            <BsArrowLeftCircleFill className="icon" /> Back to Dashboard
          </button>
          <h1>
            {topic?.icon} {topic?.name}
          </h1>
          <p>{topic?.description}</p>
        </div>

        <div className="problems-list">
          {problems.length === 0 ? (
            <div className="card">
              <p>No problems available for this topic yet.</p>
            </div>
          ) : (
            problems.map((problem, index) => (
              <div key={problem._id} className="problem-item">
                <div className="problem-checkbox">
                  <input
                    type="checkbox"
                    checked={progress[problem._id] || false}
                    onChange={() =>
                      handleCheckboxChange(problem._id, progress[problem._id])
                    }
                  />
                </div>
                <div className="problem-content">
                  <div className="problem-header">
                    <span className="problem-title">
                      {index + 1}. {problem.title}
                    </span>
                    <span
                      className={`problem-level level-${problem.level.toLowerCase()}`}
                    >
                      {problem.level}
                    </span>
                  </div>
                  {problem.description && (
                    <p style={{ color: "#666", marginTop: "0.5rem" }}>
                      {problem.description}
                    </p>
                  )}
                  <div className="problem-links">
                    {problem.youtubeLink && (
                      <a
                        href={problem.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="problem-link"
                      >
                        <FaYoutube /> YouTube
                      </a>
                    )}
                    {problem.leetcodeLink && (
                      <a
                        href={problem.leetcodeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="problem-link"
                      >
                        <SiLeetcode /> LeetCode
                      </a>
                    )}
                    {problem.codeforcesLink && (
                      <a
                        href={problem.codeforcesLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="problem-link"
                      >
                        <SiCodeforces /> Codeforces
                      </a>
                    )}
                    {problem.articleLink && (
                      <a
                        href={problem.articleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="problem-link"
                      >
                        <FaBook /> Article
                      </a>
                    )}
                  </div>
                </div>
                <div className="problem-status">
                  <span
                    className={`status-label ${
                      progress[problem._id] ? "done" : "pending"
                    }`}
                  >
                    {progress[problem._id] ? "Done" : "Pending"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicProblems;
