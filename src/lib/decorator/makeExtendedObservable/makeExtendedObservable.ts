import { action, computed, makeObservable, observable } from 'mobx';


const excludedKeys = [
  'constructor',
];

export default function makeExtendedObservable<T extends Object>(targetInstance: T): void {
  //
  let keys;

  keys = Object.getOwnPropertyNames(targetInstance.constructor.prototype);
  keys.push(...Object.getOwnPropertyNames(targetInstance));
  keys = keys.filter(key => !excludedKeys.some((excludedKey) => excludedKey === key));

  const mobxAnnotations = keys.reduce((prev, key) => {
    //
    const descriptor = Object.getOwnPropertyDescriptor(targetInstance.constructor.prototype, key)
      || Object.getOwnPropertyDescriptor(targetInstance, key);

    if (!descriptor) {
      throw new Error('Something wrong...');
    }

    const isComputed = 'get' in descriptor;
    const isAction = typeof descriptor.value === 'function';

    if (isComputed) {
      return {
        ...prev,
        [key]: computed,
      };
    } else if (isAction) {
      return {
        ...prev,
        [key]: action.bound,
      };
    } else {
      return {
        ...prev,
        [key]: observable,
      };
    }
  }, {});

  makeObservable(targetInstance, mobxAnnotations);
}
