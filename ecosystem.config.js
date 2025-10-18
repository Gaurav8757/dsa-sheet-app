module.exports = {
  apps: [
    {
      name: "backend",
      script: "npm",
      args: "start",
      cwd: "/home/ubuntu/dsa-sheet-app/backend",
      env: {
        PORT: 5000,
        NODE_ENV: "production",
      },
    },
    {
      name: "frontend",
      script: "npx",
      args: "serve -s dist -l 3000",
      cwd: "/home/ubuntu/dsa-sheet-app/frontend",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
