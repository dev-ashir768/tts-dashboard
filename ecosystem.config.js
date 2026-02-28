module.exports = {
  apps: [
    {
      name: "tts-dashboard",
      script: "bun",
      args: "run start",
      exec_mode: "cluster",
      instances: "max",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
    },
  ],
};