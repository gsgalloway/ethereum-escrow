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


declare type TxParams = {
    from?: string;  // - The address for the sending account. Uses the web3.eth.defaultAccount property, if not specified.
    to?: string;  // - (optional) The destination address of the message, left undefined for a contract-creation transaction.
    value?: number|string|BigNumber;  // - (optional) The value transferred for the transaction in Wei, also the endowment if it's a contract-creation transaction.
    gas?: number|string|BigNumber;  // - (optional, default: To-Be-Determined) The amount of gas to use for the transaction (unused gas is refunded).
    gasPrice?: number|string|BigNumber;  // - (optional, default: To-Be-Determined) The price of gas for this transaction in wei, defaults to the mean network gas price.
    data?: string;  // - (optional) Either a byte string containing the associated data of the message, or in the case of a contract-creation transaction, the initialisation code.
    nonce?: number;  // - (optional) Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.
};


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
    contract: Contract<*>;
};


// Documentation at https://github.com/trufflesuite/truffle-contract#contract-abstraction-api
declare class Contract<InstanceT: ContractInstance> {
    new(instanceArgs?: any[], txParams?: TxParams): Promise<InstanceT>;
    at(address: string): Promise<InstanceT>;
    deployed(): Promise<InstanceT>;
    link(instance: ContractInstance): void;
    networks(): string[];
};


declare type TransactionResult = {
    tx: string,
    receipt: {
        transactionHash: string,  // same as tx
        transactionIndex: number,
        blockHash: string,
        blockNumber: number,
        gasUsed: number,
        cumulativeGasUsed: number,
        contractAddress: string | null,
        logs: any[],
    },
    logs: any[],
};
