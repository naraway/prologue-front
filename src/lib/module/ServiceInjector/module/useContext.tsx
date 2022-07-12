import { Constructor, IReactComponent, IWrappedReactComponent } from '@nara-way/accent';
import React, { Component, ContextType } from 'react';
import reactUtils from '../../reactUtils';
import ServiceInjectorContext from '../context/ServiceInjectorContext';

import ServiceModel from '../model/ServiceModel';
import injectService from './injectService';


const useContext = (...ServiceTypes: Constructor[]) => {
  return <TProps extends {}>(ReactComponent: IReactComponent<TProps>): IWrappedReactComponent<TProps> => {
    //
    class UseContextService extends Component<TProps> {
      //
      static contextType = ServiceInjectorContext;

      // @ts-ignore
      context!: ContextType<typeof ServiceInjectorContext>;


      render() {
        //
        const { serviceInjector } = this.context;
        const usableServices: ServiceModel[] = serviceInjector.getUsableServices(ServiceTypes);
        const InjectedService = injectService(usableServices)(ReactComponent);

        return (
          <InjectedService
            {...this.props}
          />
        );
      }
    }

    return reactUtils.copyWrappedComponent(UseContextService, ReactComponent);
  };
};

export default useContext;
