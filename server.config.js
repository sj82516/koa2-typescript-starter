module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'server',
      script: './dist/src/index.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      "error_file": "./log/err.log",
      "out_file": "./log/out.log",
      "merge_logs": true,
      "log_date_format": "YYYY-MM-DD HH:mm Z"
    }
  ]
};