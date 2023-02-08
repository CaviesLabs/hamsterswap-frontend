export type SwapIdl = {
  version: "0.1.0";
  name: "swap";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "swapRegistry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "InitializeSwapPlatformParams";
          };
        }
      ];
    },
    {
      name: "updateSwapRegistry";
      accounts: [
        {
          name: "owner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "swapRegistry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "UpdateSwapPlatformParams";
          };
        }
      ];
    },
    {
      name: "createTokenVault";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "swapRegistry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "mintAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "swapTokenVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rent";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    },
    {
      name: "createProposal";
      accounts: [
        {
          name: "proposalOwner";
          isMut: true;
          isSigner: true;
        },
        {
          name: "swapProposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapRegistry";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "CreateProposalParams";
          };
        }
      ];
    },
    {
      name: "cancelProposal";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "swapProposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "CancelProposalParams";
          };
        }
      ];
    },
    {
      name: "transferAssetsToVault";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mintAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "signerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapProposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "TransferAssetsToVaultParams";
          };
        }
      ];
    },
    {
      name: "transferAssetsFromVault";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "mintAccount";
          isMut: false;
          isSigner: false;
        },
        {
          name: "swapRegistry";
          isMut: false;
          isSigner: false;
        },
        {
          name: "signerTokenAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapProposal";
          isMut: true;
          isSigner: false;
        },
        {
          name: "swapTokenVault";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "TransferAssetsFromVaultParams";
          };
        }
      ];
    },
    {
      name: "modifyAddressLookupTable";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "lookupTableRegistry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "lookupTableAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "lookupTableProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: "CreateAddressLookupTableParams";
          };
        }
      ];
    },
    {
      name: "initializeAddressLookupTable";
      accounts: [
        {
          name: "signer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "lookupTableRegistry";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [];
    }
  ];
  accounts: [
    {
      name: "swapPlatformRegistry";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "wasInitialized";
            type: "bool";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "maxAllowedItems";
            type: "u8";
          },
          {
            name: "maxAllowedOptions";
            type: "u8";
          },
          {
            name: "allowedMintAccounts";
            type: {
              vec: {
                defined: "MintInfo";
              };
            };
          }
        ];
      };
    },
    {
      name: "swapProposal";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "fulfilledBy";
            type: "publicKey";
          },
          {
            name: "fulfilledWithOptionId";
            type: "string";
          },
          {
            name: "offeredItems";
            type: {
              vec: {
                defined: "SwapItem";
              };
            };
          },
          {
            name: "swapOptions";
            type: {
              vec: {
                defined: "SwapOption";
              };
            };
          },
          {
            name: "expiredAt";
            type: "u64";
          },
          {
            name: "status";
            type: {
              defined: "SwapProposalStatus";
            };
          }
        ];
      };
    },
    {
      name: "lookupTableRegistry";
      type: {
        kind: "struct";
        fields: [
          {
            name: "bump";
            type: "u8";
          },
          {
            name: "owner";
            type: "publicKey";
          },
          {
            name: "lookupTableAddresses";
            type: {
              vec: "publicKey";
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "CancelProposalParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          }
        ];
      };
    },
    {
      name: "CreateAddressLookupTableParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "slot";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "SwapItemInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "mintAccount";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "itemType";
            type: {
              defined: "SwapItemType";
            };
          }
        ];
      };
    },
    {
      name: "SwapItemOptionInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "askingItems";
            type: {
              vec: {
                defined: "SwapItemInfo";
              };
            };
          }
        ];
      };
    },
    {
      name: "CreateProposalParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "swapOptions";
            type: {
              vec: {
                defined: "SwapItemOptionInfo";
              };
            };
          },
          {
            name: "offeredItems";
            type: {
              vec: {
                defined: "SwapItemInfo";
              };
            };
          },
          {
            name: "expiredAt";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "InitializeSwapPlatformParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "maxAllowedItems";
            type: "u8";
          },
          {
            name: "maxAllowedOptions";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "TransferAssetsFromVaultParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "swapTokenVaultBump";
            type: "u8";
          },
          {
            name: "proposalId";
            type: "string";
          },
          {
            name: "actionType";
            type: {
              defined: "TransferActionType";
            };
          },
          {
            name: "swapItemId";
            type: "string";
          }
        ];
      };
    },
    {
      name: "TransferAssetsToVaultParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "swapTokenVaultBump";
            type: "u8";
          },
          {
            name: "proposalId";
            type: "string";
          },
          {
            name: "actionType";
            type: {
              defined: "ActionType";
            };
          },
          {
            name: "optionId";
            type: "string";
          },
          {
            name: "swapItemId";
            type: "string";
          }
        ];
      };
    },
    {
      name: "UpdateSwapPlatformParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "maxAllowedItems";
            type: "u8";
          },
          {
            name: "maxAllowedOptions";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "MintInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "isEnabled";
            type: "bool";
          },
          {
            name: "mintAccount";
            type: "publicKey";
          },
          {
            name: "tokenAccount";
            type: "publicKey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "SwapItem";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "mintAccount";
            type: "publicKey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "status";
            type: {
              defined: "SwapItemStatus";
            };
          },
          {
            name: "itemType";
            type: {
              defined: "SwapItemType";
            };
          },
          {
            name: "owner";
            type: "publicKey";
          }
        ];
      };
    },
    {
      name: "SwapOption";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "string";
          },
          {
            name: "askingItems";
            type: {
              vec: {
                defined: "SwapItem";
              };
            };
          }
        ];
      };
    },
    {
      name: "TransferActionType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Redeeming";
          },
          {
            name: "Withdrawing";
          }
        ];
      };
    },
    {
      name: "ActionType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Depositing";
          },
          {
            name: "Fulfilling";
          }
        ];
      };
    },
    {
      name: "SwapItemType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "NFT";
          },
          {
            name: "Currency";
          }
        ];
      };
    },
    {
      name: "SwapItemStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Created";
          },
          {
            name: "Deposited";
          },
          {
            name: "Redeemed";
          },
          {
            name: "Withdrawn";
          }
        ];
      };
    },
    {
      name: "SwapProposalStatus";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Created";
          },
          {
            name: "Deposited";
          },
          {
            name: "Fulfilled";
          },
          {
            name: "Canceled";
          },
          {
            name: "Redeemed";
          },
          {
            name: "Withdrawn";
          }
        ];
      };
    }
  ];
  events: [
    {
      name: "SwapConfigUpdated";
      fields: [
        {
          name: "actor";
          type: "publicKey";
          index: true;
        },
        {
          name: "maxAllowedItems";
          type: "u8";
          index: false;
        },
        {
          name: "maxAllowedOptions";
          type: "u8";
          index: false;
        }
      ];
    },
    {
      name: "VaultCreated";
      fields: [
        {
          name: "actor";
          type: "publicKey";
          index: true;
        },
        {
          name: "authority";
          type: "publicKey";
          index: true;
        },
        {
          name: "mintAccount";
          type: "publicKey";
          index: true;
        },
        {
          name: "associatedAccount";
          type: "publicKey";
          index: true;
        }
      ];
    },
    {
      name: "ProposalCreated";
      fields: [
        {
          name: "actor";
          type: "publicKey";
          index: true;
        },
        {
          name: "proposalKey";
          type: "publicKey";
          index: true;
        },
        {
          name: "id";
          type: "string";
          index: true;
        },
        {
          name: "expiredAt";
          type: "i64";
          index: false;
        }
      ];
    },
    {
      name: "ProposalDeposited";
      fields: [
        {
          name: "actor";
          type: "publicKey";
          index: true;
        },
        {
          name: "proposalKey";
          type: "publicKey";
          index: true;
        },
        {
          name: "id";
          type: "string";
          index: true;
        },
        {
          name: "status";
          type: {
            defined: "SwapProposalStatus";
          };
          index: false;
        }
      ];
    },
    {
      name: "ProposalFulfilled";
      fields: [
        {
          name: "actor";
          type: "publicKey";
          index: true;
        },
        {
          name: "proposalKey";
          type: "publicKey";
          index: true;
        },
        {
          name: "id";
          type: "string";
          index: true;
        },
        {
          name: "status";
          type: {
            defined: "SwapProposalStatus";
          };
          index: false;
        }
      ];
    },
    {
      name: "ProposalCanceled";
      fields: [
        {
          name: "actor";
          type: "publicKey";
          index: true;
        },
        {
          name: "proposalKey";
          type: "publicKey";
          index: true;
        },
        {
          name: "id";
          type: "string";
          index: true;
        },
        {
          name: "status";
          type: {
            defined: "SwapProposalStatus";
          };
          index: false;
        }
      ];
    },
    {
      name: "ItemDeposited";
      fields: [
        {
          name: "actor";
          type: "publicKey";
          index: true;
        },
        {
          name: "proposalKey";
          type: "publicKey";
          index: true;
        },
        {
          name: "id";
          type: "string";
          index: true;
        },
        {
          name: "status";
          type: {
            defined: "SwapItemStatus";
          };
          index: false;
        }
      ];
    },
    {
      name: "ItemWithdrawn";
      fields: [
        {
          name: "actor";
          type: "publicKey";
          index: true;
        },
        {
          name: "proposalKey";
          type: "publicKey";
          index: true;
        },
        {
          name: "id";
          type: "string";
          index: true;
        },
        {
          name: "status";
          type: {
            defined: "SwapItemStatus";
          };
          index: false;
        }
      ];
    },
    {
      name: "ItemRedeemed";
      fields: [
        {
          name: "actor";
          type: "publicKey";
          index: true;
        },
        {
          name: "proposalKey";
          type: "publicKey";
          index: true;
        },
        {
          name: "id";
          type: "string";
          index: true;
        },
        {
          name: "status";
          type: {
            defined: "SwapItemStatus";
          };
          index: false;
        }
      ];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "SystemError";
      msg: "System error";
    },
    {
      code: 6001;
      name: "AlreadyInitialized";
      msg: "The program was already initialized";
    },
    {
      code: 6002;
      name: "MintAccountExisted";
      msg: "The mint account was existed";
    },
    {
      code: 6003;
      name: "OnlyAdministrator";
      msg: "Only Platform Admin";
    },
    {
      code: 6004;
      name: "OnlyOwner";
      msg: "Only Owner";
    },
    {
      code: 6005;
      name: "OnlyBuyer";
      msg: "Only Buyer";
    },
    {
      code: 6006;
      name: "OnlySeller";
      msg: "Only Seller";
    },
    {
      code: 6007;
      name: "OrderExpired";
      msg: "Order expired";
    },
    {
      code: 6008;
      name: "InvalidOffer";
      msg: "Invalid Offer";
    },
    {
      code: 6009;
      name: "InvalidValue";
      msg: "Invalid value";
    },
    {
      code: 6010;
      name: "UnAllowedMintToken";
      msg: "Invalid value";
    },
    {
      code: 6011;
      name: "ProposalCannotBeCanceled";
      msg: "Proposal cannot be canceled";
    },
    {
      code: 6012;
      name: "WithdrawalIsNotAvailable";
      msg: "Withdrawal is not available for the proposal";
    },
    {
      code: 6013;
      name: "RedeemIsNotAvailable";
      msg: "Redeem is not available for the proposal";
    },
    {
      code: 6014;
      name: "TransferTokenFromVaultIsNotAvailable";
      msg: "Transfer token from vault is not available for the proposal";
    },
    {
      code: 6015;
      name: "DepositIsNotAvailable";
      msg: "Deposit is not available for the proposal";
    },
    {
      code: 6016;
      name: "FulfillingIsNotAvailable";
      msg: "Fulfilling is not available for the proposal";
    },
    {
      code: 6017;
      name: "OnlyParticipant";
      msg: "Only participants can execute this operation";
    }
  ];
};

