module.exports = {
    ui: false,
    port: 3001,
    proxy: 'localhost:3000', // proxy requests to your Express server
    ghostMode: false,
    logLevel: 'info',
    open: false,
    browser: 'default',
    files: ['*.html', 'css/*.css', 'js/*.js'],
    watchOptions: {
      ignoreInitial: true,
      spawn: false,
    },
    server: {
      baseDir: './',
      index: 'index.html',
    },
    cors: false,
    xip: false,
    hostname: 'localhost',
    localAddress: 'localhost',
    port: 5500,
    tunnel: null,
    remoteUrl: null,
  };