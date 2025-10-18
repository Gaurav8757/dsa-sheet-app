import Topic from '../models/Topic.js';

// @desc    Get all topics
// @route   GET /api/topics
// @access  Private
export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ order: 1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single topic
// @route   GET /api/topics/:id
// @access  Private
export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a topic
// @route   POST /api/topics
// @access  Private
export const createTopic = async (req, res) => {
  try {
    const { name, description, order, icon } = req.body;

    const topic = await Topic.create({
      name,
      description,
      order,
      icon,
    });

    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a topic
// @route   PUT /api/topics/:id
// @access  Private
export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (topic) {
      topic.name = req.body.name || topic.name;
      topic.description = req.body.description || topic.description;
      topic.order = req.body.order !== undefined ? req.body.order : topic.order;
      topic.icon = req.body.icon || topic.icon;

      const updatedTopic = await topic.save();
      res.json(updatedTopic);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a topic
// @route   DELETE /api/topics/:id
// @access  Private
export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (topic) {
      await topic.deleteOne();
      res.json({ message: 'Topic removed' });
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
