module.exports = {
  apps: [
    {
      name: "tts-dashboard",
      script: "npm",
      args: "run start",
      exec_mode: "fork",
      instances: "1",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: 80,
      },
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      merge_logs: true,
    },
  ],
};
