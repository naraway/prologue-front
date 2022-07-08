import { AxiosRequestConfig } from 'axios';


type RequestConfigType = AxiosRequestConfig & {
  resDataName?: string;
};

export default RequestConfigType;
