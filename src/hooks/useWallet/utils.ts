import { DefaultWalletType } from "@saberhq/use-solana";
import type { WalletName } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  BraveWalletAdapter,
  Coin98WalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";

/** @dev The function to get wallet name. */
export const getWalletName = (name: string): WalletName => {
  switch (name) {
    case DefaultWalletType.Phantom:
      return new PhantomWalletAdapter().name as WalletName;
    case DefaultWalletType.BraveWallet:
      return new BraveWalletAdapter().name as WalletName;
    case DefaultWalletType.Coin98:
      return new Coin98WalletAdapter().name as WalletName;
    case DefaultWalletType.Ledger:
      return new LedgerWalletAdapter().name as WalletName;
    case DefaultWalletType.Solflare:
      return new SolflareWalletAdapter().name as WalletName;
    case DefaultWalletType.Sollet:
      return new SolletWalletAdapter().name as WalletName;
  }
};
