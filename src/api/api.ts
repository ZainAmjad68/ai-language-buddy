import axios, { AxiosInstance } from 'axios';

interface IApiClient extends AxiosInstance {
  setHeader(headerKey: string, headerValue: string): void
  unsetHeader(headerKey: string): void
  setAuthHeader(token: string): void
  unsetAuthHeader(): void
}

function ApiClient() {
  const instance = axios.create({
    baseURL: document.location.origin,
  });

  const apiClient = Object.assign(instance, {
    setHeader(this: IApiClient, headerKey: string, headerValue: string): void {
      this.defaults.headers.common = {
        ...this.defaults.headers.common,
        [headerKey]: headerValue,
      };
    },
    unsetHeader(this: IApiClient, headerKey: string): void {
      const commonHeaders = { ...this.defaults.headers.common };
      delete commonHeaders[headerKey];

      this.defaults.headers.common = commonHeaders;
    },
    setAuthHeader(this: IApiClient, token: string): void {
      this.setHeader('Authorization', `Bearer ${token}`);
    },
    unsetAuthHeader(this: IApiClient): void {
      this.unsetHeader('Authorization');
    },
  });

  return apiClient;
}

export default ApiClient() as IApiClient;
