import { isObservableArray, observable } from 'mobx';

/**
 * @deprecated
 * @param target
 * @param propertyKey
 */
const observableArray: any = (target: any, propertyKey: string) => {
  //
  const innerPropertyKey = `_${propertyKey}`;

  const computedDescriptor: any = {
    configurable: true,
    get() {
      const isObservable = isObservableArray(this[innerPropertyKey]);
      const innerPropertyValue = this[innerPropertyKey];

      if (isObservable) {
        return innerPropertyValue.slice();
      } else {
        return innerPropertyValue || [];
      }
    },
    set(value: any[]) {
      this[innerPropertyKey] = value;
    },
  };

  observable(target, innerPropertyKey);

  delete target[propertyKey];
  Object.defineProperty(target, propertyKey, computedDescriptor);
  Object.defineProperty(target, innerPropertyKey, { configurable: true, value: [] });

  return computedDescriptor;
};

export default observableArray;
