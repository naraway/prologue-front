import axios, { AxiosPromise } from 'axios';
import { Config } from './model';


type Configure = (config: Config, url?: string) => Config;

class AxiosApi {
  //
  static instance: AxiosApi;

  private static urlRewrite: { [key: string]: string } = {};

  private static configures: Configure[] = [];

  private statusMap: Map<number, Function>;

  interceptors = axios.interceptors;

  constructor() {
    //
    this.statusMap = new Map();
  }

  static setUrlRewrite(urlRewrite: { [key: string]: string }) {
    //
    AxiosApi.clearUrlRewrite();
    AxiosApi.addUrlRewrite(urlRewrite);
  }

  static addUrlRewrite(urlRewrite: { [key: string]: string }) {
    //
    AxiosApi.urlRewrite = { ...AxiosApi.urlRewrite, ...urlRewrite };
  }

  static clearUrlRewrite() {
    //
    AxiosApi.urlRewrite = {};
  }

  private static rewrite(url: string): string {
    //
    if (!AxiosApi.urlRewrite || Object.keys(AxiosApi.urlRewrite).length === 0) {
      return url;
    }

    console.debug('[AxiosApi:rewrite] url =', url, ' urlRewrite =', AxiosApi.urlRewrite);

    let targetUrl = url;
    const keys = Object.keys(AxiosApi.urlRewrite);
    keys.some(key => {
      if (targetUrl.includes(key)) {
        targetUrl = targetUrl.replace(key, AxiosApi.urlRewrite[key]);
        return true;
      }
      return false;
    });

    return targetUrl;
  }

  static setConfigure(configure: Configure) {
    //
    AxiosApi.clearConfigure(configure);
    AxiosApi.addConfigure(configure);
  }

  static addConfigure(configure: Configure) {
    //
    AxiosApi.configures.push(configure);
  }

  static clearConfigure(configure: Configure) {
    //
    AxiosApi.configures.splice(0, AxiosApi.configures.length);
  }

  private static configure(config: Config, url?: string): Config {
    //
    if (!AxiosApi.configures || AxiosApi.configures.length === 0) {
      return config;
    }

    let targetConfig = config;

    AxiosApi.configures.forEach(configure => {
      targetConfig = configure(targetConfig, url);
    });

    return targetConfig;
  }

  setCatch(status: number, catchFunc: Function) {
    //
    this.statusMap.set(status, catchFunc);
  }

  deleteCatch(status: number) {
    //
    this.statusMap.delete(status);
  }

  requestProcess(request: Promise<any>, config: Config) {
    //
    return request.catch((e) => {
      this.statusMap.forEach((catchFunc: Function, status: number) => {
        if (!config.noCatch && status === e.response.status) {
          catchFunc(e);
        }
      });
      throw e;
    });
  }

  request<T = any>(config: Config): AxiosPromise<T> {
    //
    const targetConfig = {
      ...AxiosApi.configure(config, config.url),
      ...config,
    };

    config.url = AxiosApi.rewrite(config.url || '');

    return this.requestProcess(axios.request<T>(config), targetConfig);
  }

  get<T = any>(url: string, config: Config = {}): AxiosPromise<T> {
    //
    const targetConfig = {
      ...AxiosApi.configure(config, url),
      ...config,
    };
    const targetUrl = AxiosApi.rewrite(url);

    return this.requestProcess(axios.get<T>(targetUrl, config), targetConfig);
  }

  delete(url: string, config: Config = {}): AxiosPromise {
    //
    const targetConfig = {
      ...AxiosApi.configure(config, url),
      ...config,
    };
    const targetUrl = AxiosApi.rewrite(url);

    return this.requestProcess(axios.delete(targetUrl, config), targetConfig);
  }

  post<T = any>(url: string, data?: any, config: Config = {}): AxiosPromise<T> {
    //
    const targetConfig = {
      ...AxiosApi.configure(config, url),
      ...config,
    };
    const targetUrl = AxiosApi.rewrite(url);

    return this.requestProcess(axios.post<T>(targetUrl, data, config), targetConfig);
  }

  put<T = any>(url: string, data?: any, config: Config = {}): AxiosPromise<T> {
    //
    const targetConfig = {
      ...AxiosApi.configure(config, url),
      ...config,
    };
    const targetUrl = AxiosApi.rewrite(url);

    return this.requestProcess(axios.put<T>(targetUrl, data, config), targetConfig);
  }

  patch<T = any>(url: string, data?: any, config: Config = {}): AxiosPromise<T> {
    //
    const targetConfig = {
      ...AxiosApi.configure(config, url),
      ...config,
    };
    const targetUrl = AxiosApi.rewrite(url);

    return this.requestProcess(axios.patch<T>(targetUrl, data, config), targetConfig);
  }
}

AxiosApi.instance = new AxiosApi();
export { AxiosApi };
export default AxiosApi.instance;
