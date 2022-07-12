import { Constructor, IReactComponent, IWrappedReactComponent } from '@nara-way/accent';
import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import reactUtils from '../../reactUtils';
import ServiceInjectorContext from '../context/ServiceInjectorContext';
import ServiceModel from '../model/ServiceModel';
import injectService from './injectService';


const withContext = (...ServiceTypes: Constructor[]) =>
  <TProps extends {}>(ReactComponent: IReactComponent<TProps>): IWrappedReactComponent<TProps> => {
    //
    class WithContextService extends Component<TProps> {
      //
      services: ServiceModel[];
      instances: Object[];

      InjectedComponent: IReactComponent<TProps>;


      constructor(props: TProps) {
        //
        super(props);

        this.services = ServiceModel.newServices(ServiceTypes);
        this.instances = ServiceModel.newServiceInstances(ServiceTypes);
        this.InjectedComponent = injectService(this.services)(ReactComponent);
      }

      getContext = () => ({
        //
        serviceInjector: {
          services: this.services,
          getUsableServices: this.getUsableServices,
        },
      });

      getUsableServices = (TargetServiceTypes: Constructor[]): ServiceModel[] => (
        //
        this.services.filter((service: ServiceModel) =>
          TargetServiceTypes.some(TargetServiceType =>
            service.serviceName === ServiceModel.getServiceName(TargetServiceType),
          ),
        )
      );

      getStore = () => (
        //
        this.services.reduce((prev, service, index) => ({
          ...prev,
          [service.instanceName]: this.instances[index],
        }), {})
      );

      render() {
        //
        const InjectedComponent = this.InjectedComponent;

        return (
          <ServiceInjectorContext.Provider
            value={this.getContext()}
          >
            <Provider
              {...this.getStore()}
            >
              <InjectedComponent
                {...this.props}
              />
            </Provider>
          </ServiceInjectorContext.Provider>
        );
      }
    }

    return reactUtils.copyWrappedComponent(WithContextService, ReactComponent);
  };


export default withContext;
