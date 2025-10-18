import express from 'express';
import {
  getTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../controllers/topicController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getTopics).post(protect, createTopic);
router
  .route('/:id')
  .get(protect, getTopicById)
  .put(protect, updateTopic)
  .delete(protect, deleteTopic);

export default router;
