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


declare type TxParams = {};


// Documentation at https://github.com/trufflesuite/truffle-contract-schema#schema
declare class ContractInstance {
    contract_name?: string;
    abi: {}[];
    unlinked_binary: string;
    network_id?: string | number;
    address?: string;
    links?: {};
    events?: {};
    default_network: string | number;
    networks?: {[string]: {}};
    address: string;
    transactionHash: string | null;
    contract: Contract;
};


// Documentation at https://github.com/trufflesuite/truffle-contract#contract-abstraction-api
declare class Contract<InstanceT: ContractInstance> {
    new(instanceArgs?: any[], txParams?: TxParams): Promise<InstanceT>;
    at(address: string): Promise<InstanceT>;
    deployed(): Promise<InstanceT>;
    link(instance: ContractInstance): void;
    networks(): string[];
};
