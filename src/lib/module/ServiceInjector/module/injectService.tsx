import { inject } from 'mobx-react';
import { ComponentType } from 'react';

import reactUtils from '../../reactUtils';
import ServiceModel from '../model/ServiceModel';


const injectService = (services: ServiceModel[]) => <TProps extends {}>(ReactComponent: ComponentType<TProps>): ComponentType<TProps> => {
  //
  const injected = inject((store: any) =>
    services.reduce((prev, service) => ({
      ...prev,
      [service.serviceName]: store[service.instanceName],
    }), {}),
  )(ReactComponent);

  reactUtils.copyWrappedComponent(injected, ReactComponent);
  return injected;
};

export default injectService;
