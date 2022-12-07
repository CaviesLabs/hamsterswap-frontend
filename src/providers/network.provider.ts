import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { getStorageProvider } from "./";

export type RequestConfig = AxiosRequestConfig;

export class NetworkProvider {
  /**
   * @private
   * @dev
   * Base api url located in evn file
   */
  private BASE_URL = process.env.API_URL;

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
    const resp = await axios(url, {
      ...requestConfig,
      baseURL: `${this.BASE_URL}/api`,
      headers: {
        ...this.defaultNetWorkOptions,
        ...requestConfig.headers,
      },
    }).catch((e) => e.response);

    if (resp.status >= 400) {
      if (resp.status === 401) {
        // this.storageProvider.removeItem("userCredential");
        // this.storageProvider.removeItem("AccessToken");
        // this.storageProvider.removeItem("hAccessToken");
      }
      throw new Error(`Error when request server, ${resp.statusText}`);
    }

    let jsonData = resp.data;
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
    const credential = this.storageProvider.getItem("hAccessToken");
    if (!credential) {
      throw new Error("Credential not found");
    }
    const options = Object.assign({}, requestConfig);
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${credential}`,
    };
    return this.request<RequestResponse>(url, options);
  }
}

export const networkProvider = new NetworkProvider();
