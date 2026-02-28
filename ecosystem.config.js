module.exports = {
  apps: [
    {
      name: "tts-dashboard",
      script: "bun",
      args: "run start",
      exec_mode: "cluster",
      instances: "1",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0"
      },
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
    },
  ],
};