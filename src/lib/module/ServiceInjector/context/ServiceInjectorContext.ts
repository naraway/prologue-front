import React from 'react';
import ServiceInjectorContextModel from '../model/ServiceInjectorContextModel';


const ServiceInjectorContext = React.createContext<ServiceInjectorContextModel>({
  serviceInjector: {
    services: [],
    getUsableServices: () => [],
  },
});

export default ServiceInjectorContext;
