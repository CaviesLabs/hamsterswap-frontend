import { StorageProvider } from "./storage.provider";
import { NetworkProvider } from "./network.provider";

export const getStorageProvider = () => new StorageProvider();

export const getNetworkProvider = () => new NetworkProvider();
