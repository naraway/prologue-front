import { ApiException, FailureMessage, InvalidParamsException, OffsetElementList } from '@nara-way/accent';
import { AxiosResponse, Method } from 'axios';
import { axiosApi } from '../axiosApi';
import { RequestConfigType, SingleDataType, SingleResponseType, VoidableSingleDataType } from './model';


class ApiClient {
  //
  private static readonly defaultConfig: RequestConfigType = {
    resDataName: '',
  };

  private readonly baseUrl: string;

  private readonly defaultConfig: RequestConfigType;


  constructor(baseUrl: string, defaultConfig: RequestConfigType = ApiClient.defaultConfig) {
    //
    this.baseUrl = baseUrl;

    this.defaultConfig = {
      ...defaultConfig,
    };
  }

  async getNullable<T extends object | string | number | boolean>(
    responseType: VoidableSingleDataType<T>, url: string, config?: RequestConfigType,
  ): Promise<SingleResponseType<T>> {
    //
    return this.requestNullable<T>(responseType, 'get', url, config);
  }

  async postNullable<T extends object | string | number | boolean | void>(
    responseType: VoidableSingleDataType<T>, url: string, data?: object, config?: RequestConfigType,
  ): Promise<SingleResponseType<T>> {
    //
    return this.requestNullable<T>(responseType, 'post', url, {
      ...config,
      data,
    });
  }

  async requestNullable<T extends object | string | number | boolean | void>(
    responseType: VoidableSingleDataType<T>, httpMethod: Method, url: string, config?: RequestConfigType,
  ): Promise<SingleResponseType<T>> {
    //
    return this.requestNullableSingle<T>(responseType, httpMethod, url, config);
  }

  async getNotNull<T extends object | string | number | boolean>(
    responseType: SingleDataType<T>, url: string, config?: RequestConfigType,
  ): Promise<T> {
    //
    return this.requestNotNull<T>(responseType, 'get', url, config);
  }

  async postNotNull<T extends object | string | number | boolean>(
    responseType: SingleDataType<T>, url: string, data?: object, config?: RequestConfigType,
  ): Promise<T> {
    //
    return this.requestNotNull<T>(responseType, 'post', url, {
      ...config,
      data,
    });
  }

  async requestNotNull<T extends object | string | number | boolean>(
    responseType: SingleDataType<T>, httpMethod: Method, url: string, config?: RequestConfigType,
  ): Promise<T> {
    //
    return this.requestNotNullSingle<T>(responseType, httpMethod, url, config);
  }

  async getArray<T extends object | string | number | boolean>(
    responseNodeType: SingleDataType<T>, url: string, config?: RequestConfigType,
  ): Promise<T[]> {
    //
    return this.requestArray<T>(responseNodeType, 'get', url, config);
  }

  async postArray<T extends object | string | number | boolean>(
    responseNodeType: SingleDataType<T>, url: string, data?: object, config?: RequestConfigType,
  ): Promise<T[]> {
    //
    return this.requestArray<T>(responseNodeType, 'post', url, {
      ...config,
      data,
    });
  }

  async requestArray<T extends object | string | number | boolean>(
    responseNodeType: SingleDataType<T>, httpMethod: Method, url: string, config?: RequestConfigType,
  ): Promise<T[]> {
    //
    return this.requestNotNullArray<T>(responseNodeType, httpMethod, url, config);
  }

  async postOffsetElementList<T extends object | string | number | boolean>(
    responseNodeType: SingleDataType<T>, url: string, data?: object, config?: RequestConfigType,
  ): Promise<OffsetElementList<T>> {
    //
    return this.requestOffsetElementList<T>(responseNodeType, 'post', url, {
      ...config,
      data,
    });
  }

  async requestOffsetElementList<T extends object | string | number | boolean>(
    responseNodeType: SingleDataType<T>, httpMethod: Method, url: string, config?: RequestConfigType,
  ): Promise<OffsetElementList<T>> {
    //
    return this.requestNotNullOffsetElementList<T>(responseNodeType, httpMethod, url, config);
  }


  // Private -----------------------------------------------------------------------------------------------------------

  private async requestNullableSingle<T extends object | string | number | boolean | void>(
    responseType: VoidableSingleDataType<T>, httpMethod: Method, url: string, paramConfig?: RequestConfigType,
  ): Promise<SingleResponseType<T>> {
    //
    const config = this.getConfig(paramConfig);
    const response = await this.request<T>(httpMethod, url, config);

    this.checkFailedAndThrow(response);

    const isWrapped = this.isWrapped(config);

    if (isWrapped && responseType === undefined) {
      throw new ApiException('ApiClient', `ResponseType is ${responseType}, it cannot be with a responseDataName -> url: ${url}`);
    } else if (isWrapped && !response.data) {
      throw new ApiException('ApiClient', `Response is null, it must be exists. -> url: ${url}`);
    }

    const defaultData = this.getVoidableDefaultData<T>(responseType);
    const data = this.getResponseSingleData(response, defaultData, config);

    return this.fromDomain<T>(responseType, data);
  }

  private async requestNotNullSingle<T extends object | string | number | boolean>(
    responseType: SingleDataType<T>, httpMethod: Method, url: string, paramConfig?: RequestConfigType,
  ): Promise<any> {
    //
    const config = this.getConfig(paramConfig);
    const response = await this.request<T>(httpMethod, url, config);

    this.checkFailedAndThrow(response);

    const isWrapped = this.isWrapped(config);

    if (isWrapped && responseType === undefined) {
      throw new ApiException('ApiClient', `ResponseType is ${responseType}, it cannot be with a responseDataName -> url: ${url}`);
    } else if (isWrapped && !response.data) {
      throw new ApiException('ApiClient', `Response is null, it must be exists. -> url: ${url}`);
    }

    const defaultData = this.getDefaultData<T>(responseType);
    const data = this.getResponseSingleData(response, defaultData, config);

    if (data === null) {
      throw new ApiException('ApiClient', `Response data is null, it must be exists. -> url: ${url}`);
    }

    return this.fromDomain<T>(responseType, data);
  }

