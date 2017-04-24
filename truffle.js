module.exports = {
  // build: {
  //   "index.html": "index.html",
  //   "app.js": [
  //     "javascripts/app.js"
  //   ],
  //   "app.css": [
  //     "stylesheets/app.css"
  //   ],
  //   "images/": "images/"
  // },
  build: "npm run build",
  networks: {
    "development": {
      network_id: "default",
      host: "localhost",
      port: 8545
    }
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
