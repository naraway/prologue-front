import { InvalidParamsException } from '@nara-way/accent';
import CookieStorage from './CookieStorage';


type Parser<T> = (json: any) => T;

type LoadParser<T> =
  T extends string ? StringConstructor :
    T extends number ? NumberConstructor :
      T extends boolean ? BooleanConstructor :
        ObjectConstructor | Parser<T>;

enum StorageType {
  SessionStorage = 'sessionStorage',
  LocalStorage = 'localStorage',
  Cookie = 'cookie',
}

class WebStorage<T extends object | string | number | boolean> {
  //
  static baseKey: string = 'nara';

  key: string;
  private readonly storageType: StorageType;
  private readonly loadParser?: LoadParser<T>;


  constructor(storageType: StorageType, key: string, loadParser?: LoadParser<T>) {
    //
    this.storageType = storageType;
    this.key = WebStorage.createKey(key);
    this.loadParser = loadParser;
  }

  static newLocal<T extends object | string | number | boolean>(key: string, loadParser?: LoadParser<T>) {
    //
    return new WebStorage<T>(StorageType.LocalStorage, key, loadParser);
  }

  static newSession<T extends object | string | number | boolean>(key: string, loadParser?: LoadParser<T>) {
    //
    return new WebStorage<T>(StorageType.SessionStorage, key, loadParser);
  }

  static newCookie<T extends object | string | number | boolean>(key: string, loadParser?: LoadParser<T>) {
    //
    return new WebStorage<T>(StorageType.Cookie, key, loadParser);
  }

  static newWithoutBaseKey<T extends object | string | number | boolean>(storageType: StorageType, key: string) {
    //
    const storage = new WebStorage<T>(storageType, key);

    storage.key = key;
    return storage;
  }

  static createKey(key: string): string {
    //
    return WebStorage.baseKey ? `${WebStorage.baseKey}.${key}` : key;
  }

  getStorage(): Storage {
    //
    if (this.storageType === 'sessionStorage' || this.storageType === 'localStorage') {
      return window[this.storageType];
    } else {
      return new CookieStorage();
    }
  }

  save(value: T): void {
    //
    const storage = this.getStorage();
    let convertedValue: string;

    if (typeof value === 'string' && this.loadParser !== String) {
      throw new InvalidParamsException('WebStorage.save', `value is string type, but loadParser is not String. The value or loadParser is wrong -> key: ${this.key}, value: ${value}, loadParser: ${this.loadParser}`);
    }

    if (this.loadParser === String) {
      if (typeof value !== 'string') {
        throw new InvalidParamsException('WebStorage.save', `value, it must be string type -> key: ${this.key} value: ${value}`);
      } else {
        convertedValue = value;
      }
    } else {
      convertedValue = JSON.stringify(value);
    }

    storage.setItem(this.key, convertedValue);
  }

  /**
   * @deprecated
   * @param value
   */
  saveAsString(value: string): void {
    //
    const storage = this.getStorage();

    storage.setItem(this.key, value);
  }

  load(): T | null {
    //
    const itemJson = this.getStorage().getItem(this.key);

    if (!itemJson) {
      return null;
    }

    if (this.loadParser === String) {
      return itemJson as T;
    }

    const itemObj = JSON.parse(itemJson);

    if (this.loadParser) {
      return this.loadParser(itemObj);
    } else {
      return itemObj;
    }
  }

  /**
   * @deprecated
   */
  loadAsString(): string | null {
    //
    return this.getStorage().getItem(this.key);
  }

  remove(): void {
    //
    this.getStorage().removeItem(this.key);
  }
}

export default WebStorage;
