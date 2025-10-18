# DSA Sheet Tracker - MERN Application

A full-stack web application to track your Data Structures and Algorithms learning progress. Built with MongoDB, Express.js, React, and Node.js (MERN stack).

## Features

- **Secure Authentication**: JWT-based login and registration system
- **Topic-wise Organization**: DSA problems organized by topics (Arrays, Strings, Trees, etc.)
- **Problem Management**: Each problem includes:
  - Difficulty level (Easy/Medium/Tough)
  - YouTube tutorial links
  - LeetCode/Codeforces practice links
  - Article references
- **Progress Tracking**:
  - Checkbox for each problem to mark completion
  - Progress persists across sessions
  - Visual statistics dashboard
- **Responsive Design**: Clean, modern UI that works on all devices

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Context API for state management
- Vite for build tooling

## Project Structure

```
dsa-sheet-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── topicController.js
│   │   │   ├── problemController.js
│   │   │   └── progressController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Topic.js
│   │   │   ├── Problem.js
│   │   │   └── Progress.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── topicRoutes.js
│   │   │   ├── problemRoutes.js
│   │   │   └── progressRoutes.js
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   └── seedData.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── TopicProblems.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd dsa-sheet-app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-sheet
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start MongoDB (if running locally):
```bash
# On Linux/Mac
sudo systemctl start mongod

# On Mac with Homebrew
brew services start mongodb-community

# On Windows
net start MongoDB
```

6. Seed the database with sample data:
```bash
npm run seed
```

7. Start the backend server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd dsa-sheet-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Register a new account**:
   - Navigate to `http://localhost:3000`
   - Click on "Register" and create an account
   - You'll be automatically logged in after registration

2. **View Dashboard**:
   - See your progress statistics
   - View all available DSA topics

3. **Explore Topics**:
   - Click on any topic to view related problems
   - Each problem shows difficulty level and resource links

4. **Track Progress**:
   - Check the checkbox next to a problem when you complete it
   - Your progress is automatically saved
   - View completion statistics on the dashboard

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Topics
- `GET /api/topics` - Get all topics (protected)
- `GET /api/topics/:id` - Get single topic (protected)
- `POST /api/topics` - Create topic (protected)
- `PUT /api/topics/:id` - Update topic (protected)
- `DELETE /api/topics/:id` - Delete topic (protected)

### Problems
- `GET /api/problems` - Get all problems (protected)
- `GET /api/problems/:id` - Get single problem (protected)
- `GET /api/problems/topic/:topicId` - Get problems by topic (protected)
- `POST /api/problems` - Create problem (protected)
- `PUT /api/problems/:id` - Update problem (protected)
- `DELETE /api/problems/:id` - Delete problem (protected)

### Progress
- `GET /api/progress` - Get user progress (protected)
- `GET /api/progress/stats` - Get progress statistics (protected)
- `GET /api/progress/problem/:problemId` - Get progress for specific problem (protected)
- `POST /api/progress` - Update/create progress (protected)
- `DELETE /api/progress/:id` - Delete progress (protected)

## Database Schema

### User
- name: String (required)
- email: String (required, unique)
- password: String (required, hashed)

### Topic
- name: String (required)
- description: String
- order: Number
- icon: String (emoji)

### Problem
- title: String (required)
- description: String
- topic: ObjectId (reference to Topic)
- level: String (Easy/Medium/Tough)
- youtubeLink: String
- leetcodeLink: String
- codeforcesLink: String
- articleLink: String
- order: Number

### Progress
- user: ObjectId (reference to User)
- problem: ObjectId (reference to Problem)
- completed: Boolean
- completedAt: Date
- notes: String

## Building for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
```

The build files will be in the `frontend/dist` directory. You can serve them using any static file server or deploy to platforms like Vercel, Netlify, or AWS.

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=production
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the GitHub repository.

## Acknowledgments

- Built as a learning project for DSA tracking
- Inspired by various DSA sheets and interview preparation resources