  private async requestNotNullArray<T extends object | string | number | boolean>(
    responseNodeType: SingleDataType<T>, httpMethod: Method, url: string, paramConfig?: RequestConfigType,
  ): Promise<any> {
    //
    const config = this.getConfig(paramConfig);
    const response = await this.request<T>(httpMethod, url, config);

    this.checkFailedAndThrow(response);

    const isWrapped = this.isWrapped(config);

    if (isWrapped && !response.data) {
      throw new ApiException('ApiClient', `Response data is null, it must be exists. -> url: ${url}`);
    }

    const data = this.getResponseArrayData(response, config);

    return this.fromDomainList<T>(responseNodeType, data);
  }

  private async requestNotNullOffsetElementList<T extends object | string | number | boolean>(
    responseNodeType: SingleDataType<T>, httpMethod: Method, url: string, paramConfig?: RequestConfigType,
  ): Promise<OffsetElementList<T>> {
    //
    const config = this.getConfig(paramConfig);
    const response = await this.request<T>(httpMethod, url, config);

    this.checkFailedAndThrow(response);

    const isWrapped = this.isWrapped(config);

    if (isWrapped && !response.data) {
      throw new ApiException('ApiClient', `Response data is null, it must be exists. -> url: ${url}`);
    }

    const data = this.getResponseArrayData(response, config);

    const domainData = this.fromDomainList<T>(responseNodeType, data);
    const totalCount = this.getTotalCount(response);
    const previous = this.getPrevious(response);
    const next = this.getNext(response);

    return new OffsetElementList<T>(domainData, totalCount, previous, next);
  }

  private async request<T extends object | string | number | boolean | void>(
    httpMethod: Method, url: string, config?: RequestConfigType,
  ): Promise<AxiosResponse> {
    //
    return axiosApi.request<T>({
      ...config,
      method: httpMethod,
      url: this.baseUrl + url,
    });
  }

  private checkFailedAndThrow(response: any): void {
    //
    if (response.data && response.data.failureMessage) {
      const { failureMessage } = response.data;
      const exception = new ApiException('ApiClient', `Request failed. ${failureMessage.exceptionName} - ${failureMessage.exceptionMessage}`);

      if (failureMessage) {
        exception.failureMessage = FailureMessage.fromDomain(failureMessage);
      }
      throw exception;
    }
  }

  private getConfig(paramConfig?: RequestConfigType): RequestConfigType {
    //
    return {
      ...this.defaultConfig,
      ...paramConfig,
    };
  }

  private isWrapped(config: RequestConfigType): boolean {
    //
    return !!config.resDataName || !!this.defaultConfig.resDataName;
  }

  private getResponseSingleData(response: any, defaultData: any, config?: RequestConfigType) {
    //
    const resDataName = config && config.resDataName || this.defaultConfig.resDataName;

    if (resDataName) {
      return response.data[resDataName] || defaultData;
    } else {
      return response.data || defaultData;
    }
  }

  private getResponseArrayData(response: any, config?: RequestConfigType) {
    //
    const resDataName = config && config.resDataName || this.defaultConfig.resDataName;

    if (resDataName) {
      return response.data[resDataName] || [];
    } else {
      return response.data || [];
    }
  }

  private getTotalCount(response: any) {
    //
    return response.data.offset.totalCount || 0;
  }

  private getPrevious(response: any) {
    //
    return response.data.offset.previous || false;
  }

  private getNext(response: any) {
    //
    return response.data.offset.next || false;
  }

  private fromDomain<T>(responseType: VoidableSingleDataType<T> | SingleDataType<T>, responseData: any) {
    //
    if (responseData && typeof responseType === 'function' && typeof (responseType as any).fromDomain === 'function') {
      const fromDomain = (responseType as any).fromDomain;

      return fromDomain(responseData);
    }
    return responseData;
  }

  private fromDomainList<T>(responseNodeType: VoidableSingleDataType<T> | SingleDataType<T>, responseData: any[]) {
    //
    if (typeof responseNodeType === 'function' && typeof (responseNodeType as any).fromDomain === 'function') {
      const fromDomain = (responseNodeType as any).fromDomain;

      return responseData.map((data) => fromDomain(data));
    }
    return responseData;
  }

  private getVoidableDefaultData<T>(responseType: VoidableSingleDataType<T>): any {
    //
    switch (responseType) {
      case undefined:
        return undefined;
      default:
        return this.getDefaultData(responseType as any);
    }
  }

  private getDefaultData<T>(responseType: SingleDataType<T>): any {
    //
    let emptyResult: any;

    switch (responseType) {
      case undefined:
        emptyResult = undefined;
        break;
      case String:
        emptyResult = '';
        break;
      case Number:
        emptyResult = 0;
        break;
      case Boolean:
        emptyResult = false;
        break;
      // @ts-ignore
      case Object:
        emptyResult = null;
        break;
      default:
        if (typeof responseType !== 'function') {
          throw new InvalidParamsException('ApiClient', `Invalid responseType of ApiClient. -> ${responseType}`);
        } else {
          emptyResult = null;
        }
    }
    return emptyResult;
  }
}

export default ApiClient;
