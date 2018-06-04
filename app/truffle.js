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

  // npm.cmd is needed to run truffle on windows
  build: `${/^win/.test(process.platform) ? 'npm.cmd' : 'npm'} run build`,
  networks: {
    "development": {
      network_id: "default",
      host: process.env.ETH_NODE_HOST ? process.env.ETH_NODE_HOST : "localhost",
      port: 8545
    }
  },
  rpc: {
    host: process.env.ETH_NODE_HOST ? process.env.ETH_NODE_HOST : "localhost",
    port: 8545
  }
};
