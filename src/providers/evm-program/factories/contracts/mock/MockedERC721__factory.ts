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
import type { NonPayableOverrides } from "../../../common";
import type {
  MockedERC721,
  MockedERC721Interface,
} from "../../../contracts/mock/MockedERC721";

const _abi = [
  {
    inputs: [],
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
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
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
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
    name: "safeMint",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600c81526020016b4d6f636b656445524337323160a01b815250604051806040016040528060078152602001664d45524337323160c81b815250816000908162000068919062000195565b50600162000077828262000195565b505050620000946200008e6200009a60201b60201c565b6200009e565b62000261565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200011b57607f821691505b6020821081036200013c57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200019057600081815260208120601f850160051c810160208610156200016b5750805b601f850160051c820191505b818110156200018c5782815560010162000177565b5050505b505050565b81516001600160401b03811115620001b157620001b1620000f0565b620001c981620001c2845462000106565b8462000142565b602080601f831160018114620002015760008415620001e85750858301515b600019600386901b1c1916600185901b1785556200018c565b600085815260208120601f198616915b82811015620002325788860151825594840194600190910190840162000211565b5085821015620002515787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61143080620002716000396000f3fe608060405234801561001057600080fd5b50600436106100eb5760003560e01c8063715018a611610092578063715018a6146101c75780638da5cb5b146101cf57806395d89b41146101e0578063a1448194146101e8578063a22cb465146101fb578063b88d4fde1461020e578063c87b56dd14610221578063e985e9c514610234578063f2fde38b1461024757600080fd5b806301ffc9a7146100f057806306fdde0314610118578063081812fc1461012d578063095ea7b31461015857806323b872dd1461016d57806342842e0e146101805780636352211e1461019357806370a08231146101a6575b600080fd5b6101036100fe366004610f25565b61025a565b60405190151581526020015b60405180910390f35b6101206102ac565b60405161010f9190610f92565b61014061013b366004610fa5565b61033e565b6040516001600160a01b03909116815260200161010f565b61016b610166366004610fda565b610365565b005b61016b61017b366004611004565b61047f565b61016b61018e366004611004565b6104b0565b6101406101a1366004610fa5565b6104cb565b6101b96101b4366004611040565b610500565b60405190815260200161010f565b61016b610586565b6006546001600160a01b0316610140565b61012061059a565b61016b6101f6366004610fda565b6105a9565b61016b61020936600461105b565b6105bf565b61016b61021c3660046110ad565b6105ca565b61012061022f366004610fa5565b610602565b610103610242366004611189565b610691565b61016b610255366004611040565b6106bf565b60006001600160e01b031982166380ac58cd60e01b148061028b57506001600160e01b03198216635b5e139f60e01b145b806102a657506301ffc9a760e01b6001600160e01b03198316145b92915050565b6060600080546102bb906111bc565b80601f01602080910402602001604051908101604052809291908181526020018280546102e7906111bc565b80156103345780601f1061030957610100808354040283529160200191610334565b820191906000526020600020905b81548152906001019060200180831161031757829003601f168201915b5050505050905090565b600061034982610738565b506000908152600460205260409020546001600160a01b031690565b6000610370826104cb565b9050806001600160a01b0316836001600160a01b0316036103e25760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103fe57506103fe8133610691565b6104705760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016103d9565b61047a838361076c565b505050565b61048933826107da565b6104a55760405162461bcd60e51b81526004016103d9906111f6565b61047a838383610839565b61047a838383604051806020016040528060008152506105ca565b6000818152600260205260408120546001600160a01b0316806102a65760405162461bcd60e51b81526004016103d990611244565b60006001600160a01b03821661056a5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016103d9565b506001600160a01b031660009081526003602052604090205490565b61058e6109d5565b6105986000610a2f565b565b6060600180546102bb906111bc565b6105b16109d5565b6105bb8282610a81565b5050565b6105bb338383610a9b565b6105d433836107da565b6105f05760405162461bcd60e51b81526004016103d9906111f6565b6105fc84848484610b65565b50505050565b606061060d82610738565b600061063f60408051808201909152601381527268747470733a2f2f676f6f676c652e636f6d2f60681b602082015290565b9050600081511161065f576040518060200160405280600081525061068a565b8061066984610b98565b60405160200161067a929190611276565b6040516020818303038152906040525b9392505050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b6106c76109d5565b6001600160a01b03811661072c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103d9565b61073581610a2f565b50565b6000818152600260205260409020546001600160a01b03166107355760405162461bcd60e51b81526004016103d990611244565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906107a1826104cb565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806107e6836104cb565b9050806001600160a01b0316846001600160a01b0316148061080d575061080d8185610691565b806108315750836001600160a01b03166108268461033e565b6001600160a01b0316145b949350505050565b826001600160a01b031661084c826104cb565b6001600160a01b0316146108b05760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016103d9565b6001600160a01b0382166109125760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103d9565b61091d60008261076c565b6001600160a01b03831660009081526003602052604081208054600192906109469084906112bb565b90915550506001600160a01b03821660009081526003602052604081208054600192906109749084906112ce565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b6006546001600160a01b031633146105985760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103d9565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6105bb828260405180602001604052806000815250610c99565b816001600160a01b0316836001600160a01b031603610af85760405162461bcd60e51b815260206004820152601960248201527822a9219b99189d1030b8383937bb32903a379031b0b63632b960391b60448201526064016103d9565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610b70848484610839565b610b7c84848484610ccc565b6105fc5760405162461bcd60e51b81526004016103d9906112e1565b606081600003610bbf5750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610be95780610bd381611333565b9150610be29050600a83611362565b9150610bc3565b60008167ffffffffffffffff811115610c0457610c04611097565b6040519080825280601f01601f191660200182016040528015610c2e576020820181803683370190505b5090505b841561083157610c436001836112bb565b9150610c50600a86611376565b610c5b9060306112ce565b60f81b818381518110610c7057610c7061138a565b60200101906001600160f81b031916908160001a905350610c92600a86611362565b9450610c32565b610ca38383610dcd565b610cb06000848484610ccc565b61047a5760405162461bcd60e51b81526004016103d9906112e1565b60006001600160a01b0384163b15610dc257604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610d109033908990889088906004016113a0565b6020604051808303816000875af1925050508015610d4b575060408051601f3d908101601f19168201909252610d48918101906113dd565b60015b610da8573d808015610d79576040519150601f19603f3d011682016040523d82523d6000602084013e610d7e565b606091505b508051600003610da05760405162461bcd60e51b81526004016103d9906112e1565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610831565b506001949350505050565b6001600160a01b038216610e235760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016103d9565b6000818152600260205260409020546001600160a01b031615610e885760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016103d9565b6001600160a01b0382166000908152600360205260408120805460019290610eb19084906112ce565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6001600160e01b03198116811461073557600080fd5b600060208284031215610f3757600080fd5b813561068a81610f0f565b60005b83811015610f5d578181015183820152602001610f45565b50506000910152565b60008151808452610f7e816020860160208601610f42565b601f01601f19169290920160200192915050565b60208152600061068a6020830184610f66565b600060208284031215610fb757600080fd5b5035919050565b80356001600160a01b0381168114610fd557600080fd5b919050565b60008060408385031215610fed57600080fd5b610ff683610fbe565b946020939093013593505050565b60008060006060848603121561101957600080fd5b61102284610fbe565b925061103060208501610fbe565b9150604084013590509250925092565b60006020828403121561105257600080fd5b61068a82610fbe565b6000806040838503121561106e57600080fd5b61107783610fbe565b91506020830135801515811461108c57600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600080600080608085870312156110c357600080fd5b6110cc85610fbe565b93506110da60208601610fbe565b925060408501359150606085013567ffffffffffffffff808211156110fe57600080fd5b818701915087601f83011261111257600080fd5b81358181111561112457611124611097565b604051601f8201601f19908116603f0116810190838211818310171561114c5761114c611097565b816040528281528a602084870101111561116557600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561119c57600080fd5b6111a583610fbe565b91506111b360208401610fbe565b90509250929050565b600181811c908216806111d057607f821691505b6020821081036111f057634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252602e908201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560408201526d1c881b9bdc88185c1c1c9bdd995960921b606082015260800190565b602080825260189082015277115490cdcc8c4e881a5b9d985b1a59081d1bdad95b88125160421b604082015260600190565b60008351611288818460208801610f42565b83519083019061129c818360208801610f42565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b818103818111156102a6576102a66112a5565b808201808211156102a6576102a66112a5565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b600060018201611345576113456112a5565b5060010190565b634e487b7160e01b600052601260045260246000fd5b6000826113715761137161134c565b500490565b6000826113855761138561134c565b500690565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906113d390830184610f66565b9695505050505050565b6000602082840312156113ef57600080fd5b815161068a81610f0f56fea26469706673582212203a15bb0969dad7d0caee14b5a4f436eb1cfe17da40e6d2963650037a10b41bf664736f6c63430008110033";

type MockedERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MockedERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MockedERC721__factory extends ContractFactory {
  constructor(...args: MockedERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MockedERC721 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MockedERC721__factory {
    return super.connect(runner) as MockedERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MockedERC721Interface {
    return new Interface(_abi) as MockedERC721Interface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MockedERC721 {
    return new Contract(address, _abi, runner) as unknown as MockedERC721;
  }
}
