/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../../common";
import type {
  ERC721,
  ERC721Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC721/ERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620013c7380380620013c783398101604081905262000034916200011f565b600062000042838262000218565b50600162000051828262000218565b505050620002e4565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008257600080fd5b81516001600160401b03808211156200009f576200009f6200005a565b604051601f8301601f19908116603f01168101908282118183101715620000ca57620000ca6200005a565b81604052838152602092508683858801011115620000e757600080fd5b600091505b838210156200010b5785820183015181830184015290820190620000ec565b600093810190920192909252949350505050565b600080604083850312156200013357600080fd5b82516001600160401b03808211156200014b57600080fd5b620001598683870162000070565b935060208501519150808211156200017057600080fd5b506200017f8582860162000070565b9150509250929050565b600181811c908216806200019e57607f821691505b602082108103620001bf57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021357600081815260208120601f850160051c81016020861015620001ee5750805b601f850160051c820191505b818110156200020f57828155600101620001fa565b5050505b505050565b81516001600160401b038111156200023457620002346200005a565b6200024c8162000245845462000189565b84620001c5565b602080601f8311600181146200028457600084156200026b5750858301515b600019600386901b1c1916600185901b1785556200020f565b600085815260208120601f198616915b82811015620002b55788860151825594840194600190910190840162000294565b5085821015620002d45787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6110d380620002f46000396000f3fe608060405234801561001057600080fd5b50600436106100bf5760003560e01c80636352211e1161007c5780636352211e1461016757806370a082311461017a57806395d89b411461019b578063a22cb465146101a3578063b88d4fde146101b6578063c87b56dd146101c9578063e985e9c5146101dc57600080fd5b806301ffc9a7146100c457806306fdde03146100ec578063081812fc14610101578063095ea7b31461012c57806323b872dd1461014157806342842e0e14610154575b600080fd5b6100d76100d2366004610bc8565b6101ef565b60405190151581526020015b60405180910390f35b6100f4610241565b6040516100e39190610c35565b61011461010f366004610c48565b6102d3565b6040516001600160a01b0390911681526020016100e3565b61013f61013a366004610c7d565b6102fa565b005b61013f61014f366004610ca7565b610414565b61013f610162366004610ca7565b610445565b610114610175366004610c48565b610460565b61018d610188366004610ce3565b610495565b6040519081526020016100e3565b6100f461051b565b61013f6101b1366004610cfe565b61052a565b61013f6101c4366004610d50565b610539565b6100f46101d7366004610c48565b610571565b6100d76101ea366004610e2c565b6105e5565b60006001600160e01b031982166380ac58cd60e01b148061022057506001600160e01b03198216635b5e139f60e01b145b8061023b57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461025090610e5f565b80601f016020809104026020016040519081016040528092919081815260200182805461027c90610e5f565b80156102c95780601f1061029e576101008083540402835291602001916102c9565b820191906000526020600020905b8154815290600101906020018083116102ac57829003601f168201915b5050505050905090565b60006102de82610613565b506000908152600460205260409020546001600160a01b031690565b600061030582610460565b9050806001600160a01b0316836001600160a01b0316036103775760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b0382161480610393575061039381336105e5565b6104055760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c0000606482015260840161036e565b61040f838361064a565b505050565b61041e33826106b8565b61043a5760405162461bcd60e51b815260040161036e90610e99565b61040f838383610717565b61040f83838360405180602001604052806000815250610539565b6000818152600260205260408120546001600160a01b03168061023b5760405162461bcd60e51b815260040161036e90610ee7565b60006001600160a01b0382166104ff5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b606482015260840161036e565b506001600160a01b031660009081526003602052604090205490565b60606001805461025090610e5f565b6105353383836108b3565b5050565b61054333836106b8565b61055f5760405162461bcd60e51b815260040161036e90610e99565b61056b8484848461097d565b50505050565b606061057c82610613565b600061059360408051602081019091526000815290565b905060008151116105b357604051806020016040528060008152506105de565b806105bd846109b0565b6040516020016105ce929190610f19565b6040516020818303038152906040525b9392505050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6000818152600260205260409020546001600160a01b03166106475760405162461bcd60e51b815260040161036e90610ee7565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061067f82610460565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806106c483610460565b9050806001600160a01b0316846001600160a01b031614806106eb57506106eb81856105e5565b8061070f5750836001600160a01b0316610704846102d3565b6001600160a01b0316145b949350505050565b826001600160a01b031661072a82610460565b6001600160a01b03161461078e5760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b606482015260840161036e565b6001600160a01b0382166107f05760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b606482015260840161036e565b6107fb60008261064a565b6001600160a01b0383166000908152600360205260408120805460019290610824908490610f5e565b90915550506001600160a01b0382166000908152600360205260408120805460019290610852908490610f71565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b0316036109105760405162461bcd60e51b815260206004820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b604482015260640161036e565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610988848484610717565b61099484848484610ab1565b61056b5760405162461bcd60e51b815260040161036e90610f84565b6060816000036109d75750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610a0157806109eb81610fd6565b91506109fa9050600a83611005565b91506109db565b60008167ffffffffffffffff811115610a1c57610a1c610d3a565b6040519080825280601f01601f191660200182016040528015610a46576020820181803683370190505b5090505b841561070f57610a5b600183610f5e565b9150610a68600a86611019565b610a73906030610f71565b60f81b818381518110610a8857610a8861102d565b60200101906001600160f81b031916908160001a905350610aaa600a86611005565b9450610a4a565b60006001600160a01b0384163b15610ba757604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610af5903390899088908890600401611043565b6020604051808303816000875af1925050508015610b30575060408051601f3d908101601f19168201909252610b2d91810190611080565b60015b610b8d573d808015610b5e576040519150601f19603f3d011682016040523d82523d6000602084013e610b63565b606091505b508051600003610b855760405162461bcd60e51b815260040161036e90610f84565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905061070f565b506001949350505050565b6001600160e01b03198116811461064757600080fd5b600060208284031215610bda57600080fd5b81356105de81610bb2565b60005b83811015610c00578181015183820152602001610be8565b50506000910152565b60008151808452610c21816020860160208601610be5565b601f01601f19169290920160200192915050565b6020815260006105de6020830184610c09565b600060208284031215610c5a57600080fd5b5035919050565b80356001600160a01b0381168114610c7857600080fd5b919050565b60008060408385031215610c9057600080fd5b610c9983610c61565b946020939093013593505050565b600080600060608486031215610cbc57600080fd5b610cc584610c61565b9250610cd360208501610c61565b9150604084013590509250925092565b600060208284031215610cf557600080fd5b6105de82610c61565b60008060408385031215610d1157600080fd5b610d1a83610c61565b915060208301358015158114610d2f57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610d6657600080fd5b610d6f85610c61565b9350610d7d60208601610c61565b925060408501359150606085013567ffffffffffffffff80821115610da157600080fd5b818701915087601f830112610db557600080fd5b813581811115610dc757610dc7610d3a565b604051601f8201601f19908116603f01168101908382118183101715610def57610def610d3a565b816040528281528a6020848701011115610e0857600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b60008060408385031215610e3f57600080fd5b610e4883610c61565b9150610e5660208401610c61565b90509250929050565b600181811c90821680610e7357607f821691505b602082108103610e9357634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b602080825260189082015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604082015260600190565b60008351610f2b818460208801610be5565b835190830190610f3f818360208801610be5565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b8181038181111561023b5761023b610f48565b8082018082111561023b5761023b610f48565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b600060018201610fe857610fe8610f48565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261101457611014610fef565b500490565b60008261102857611028610fef565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b038581168252841660208201526040810183905260806060820181905260009061107690830184610c09565b9695505050505050565b60006020828403121561109257600080fd5b81516105de81610bb256fea2646970667358221220b8e19620089dd8c74a19f193e49731e005dc5707665d283b202e59a26d48c84b64736f6c63430008110033";

type ERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721__factory extends ContractFactory {
  constructor(...args: ERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override deploy(
    name_: string,
    symbol_: string,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<
      ERC721 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): ERC721__factory {
    return super.connect(runner) as ERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721Interface {
    return new Interface(_abi) as ERC721Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): ERC721 {
    return new Contract(address, _abi, runner) as unknown as ERC721;
  }
}
