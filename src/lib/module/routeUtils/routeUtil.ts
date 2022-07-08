import Route from './Route';


interface Param {
  name: string;
  value: string;
}

export function create(path: string, ...params: Param[]): Route {
  //
  let pathWithParams = `${path}`;

  if (params) {
    params.map((param) => {
      pathWithParams += `&${param.name}=${param.value}`;
    });
  }

  return {
    href: pathWithParams,
    as: pathWithParams,
  };
}

export function createForDynamic(url: string, path: string, ...params: Param[]): Route {
  //
  let pathWithParams = `${path}`;

  if (params) {
    params.map((param) => {
      pathWithParams += `&${param.name}=${param.value}`;
    });
  }

  return {
    href: url,
    as: pathWithParams,
  };
}
