import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a problem title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
    level: {
      type: String,
      enum: ['Easy', 'Medium', 'Tough'],
      required: [true, 'Please provide a difficulty level'],
    },
    youtubeLink: {
      type: String,
      trim: true,
    },
    leetcodeLink: {
      type: String,
      trim: true,
    },
    codeforcesLink: {
      type: String,
      trim: true,
    },
    articleLink: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
