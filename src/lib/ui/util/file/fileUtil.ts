import { AxiosRequestConfig, Method } from 'axios';
import { axiosApi } from '~/lib/module';
import Extension from './Extension';
import FileType from './FileType';


export const BYTES_PER_CHUNK = 1024 * 1024 * 50; // 50 MB

export const EXTENSION_WHITELIST = 'bmp|jpg|png|jpeg|gif|wmv|wav|wma|mp3|aac|mp4|avi|mkv|wmv|mov|xlsx|xls|xlsm|ppt|pptx|pdf|doc|docx|hwp|zip';

export function fileSlice(file: File, maxSize: number = BYTES_PER_CHUNK) {
  const chunks: any[] = [];

  const size = file.size;

  let start = 0;
  let end = maxSize;

  while (start < size) {
    const chunk = file.slice(start, end);

    chunks.push(chunk);

    start = end;
    end = start + maxSize;
  }
  return chunks;
}

export function isAllowableSize(file: File) {
  return (file.size <= BYTES_PER_CHUNK);
}

export function getFileSize(bytes: number, decimals = 2) {
  if (bytes === 0) {
    return '0 B';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
}

export function getFileType(fileName: string): FileType | undefined {
  //
  const targetExtension = Object.entries(Extension).find(([ fileType, extension ]) =>
    fileName.toLowerCase().match(new RegExp('\\.(' + extension + ')$')));

  return targetExtension && targetExtension[0] as FileType;
}

export async function upload(url: string, chunk: any, params?: any) {
  //
  const formData = new FormData();

  formData.append('file', chunk);

  return axiosApi.post(url, formData,
    { headers: { 'Content-Type': 'multipart/form-data' }, params });
}

export function download(downloadPath: string) {
  const element = document.createElement('a');

  element.setAttribute('href', downloadPath);
  element.setAttribute('download', 'download');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export function downloadAsBlob(method: Method, url: string, data?: object, config?: AxiosRequestConfig) {
  //
  const downloadConfig: AxiosRequestConfig = {
    url,
    method,
    responseType: 'blob',
    ...config,
    data,
  };

  return axiosApi.request(downloadConfig)
    .then(({ data }: any) => new Blob([ data ]));
}

export function downloadPrivate(method: Method, url: string, data?: object, config?: AxiosRequestConfig) {
  //
  const downloadConfig: AxiosRequestConfig = {
    url,
    method,
    responseType: 'blob',
    ...config,
    data,
  };

  return axiosApi.request(downloadConfig)
    .then(({ headers, data }: any) => {
      const contentDisposition = headers['content-disposition'];
      const targetFileName = decodeURI(
        contentDisposition.includes('"') ?
          contentDisposition.split('"')[1].trim()
          : contentDisposition
            .substring(contentDisposition.indexOf('filename*=UTF-8\'\''))
            .replaceAll('filename*=UTF-8\'\'', ''),
      );
      const blob = new Blob([ data ]);

      // @ts-ignore
      if (window.navigator.msSaveBlob) {
        // @ts-ignore
        window.navigator.msSaveBlob(blob, targetFileName);
      } else {
        const fileURL = window.URL.createObjectURL(blob);
        const fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', targetFileName);
        fileLink.style.display = 'none';
        document.body.appendChild(fileLink);

        fileLink.click();
        document.body.removeChild(fileLink);
      }
    });
}

export function validateExtension(file: File, whitelist: (FileType | string)[] = [ EXTENSION_WHITELIST ]): boolean {
  //
  const fileName = file.name.toLowerCase();

  const matchExtension = whitelist.find((extension) =>
    fileName.match(new RegExp('\\.(' + extension + ')$')));

  return !!matchExtension;
}


export default {
  fileSlice,
  isAllowableSize,
  getFileSize,
  getFileType,
  upload,
  download,
  downloadPrivate,
  validateExtension,
  BYTES_PER_CHUNK,
  EXTENSION_WHITELIST,
};
