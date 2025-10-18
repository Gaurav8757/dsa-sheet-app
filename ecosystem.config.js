module.exports = {
  apps: [
    // Backend
    {
      name: "backend",
      script: "npm",
      args: "start",
      cwd: "/data-sheet-app/backend",
      watch: true, // optional
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },

    // Frontend (Vite - Production build)
    {
      name: "frontend",
      script: "npm",
      args: "run preview", // matches your Vite script
      cwd: "/data-sheet-app/frontend",
      watch: true,
      env: {
        NODE_ENV: "production",
        PORT: 5173, // default Vite preview port
      },
    },

    {
      name: "frontend",
      script: "npx",
      args: "serve -s dist -l 3000",
      cwd: "/data-sheet-app/frontend",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
