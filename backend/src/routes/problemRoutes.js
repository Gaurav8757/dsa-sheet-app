import express from 'express';
import {
  getProblems,
  getProblemById,
  getProblemsByTopic,
  createProblem,
  updateProblem,
  deleteProblem,
} from '../controllers/problemController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getProblems).post(protect, createProblem);
router.route('/topic/:topicId').get(protect, getProblemsByTopic);
router
  .route('/:id')
  .get(protect, getProblemById)
  .put(protect, updateProblem)
  .delete(protect, deleteProblem);

export default router;
