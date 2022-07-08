import { NavBreadcrumbModel } from '~/lib/model';
import { default as AppContextType } from './AppContextType';
import { default as Settings } from './Settings';


interface AppContextModel {
  //
  breadcrumb: AppContextType<NavBreadcrumbModel[]>;
  settings: AppContextType<Settings>;
}

export default AppContextModel;
