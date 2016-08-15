module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  networks: {
    "development": {
      network_id: "default",
      host: "localhost",
      port: 9000
    }
  },
  rpc: {
    host: "localhost",
    //port: 8545
    port: 9000
  }
};
