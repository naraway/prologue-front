import Cookies from 'universal-cookie';


class CookieStorage implements Storage {
  //
  cookies = new Cookies();

  getterConfig = {
    doNotParse: true,
  };


  getItem(key: string): string | null {
    //
    return this.cookies.get(key, this.getterConfig);
  }

  setItem(key: string, value: string): void {
    //
    this.cookies.set(key, value, { path: '/' });
  }

  removeItem(key: string): void {
    //
    // cookie.delete(key);
    this.cookies.remove(key, { path: '/' });
  }

  /**
   * Not implemented
   */
  get length(): number {
    //
    return this.cookies.getAll(this.getterConfig).length;
  }

  /**
   * Not implemented
   * @param index
   */
  key(index: number): string | null {
    //
    throw new Error('Not implemented');
  }

  /**
   * Not implemented
   */
  clear(): void {
    //
    throw new Error('Not implemented');
  }
}

export default CookieStorage;
