import express from 'express';
import {
  getUserProgress,
  getProblemProgress,
  updateProgress,
  getProgressStats,
  deleteProgress,
} from '../controllers/progressController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, getUserProgress).post(protect, updateProgress);
router.route('/stats').get(protect, getProgressStats);
router.route('/problem/:problemId').get(protect, getProblemProgress);
router.route('/:id').delete(protect, deleteProgress);

export default router;
