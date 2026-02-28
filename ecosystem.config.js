module.exports = {
  apps: [
    {
      name: "tts-dashboard",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 80",
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
