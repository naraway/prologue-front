import { Constructor, TypeException } from '@nara-way/accent';
import { runInAction } from 'mobx';


class ServiceModel {
  //
  serviceName = '';

  instanceName = '';


  constructor(serviceName: string, instanceName: string) {
    //
    this.serviceName = serviceName;
    this.instanceName = instanceName;
  }

  static newServices(ServiceTypes: Constructor[]): ServiceModel[] {
    //
    return ServiceTypes.map(ServiceType => ServiceModel.newService(ServiceType));
  }

  static newService(ServiceType: Constructor): ServiceModel {
    //
    const serviceName = this.getServiceName(ServiceType);
    const instanceName = `${serviceName}-`;
    // const instanceName = `${serviceName}-${this.uuidv4()}`;

    return new ServiceModel(serviceName, instanceName);
  }

  // fixme
  // static uuidv4() {
  //   // @ts-ignore
  //   return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
  //     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  //   );
  // }

  static newServiceInstances(ServiceTypes: Constructor[]): Object[] {
    //
    return ServiceTypes.map(ServiceType =>
      runInAction(() => new ServiceType()),
    );
  }

  static getServiceName(ServiceType: Constructor) {
    //
    const instanceName = (ServiceType as any).instanceName;

    if (!instanceName) {
      throw new TypeException('ServiceInjector', 'Mobx service must use the @mobxService and define static instanceName');
    }
    return instanceName;
  }
}

export default ServiceModel;
