import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Topic from '../models/Topic.js';
import Problem from '../models/Problem.js';
import connectDB from '../config/database.js';

dotenv.config();

const topics = [
  {
    name: 'Arrays',
    description: 'Master array manipulation and algorithms',
    order: 1,
    icon: '📊',
  },
  {
    name: 'Strings',
    description: 'String processing and pattern matching',
    order: 2,
    icon: '📝',
  },
  {
    name: 'Linked Lists',
    description: 'Linear data structures and pointers',
    order: 3,
    icon: '🔗',
  },
  {
    name: 'Stacks & Queues',
    description: 'LIFO and FIFO data structures',
    order: 4,
    icon: '📚',
  },
  {
    name: 'Trees',
    description: 'Binary trees, BST, and tree traversals',
    order: 5,
    icon: '🌲',
  },
  {
    name: 'Graphs',
    description: 'Graph algorithms and traversals',
    order: 6,
    icon: '🕸️',
  },
  {
    name: 'Dynamic Programming',
    description: 'Optimization problems with DP',
    order: 7,
    icon: '🎯',
  },
  {
    name: 'Sorting & Searching',
    description: 'Classic sorting and searching algorithms',
    order: 8,
    icon: '🔍',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Topic.deleteMany({});
    await Problem.deleteMany({});

    console.log('Cleared existing data');

    // Insert topics
    const createdTopics = await Topic.insertMany(topics);
    console.log('Topics created');

    // Create sample problems for Arrays
    const arraysTopic = createdTopics.find(t => t.name === 'Arrays');
    const arrayProblems = [
      {
        title: 'Two Sum',
        description: 'Find two numbers that add up to a target',
        topic: arraysTopic._id,
        level: 'Easy',
        youtubeLink: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
        leetcodeLink: 'https://leetcode.com/problems/two-sum/',
        articleLink: 'https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/',
        order: 1,
      },
      {
        title: 'Best Time to Buy and Sell Stock',
        description: 'Maximize profit from stock prices',
        topic: arraysTopic._id,
        level: 'Easy',
        youtubeLink: 'https://www.youtube.com/watch?v=1pkOgXD63yU',
        leetcodeLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
        articleLink: 'https://www.geeksforgeeks.org/best-time-to-buy-and-sell-stock/',
        order: 2,
      },
      {
        title: 'Maximum Subarray',
        description: 'Find the contiguous subarray with the largest sum',
        topic: arraysTopic._id,
        level: 'Medium',
        youtubeLink: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg',
        leetcodeLink: 'https://leetcode.com/problems/maximum-subarray/',
        articleLink: 'https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/',
        order: 3,
      },
      {
        title: 'Container With Most Water',
        description: 'Find two lines that contain the most water',
        topic: arraysTopic._id,
        level: 'Medium',
        youtubeLink: 'https://www.youtube.com/watch?v=UuiTKBwPgAo',
        leetcodeLink: 'https://leetcode.com/problems/container-with-most-water/',
        articleLink: 'https://www.geeksforgeeks.org/container-with-most-water/',
        order: 4,
      },
      {
        title: 'Trapping Rain Water',
        description: 'Calculate how much rain water can be trapped',
        topic: arraysTopic._id,
        level: 'Tough',
        youtubeLink: 'https://www.youtube.com/watch?v=ZI2z5pq0TqA',
        leetcodeLink: 'https://leetcode.com/problems/trapping-rain-water/',
        articleLink: 'https://www.geeksforgeeks.org/trapping-rain-water/',
        order: 5,
      },
    ];

    // Create sample problems for Strings
    const stringsTopic = createdTopics.find(t => t.name === 'Strings');
    const stringProblems = [
      {
        title: 'Valid Palindrome',
        description: 'Check if a string is a palindrome',
        topic: stringsTopic._id,
        level: 'Easy',
        youtubeLink: 'https://www.youtube.com/watch?v=jJXJ16kPFWg',
        leetcodeLink: 'https://leetcode.com/problems/valid-palindrome/',
        articleLink: 'https://www.geeksforgeeks.org/check-string-palindrome-not/',
        order: 1,
      },
      {
        title: 'Longest Substring Without Repeating Characters',
        description: 'Find the length of the longest substring without repeating characters',
        topic: stringsTopic._id,
        level: 'Medium',
        youtubeLink: 'https://www.youtube.com/watch?v=wiGpQwVHdE0',
        leetcodeLink: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        articleLink: 'https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/',
        order: 2,
      },
      {
        title: 'Valid Anagram',
        description: 'Check if two strings are anagrams',
        topic: stringsTopic._id,
        level: 'Easy',
        youtubeLink: 'https://www.youtube.com/watch?v=9UtInBqnCgA',
        leetcodeLink: 'https://leetcode.com/problems/valid-anagram/',
        articleLink: 'https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/',
        order: 3,
      },
    ];

    await Problem.insertMany([...arrayProblems, ...stringProblems]);
    console.log('Sample problems created');

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
