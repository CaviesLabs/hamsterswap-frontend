import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import qs from "qs";
import { getStorageProvider } from "./";

export type RequestConfig = Partial<AxiosRequestConfig>;

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
      paramsSerializer: {
        serialize: (params: any) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      },
      headers: {
        ...this.defaultNetWorkOptions,
        ...requestConfig.headers,
      },
    } as any).catch((e) => e.response);

    if (!resp || resp?.status >= 400) {
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
      return null;
    }
    const options = Object.assign({}, requestConfig);
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${credential}`,
    } as any;
    return this.request<RequestResponse>(url, options as any);
  }
}

export const networkProvider = new NetworkProvider();
