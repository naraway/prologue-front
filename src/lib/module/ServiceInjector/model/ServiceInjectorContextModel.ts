import { Constructor } from '@nara/accent';
import ServiceModel from './ServiceModel';


interface ServiceInjectorContextModel {
  //
  serviceInjector: {
    services: ServiceModel[];
    getUsableServices: (targetServices: Constructor[]) => ServiceModel[];
  };
}

export default ServiceInjectorContextModel;
