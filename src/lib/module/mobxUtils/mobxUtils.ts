import { Constructor, NaraException } from '@nara/accent';


const mobxUtils = {
  //
  injectFromName(...serviceNames: string[]) {
    //
    return (stores: any) => {
      //
      const willInjected: any = {};

      serviceNames.map(serviceName => {
        //
        let current = { ...stores };
        const nameSpaces = serviceName.split('.');

        nameSpaces.map((nameSpace: string, index: number) => {
          //
          const isLast = index === nameSpaces.length - 1;
          const next = current[nameSpace];

          if (!current || !next) {
            console.error('Exception stores ->', stores);
            throw new NaraException('injectFromName', `Store '${serviceName}' is not available! Make sure it is provided by some Provider`);
          } else if (isLast) {
            willInjected[nameSpace] = next;
          }

          current = next;
        });

      });

      return willInjected;
    };
  },

  injectFromNamespace(namespace: string, serviceNames: string[]) {
    //
    return (stores: any) => {
      //
      const willInjected: any = {};

      serviceNames.map(serviceName => {
        //
        let current = { ...stores };

        current = current[namespace];

        if (!current) {
          console.error('Exception stores ->', stores);
          throw new NaraException('mobxUtils', `Store '${namespace}.${serviceName}' is not available! Make sure it is provided by some Provider`);
        }

        const serviceNamespaces = serviceName.split('.');

        serviceNamespaces.map((serviceNamespace: string, index: number) => {
          //
          const isLast = index === serviceNamespaces.length - 1;

          if (!current) {
            console.error('Exception stores ->', stores);
            throw new NaraException('mobxUtils', `Store '${serviceName}' is not available! Make sure it is provided by some Provider`);
          }

          if (isLast) {
            willInjected[serviceNamespace] = current[serviceNamespace];
          }

          current = current[serviceNamespace];
        });

      });

      return willInjected;
    };
  },

  /**
   * @deprecated Use import { makeExtendedObservable } from '@nara.platform/acdent';
   * @param Model
   * @param targetPropertyNames
   */
  decorateObservable<T>(Model: Constructor<T>, targetPropertyNames?: (keyof T)[]) {
    //
    let propertyNames: any[];

    if (targetPropertyNames) {
      propertyNames = targetPropertyNames;
    } else {
      try {
        propertyNames = Object.getOwnPropertyNames(new Model());
      } catch (e) {
        throw new NaraException('mobxUtils.decorateObservable', `Something is wrong with the default constructor -> ${Model.name} - ${e}`);
      }
    }

    console.log('4. decorate', propertyNames);

    // const decorators = propertyNames.reduce((prev, propertyName) => ({
    //   ...prev,
    //   [propertyName]: observable,
    // }), {});

    // decorate(Model, decorators);
  },

  getNotNull<T>(exception: Error, type: Constructor<T>, object: any): T {
    //
    if (!object) {
      throw exception;
    }
    return object;
  },
};

export default mobxUtils;
