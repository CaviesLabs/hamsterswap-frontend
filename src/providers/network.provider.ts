import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { getStorageProvider } from "./";

export type RequestConfig = AxiosRequestConfig;

export class NetworkProvider {
  /**
   * @private
   * @dev
   * Base api url located in evn file
   */
  private BASE_URL = "/api";

  /**
   * Default network options
   * @private
   */
  private defaultNetWorkOptions: RawAxiosRequestHeaders = {
    "Content-Type": "application/json",
  };

  /**
   * Storage provider
   * @private
   */
  private storageProvider;

  /**
   * @description
   * Initilize mode
   */
  constructor() {
    this.storageProvider = getStorageProvider();
  }

  /**
   * @param url
   * @param requestConfig
   * @returns
   * @description
   * The function to request to the api
   */
  async request<RequestResponse>(
    url: string,
    requestConfig: RequestConfig
  ): Promise<RequestResponse> {
    const endpoint = `${this.BASE_URL}/api${url}`;
    const resp = await axios(endpoint, {
      ...requestConfig,
      headers: {
        ...this.defaultNetWorkOptions,
        ...requestConfig.headers,
      },
    });

    if (resp.status !== 200) {
      throw new Error(`Error when request server, ${resp.statusText}`);
    }

    let jsonData = null;
    try {
      jsonData = JSON.parse(resp.data);
    } catch {}

    return jsonData as RequestResponse;
  }

  /**
   * @param url
   * @param requestConfig
   * @returns
   * @description
   * The function to request to the api with credential
   */
  async requestWithCredentials<RequestResponse>(
    url: string,
    requestConfig: RequestConfig
  ): Promise<RequestResponse> {
    const credential = this.storageProvider.getItem("jwt");
    if (!credential) {
      throw new Error("Credential not found");
    }
    const options = Object.assign({}, requestConfig);
    options.headers = {
      Authorization: `Bearer ${credential}`,
    };
    return this.request<RequestResponse>(url, options);
  }
}

export const networkProvider = new NetworkProvider();
