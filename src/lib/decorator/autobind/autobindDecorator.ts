/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
export function boundMethod(...arg: any[]) {
  const target = arg[0];
  const key = arg[1];
  const descriptor = arg[2];
  let fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new TypeError(`@boundMethod decorator can only be applied to methods not: ${typeof fn}`);
  }

  // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.
  let definingProperty = false;

  return {
    configurable: true,
    get() {
      // eslint-disable-next-line no-prototype-builtins
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key)
        || typeof fn !== 'function') {
        return fn;
      }

      const boundFn = fn.bind(this);

      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get() {
          return boundFn;
        },
        set(value) {
          fn = value;
          delete this[key];
        },
      });
      definingProperty = false;
      return boundFn;
    },
    set(value: any) {
      fn = value;
    },
  };
}

const excludedReactMethods = [
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'render',
  'getSnapshotBeforeUpdate',
  'componentDidMount',
  'componentWillReceiveProps',
  'UNSAFE_componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'UNSAFE_componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'componentDidCatch',
  'setState',
  'forceUpdate',
];

/**
 * Use boundMethod to bind all methods on the target.prototype
 */
export function boundClass(target: any) {
  // (Using reflect to get all keys including symbols)
  let keys;

  // check null
  if (!target || !target.prototype) {
    return;
  }

  // Use Reflect if exists
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype);
    // Use symbols if support is provided
    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = (keys as any[]).concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.map((key: any) => {
    // Ignore special case target method
    if (key === 'constructor' || excludedReactMethods.some((method) => method === key)) {
      return;
    }

    const descriptor: any = Object.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}

export default function autobind(...args: any[]) {
  if (args.length === 1) {
    return boundClass(args[0]);
  }
  return boundMethod(...args);
}
