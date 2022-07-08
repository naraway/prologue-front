import useContext from './module/useContext';
import withContext from './module/withContext';
import withService from './module/withService';


type ServiceInjectorType = {
  with: typeof withService;
  withContext: typeof withContext;
  useContext: typeof useContext;
};

const ServiceInjector: ServiceInjectorType = {
  with: withService,
  withContext,
  useContext,
};

export default ServiceInjector;