export const IDL: SwapIdl = {
  version: "0.1.0",
  name: "swap",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "swapRegistry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "InitializeSwapPlatformParams",
          },
        },
      ],
    },
    {
      name: "updateSwapRegistry",
      accounts: [
        {
          name: "owner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "swapRegistry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "UpdateSwapPlatformParams",
          },
        },
      ],
    },
    {
      name: "createTokenVault",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "swapRegistry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "mintAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "swapTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createProposal",
      accounts: [
        {
          name: "proposalOwner",
          isMut: true,
          isSigner: true,
        },
        {
          name: "swapProposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapRegistry",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CreateProposalParams",
          },
        },
      ],
    },
    {
      name: "cancelProposal",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "swapProposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CancelProposalParams",
          },
        },
      ],
    },
    {
      name: "transferAssetsToVault",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mintAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapProposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "TransferAssetsToVaultParams",
          },
        },
      ],
    },
    {
      name: "transferAssetsFromVault",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "mintAccount",
          isMut: false,
          isSigner: false,
        },
        {
          name: "swapRegistry",
          isMut: false,
          isSigner: false,
        },
        {
          name: "signerTokenAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapProposal",
          isMut: true,
          isSigner: false,
        },
        {
          name: "swapTokenVault",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "TransferAssetsFromVaultParams",
          },
        },
      ],
    },
    {
      name: "modifyAddressLookupTable",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "lookupTableRegistry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "lookupTableAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "lookupTableProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "params",
          type: {
            defined: "CreateAddressLookupTableParams",
          },
        },
      ],
    },
    {
      name: "initializeAddressLookupTable",
      accounts: [
        {
          name: "signer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "lookupTableRegistry",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "swapPlatformRegistry",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "wasInitialized",
            type: "bool",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "maxAllowedItems",
            type: "u8",
          },
          {
            name: "maxAllowedOptions",
            type: "u8",
          },
          {
            name: "allowedMintAccounts",
            type: {
              vec: {
                defined: "MintInfo",
              },
            },
          },
        ],
      },
    },
    {
      name: "swapProposal",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "fulfilledBy",
            type: "publicKey",
          },
          {
            name: "fulfilledWithOptionId",
            type: "string",
          },
          {
            name: "offeredItems",
            type: {
              vec: {
                defined: "SwapItem",
              },
            },
          },
          {
            name: "swapOptions",
            type: {
              vec: {
                defined: "SwapOption",
              },
            },
          },
          {
            name: "expiredAt",
            type: "u64",
          },
          {
            name: "status",
            type: {
              defined: "SwapProposalStatus",
            },
          },
        ],
      },
    },
    {
      name: "lookupTableRegistry",
      type: {
        kind: "struct",
        fields: [
          {
            name: "bump",
            type: "u8",
          },
          {
            name: "owner",
            type: "publicKey",
          },
          {
            name: "lookupTableAddresses",
            type: {
              vec: "publicKey",
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "CancelProposalParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "string",
          },
        ],
      },
    },
    {
      name: "CreateAddressLookupTableParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "slot",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "SwapItemInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "mintAccount",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "itemType",
            type: {
              defined: "SwapItemType",
            },
          },
        ],
      },
    },
    {
      name: "SwapItemOptionInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "askingItems",
            type: {
              vec: {
                defined: "SwapItemInfo",
              },
            },
          },
        ],
      },
    },
    {
      name: "CreateProposalParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "swapOptions",
            type: {
              vec: {
                defined: "SwapItemOptionInfo",
              },
            },
          },
          {
            name: "offeredItems",
            type: {
              vec: {
                defined: "SwapItemInfo",
              },
            },
          },
          {
            name: "expiredAt",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "InitializeSwapPlatformParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "maxAllowedItems",
            type: "u8",
          },
          {
            name: "maxAllowedOptions",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "TransferAssetsFromVaultParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "swapTokenVaultBump",
            type: "u8",
          },
          {
            name: "proposalId",
            type: "string",
          },
          {
            name: "actionType",
            type: {
              defined: "TransferActionType",
            },
          },
          {
            name: "swapItemId",
            type: "string",
          },
        ],
      },
    },
    {
      name: "TransferAssetsToVaultParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "swapTokenVaultBump",
            type: "u8",
          },
          {
            name: "proposalId",
            type: "string",
          },
          {
            name: "actionType",
            type: {
              defined: "ActionType",
            },
          },
          {
            name: "optionId",
            type: "string",
          },
          {
            name: "swapItemId",
            type: "string",
          },
        ],
      },
    },
    {
      name: "UpdateSwapPlatformParams",
      type: {
        kind: "struct",
        fields: [
          {
            name: "maxAllowedItems",
            type: "u8",
          },
          {
            name: "maxAllowedOptions",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "MintInfo",
      type: {
        kind: "struct",
        fields: [
          {
            name: "isEnabled",
            type: "bool",
          },
          {
            name: "mintAccount",
            type: "publicKey",
          },
          {
            name: "tokenAccount",
            type: "publicKey",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "SwapItem",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "mintAccount",
            type: "publicKey",
          },
          {
            name: "amount",
            type: "u64",
          },
          {
            name: "status",
            type: {
              defined: "SwapItemStatus",
            },
          },
          {
            name: "itemType",
            type: {
              defined: "SwapItemType",
            },
          },
          {
            name: "owner",
            type: "publicKey",
          },
        ],
      },
    },
    {
      name: "SwapOption",
      type: {
        kind: "struct",
        fields: [
          {
            name: "id",
            type: "string",
          },
          {
            name: "askingItems",
            type: {
              vec: {
                defined: "SwapItem",
              },
            },
          },
        ],
      },
    },
    {
      name: "TransferActionType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Redeeming",
          },
          {
            name: "Withdrawing",
          },
        ],
      },
    },
    {
      name: "ActionType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Depositing",
          },
          {
            name: "Fulfilling",
          },
        ],
      },
    },
    {
      name: "SwapItemType",
      type: {
        kind: "enum",
        variants: [
          {
            name: "NFT",
          },
          {
            name: "Currency",
          },
        ],
      },
    },
    {
      name: "SwapItemStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Created",
          },
          {
            name: "Deposited",
          },
          {
            name: "Redeemed",
          },
          {
            name: "Withdrawn",
          },
        ],
      },
    },
    {
      name: "SwapProposalStatus",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Created",
          },
          {
            name: "Deposited",
          },
          {
            name: "Fulfilled",
          },
          {
            name: "Canceled",
          },
          {
            name: "Redeemed",
          },
          {
            name: "Withdrawn",
          },
        ],
      },
    },
  ],
  events: [
    {
      name: "SwapConfigUpdated",
      fields: [
        {
          name: "actor",
          type: "publicKey",
          index: true,
        },
        {
          name: "maxAllowedItems",
          type: "u8",
          index: false,
        },
        {
          name: "maxAllowedOptions",
          type: "u8",
          index: false,
        },
      ],
    },
    {
      name: "VaultCreated",
      fields: [
        {
          name: "actor",
          type: "publicKey",
          index: true,
        },
        {
          name: "authority",
          type: "publicKey",
          index: true,
        },
        {
          name: "mintAccount",
          type: "publicKey",
          index: true,
        },
        {
          name: "associatedAccount",
          type: "publicKey",
          index: true,
        },
      ],
    },
    {
      name: "ProposalCreated",
      fields: [
        {
          name: "actor",
          type: "publicKey",
          index: true,
        },
        {
          name: "proposalKey",
          type: "publicKey",
          index: true,
        },
        {
          name: "id",
          type: "string",
          index: true,
        },
        {
          name: "expiredAt",
          type: "i64",
          index: false,
        },
      ],
    },
    {
      name: "ProposalDeposited",
      fields: [
        {
          name: "actor",
          type: "publicKey",
          index: true,
        },
        {
          name: "proposalKey",
          type: "publicKey",
          index: true,
        },
        {
          name: "id",
          type: "string",
          index: true,
        },
        {
          name: "status",
          type: {
            defined: "SwapProposalStatus",
          },
          index: false,
        },
      ],
    },
    {
      name: "ProposalFulfilled",
      fields: [
        {
          name: "actor",
          type: "publicKey",
          index: true,
        },
        {
          name: "proposalKey",
          type: "publicKey",
          index: true,
        },
        {
          name: "id",
          type: "string",
          index: true,
        },
        {
          name: "status",
          type: {
            defined: "SwapProposalStatus",
          },
          index: false,
        },
      ],
    },
    {
      name: "ProposalCanceled",
      fields: [
        {
          name: "actor",
          type: "publicKey",
          index: true,
        },
        {
          name: "proposalKey",
          type: "publicKey",
          index: true,
        },
        {
          name: "id",
          type: "string",
          index: true,
        },
        {
          name: "status",
          type: {
            defined: "SwapProposalStatus",
          },
          index: false,
        },
      ],
    },
    {
      name: "ItemDeposited",
      fields: [
        {
          name: "actor",
          type: "publicKey",
          index: true,
        },
        {
          name: "proposalKey",
          type: "publicKey",
          index: true,
        },
        {
          name: "id",
          type: "string",
          index: true,
        },
        {
          name: "status",
          type: {
            defined: "SwapItemStatus",
          },
          index: false,
        },
      ],
    },
    {
      name: "ItemWithdrawn",
      fields: [
        {
          name: "actor",
          type: "publicKey",
          index: true,
        },
        {
          name: "proposalKey",
          type: "publicKey",
          index: true,
        },
        {
          name: "id",
          type: "string",
          index: true,
        },
        {
          name: "status",
          type: {
            defined: "SwapItemStatus",
          },
          index: false,
        },
      ],
    },
    {
      name: "ItemRedeemed",
      fields: [
        {
          name: "actor",
          type: "publicKey",
          index: true,
        },
        {
          name: "proposalKey",
          type: "publicKey",
          index: true,
        },
        {
          name: "id",
          type: "string",
          index: true,
        },
        {
          name: "status",
          type: {
            defined: "SwapItemStatus",
          },
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "SystemError",
      msg: "System error",
    },
    {
      code: 6001,
      name: "AlreadyInitialized",
      msg: "The program was already initialized",
    },
    {
      code: 6002,
      name: "MintAccountExisted",
      msg: "The mint account was existed",
    },
    {
      code: 6003,
      name: "OnlyAdministrator",
      msg: "Only Platform Admin",
    },
    {
      code: 6004,
      name: "OnlyOwner",
      msg: "Only Owner",
    },
    {
      code: 6005,
      name: "OnlyBuyer",
      msg: "Only Buyer",
    },
    {
      code: 6006,
      name: "OnlySeller",
      msg: "Only Seller",
    },
    {
      code: 6007,
      name: "OrderExpired",
      msg: "Order expired",
    },
    {
      code: 6008,
      name: "InvalidOffer",
      msg: "Invalid Offer",
    },
    {
      code: 6009,
      name: "InvalidValue",
      msg: "Invalid value",
    },
    {
      code: 6010,
      name: "UnAllowedMintToken",
      msg: "Invalid value",
    },
    {
      code: 6011,
      name: "ProposalCannotBeCanceled",
      msg: "Proposal cannot be canceled",
    },
    {
      code: 6012,
      name: "WithdrawalIsNotAvailable",
      msg: "Withdrawal is not available for the proposal",
    },
    {
      code: 6013,
      name: "RedeemIsNotAvailable",
      msg: "Redeem is not available for the proposal",
    },
    {
      code: 6014,
      name: "TransferTokenFromVaultIsNotAvailable",
      msg: "Transfer token from vault is not available for the proposal",
    },
    {
      code: 6015,
      name: "DepositIsNotAvailable",
      msg: "Deposit is not available for the proposal",
    },
    {
      code: 6016,
      name: "FulfillingIsNotAvailable",
      msg: "Fulfilling is not available for the proposal",
    },
    {
      code: 6017,
      name: "OnlyParticipant",
      msg: "Only participants can execute this operation",
    },
  ],
};
