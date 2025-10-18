import Progress from '../models/Progress.js';
import Problem from '../models/Problem.js';

// @desc    Get user progress
// @route   GET /api/progress
// @access  Private
export const getUserProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user._id })
      .populate({
        path: 'problem',
        populate: { path: 'topic', select: 'name' }
      })
      .sort({ updatedAt: -1 });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get progress for a specific problem
// @route   GET /api/progress/problem/:problemId
// @access  Private
export const getProblemProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user._id,
      problem: req.params.problemId,
    }).populate('problem');

    res.json(progress || { completed: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update or create progress
// @route   POST /api/progress
// @access  Private
export const updateProgress = async (req, res) => {
  try {
    const { problemId, completed, notes } = req.body;

    // Verify problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    // Find existing progress or create new
    let progress = await Progress.findOne({
      user: req.user._id,
      problem: problemId,
    });

    if (progress) {
      // Update existing progress
      progress.completed = completed !== undefined ? completed : progress.completed;
      progress.notes = notes !== undefined ? notes : progress.notes;
      progress.completedAt = completed ? new Date() : progress.completedAt;
      await progress.save();
    } else {
      // Create new progress
      progress = await Progress.create({
        user: req.user._id,
        problem: problemId,
        completed,
        notes,
        completedAt: completed ? new Date() : null,
      });
    }

    const populatedProgress = await Progress.findById(progress._id)
      .populate({
        path: 'problem',
        populate: { path: 'topic', select: 'name' }
      });

    res.json(populatedProgress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get progress statistics
// @route   GET /api/progress/stats
// @access  Private
export const getProgressStats = async (req, res) => {
  try {
    const totalProblems = await Problem.countDocuments();
    const completedProblems = await Progress.countDocuments({
      user: req.user._id,
      completed: true,
    });

    const progressByLevel = await Progress.aggregate([
      {
        $match: {
          user: req.user._id,
          completed: true,
        },
      },
      {
        $lookup: {
          from: 'problems',
          localField: 'problem',
          foreignField: '_id',
          as: 'problemDetails',
        },
      },
      {
        $unwind: '$problemDetails',
      },
      {
        $group: {
          _id: '$problemDetails.level',
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalProblems,
      completedProblems,
      percentage: totalProblems > 0 ? ((completedProblems / totalProblems) * 100).toFixed(2) : 0,
      byLevel: progressByLevel,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete progress
// @route   DELETE /api/progress/:id
// @access  Private
export const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (progress) {
      await progress.deleteOne();
      res.json({ message: 'Progress removed' });
    } else {
      res.status(404).json({ message: 'Progress not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
