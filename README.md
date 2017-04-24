# Trustless Two-Party Escrow Via Ethereum

A "web3" distributed webapp ("dapp") powered by React using the Ethereum Virtual Machine to facilitate
[two party double deposit trustless escrow](http://blackhalo.info/wp-content/uploads/2014/06/whitepaper_twosided.pdf) agreements.

## Two Party Double-Deposit Trustless Escrow

In short:

- Alice wants to buy something from Bob. They agree the value of the purchase is $10.
- Alice puts $20 in an escrow fund, and Bob puts $10 in that same fund.
- Bob delivers the product to Alice and confirms delivery to the escrow fund.
- Alice (hopefully) receives the product and confirms receipt to the escrow fund.
- Once both parties have submitted these confirmations, the escrow fund gives $20 to Bob and $10 to Alice.

The net effect of this is that Alice has received her purchase and has paid $10 to Bob.

## Code Architecture

The repository uses Consensys's [Truffle](https://truffle.readthedocs.io/en/latest/) framework to facilitate developing, testing, and deploying an Ethereum Smart Contract that powers the dapp.

The Ethereum Foundation's [Web3 Javascript Library](https://github.com/ethereum/wiki/wiki/JavaScript-API) is used to communicate with a running Ethereum node from within a web browser. This Ethereum node provides access to the Ethereum Virtual Machine (EVM), which is used to store and alter state about all active escrow agreements. The EVM functions for us as the back-end in a traditional front-end/back-end web app architecture.

React & Redux power the front-end of the web app. Redux communicates with the EVM via the `web3` library to read and alter state.

## Running/Developing Locally

You'll need NodeJS, Truffle (a development framework for easily building webapps that interact with
Ethereum contracts) version 3, and a running Ethereum node.

An Ethereum node is a process that manages connections to the Ethereum peer-to-peer network and runs all Transactions submitted to the blockchain to build an in-memory representation of the state of the EVM (this is used by the dapp to query the EVM's state). Ethereum nodes also facilitate broadcasting new transactions to the network and to the miners that can add those transactions to the blockchain (this is used by the dapp to make changes to the EVM's state).

Several options exist for Ethereum nodes.

- The [geth](https://github.com/ethereum/go-ethereum/wiki/geth) and [parity](https://ethcore.io/parity.html) projects both provide standalone Ethereum node implementations, as well as miner implementations. Both tools already know how to connect to both the public test network and the real public Ethereum peer-to-peer network.
- The [Mist](https://github.com/ethereum/mist) browser is a Chromium app that comes with `geth` bundled inside it and automatically configures a connection for your browser between the javascript running in the browser and the `geth` node running in the Chromium app. Mist can connect to either the public test network or the real public peer-to-peer network.
- [MetaMask](https://metamask.io) is a browser extension that facilitates connections between your javascript and existing ethereum nodes.
- EthereumJS TestRPC is a very lightweight tool that creates a private, local test network for you where you are the sole miner. This is by far the best tool to use for local development and local tests. It does not include a web browser, but any regular browser will be able to connect to it via the `web3` library.

Here's some setup instructions for use with EthereumJS TestRPC and MetaMask in Chrome:

- Install NodeJS
- Install & run EthereumJS TestRPC v3: https://github.com/ethereumjs/testrpc
  - `npm install -g ethereumjs-testrpc@">=3.0.0 <4.0.0"`
  - `testrpc` (in a separate window)
- Install Truffle v3: https://truffle.readthedocs.io/en/latest/getting_started/installation/
  - `npm install -g truffle@">=3.2.0 <4.0.0"`
- Compile and deploy the TrustlessEscrow smart contract to your EthereumJS TestRPC blockchain:
  - `truffle compile`
  - `truffle migrate`
- Build the frontend: `truffle build`
- Run Truffle's builtin webserver on http://localhost:8080
  - `truffle serve` (or `npm run dev` for live-reload)
- Install the MetaMask Chrome extension
  - https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related?authuser=2
  - Create a password, then switch networks to the `localhost:8545` option
- Navigate to http://localhost:8080 in a web3 compatible browser (Ex: Mist or MetaMask)
