module.exports = {
  apps: [
    {
      name: "tts-dashboard",
      script: "bun",
      args: "run next start -p 80",
      exec_mode: "fork",
      instances: "1",
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
