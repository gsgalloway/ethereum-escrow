// The javascript interfaces for our Solidity contracts
declare class Artifacts {
    require(path: string): any;
};


// Like describe() in mocha but Truffle's version that will
// include a list of active Ethereum accounts in the test body
declare function contract(
    description: string,
    testBody: (accounts: string[]) => void
): void;
