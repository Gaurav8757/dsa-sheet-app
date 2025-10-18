import Problem from '../models/Problem.js';

// Get all problems with optional topic filter
export const getProblems = async (req, res) => {
  try {
    const { topic } = req.query;
    const filter = topic ? { topic } : {};

    const problems = await Problem.find(filter)
      .populate('topic', 'name')
      .sort({ order: 1 });

    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get problem by ID
export const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).populate('topic', 'name');

    if (problem) {
      res.json(problem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get problems by topic
export const getProblemsByTopic = async (req, res) => {
  try {
    const problems = await Problem.find({ topic: req.params.topicId })
      .populate('topic', 'name')
      .sort({ order: 1 });

    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new problem
export const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      topic,
      level,
      youtubeLink,
      leetcodeLink,
      codeforcesLink,
      articleLink,
      order,
    } = req.body;

    const problem = await Problem.create({
      title,
      description,
      topic,
      level,
      youtubeLink,
      leetcodeLink,
      codeforcesLink,
      articleLink,
      order,
    });

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a problem
export const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (problem) {
      problem.title = req.body.title || problem.title;
      problem.description = req.body.description || problem.description;
      problem.topic = req.body.topic || problem.topic;
      problem.level = req.body.level || problem.level;
      problem.youtubeLink = req.body.youtubeLink || problem.youtubeLink;
      problem.leetcodeLink = req.body.leetcodeLink || problem.leetcodeLink;
      problem.codeforcesLink = req.body.codeforcesLink || problem.codeforcesLink;
      problem.articleLink = req.body.articleLink || problem.articleLink;
      problem.order = req.body.order !== undefined ? req.body.order : problem.order;

      const updatedProblem = await problem.save();
      res.json(updatedProblem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a problem
export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (problem) {
      await problem.deleteOne();
      res.json({ message: 'Problem removed' });
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
