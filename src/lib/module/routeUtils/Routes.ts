import Route from './Route';


interface Routes {
  //
  [route: string]: (...params: any[]) => Route;
}

export default Routes;
