import { AxiosRequestConfig } from 'axios';


type Config = AxiosRequestConfig & {
  noAuth?: boolean;
  noCatch?: boolean;
}

export default Config;
