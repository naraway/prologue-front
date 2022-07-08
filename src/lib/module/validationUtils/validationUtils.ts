interface ValidationResultModel<K> {
  valid: boolean;
  invalidKeys: K[];
}

const validationUtils = {
  //
  checkNullableParams<T, K extends keyof T>(object: T, keys: K[]): any {
    //

    const objectWithNonNullParams = {} as T;

    if (!object) {
      throw new Error('CdoException - cdo parameter is required');
    }

    keys.map(key => {
      const attr = object[key];

      if (attr === null || attr === undefined || (typeof attr === 'string' && attr === '')) {
        throw new Error('CdoException - ' + key + ' is required');
      }

      objectWithNonNullParams[key] = attr as T[K];
    });

    return objectWithNonNullParams;
  },

  checkEmpty<T, K extends keyof T>(object: T, keys: K[]): ValidationResultModel<K> {
    //
    const result = {
      valid: true,
      invalidKeys: [],
    } as ValidationResultModel<K>;

    keys.map(key => {
      const attr = object[key];

      if (!attr || (typeof key === 'string' && !String(attr).trim())) {
        result.valid = false;
        result.invalidKeys.push(key);
      }
    });

    return result;
  },

  checkPrimitiveParams(params: string[], paramNames: string[]) {
    //
    const objectWithNonNullParams = {} as any;

    params.map((param, index) => {
      if (!param) {
        throw new Error('CdoException - ' + param + ' is required');
      }

      const paramName = paramNames[index];

      objectWithNonNullParams[paramName] = param;
    });

    return objectWithNonNullParams;
  },
};

export default validationUtils;
