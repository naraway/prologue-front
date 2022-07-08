import { Constructor, IReactComponent, IWrappedReactComponent } from '@nara/accent';
import React, { Component } from 'react';
import reactUtils from '../../reactUtils';
import ServiceModel from '../model/ServiceModel';


const withService = (...ServiceTypes: Constructor[]) =>
  <TProps extends {}>(ReactComponent: IReactComponent<TProps>): IWrappedReactComponent<TProps> => {
    //
    class WithService extends Component<TProps> {
      //
      services = ServiceModel.newServices(ServiceTypes);
      instances = ServiceModel.newServiceInstances(ServiceTypes);


      getServiceProps = () => (
        //
        this.services.reduce((prev, service, index) => ({
          ...prev,
          [service.serviceName]: this.instances[index],
        }), {})
      );

      render() {
        //
        return (
          <ReactComponent
            {...this.props}
            {...this.getServiceProps()}
          />
        );
      }
    }

    return reactUtils.copyWrappedComponent(WithService, ReactComponent);
  };

export default withService;
