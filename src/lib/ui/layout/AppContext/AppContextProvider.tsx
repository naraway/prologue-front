import React, { PropsWithChildren } from 'react';

import { autobind } from '~/lib/decorator';
import { ReactComponent, ServiceInjector } from '~/lib/module';
import NavBreadcrumbModel from '../../../model/NavBreadcrumbModel';
import AppContext from './AppContext';
import AppContextModel from './model/AppContextModel';
import Settings from './model/Settings';
import SettingsService from './service/SettingsService';


interface Props {
}

interface State {
  breadcrumbValues: NavBreadcrumbModel[];
  settings: Settings;
}

interface Injected {
  settingsService: SettingsService;
}

@autobind
class AppContextProvider extends ReactComponent<PropsWithChildren<Props>, State, Injected> {
  //
  state: State = {
    breadcrumbValues: [],
    settings: {},
  };


  componentDidMount() {
    //
    const settings = this.injected.settingsService.findSettings();

    this.setState({
      settings: {
        ...settings,
      },
    });
  }

  getContext(): AppContextModel {
    //
    const { breadcrumbValues, settings } = this.state;

    return {
      breadcrumb: {
        value: breadcrumbValues,
        setValue: this.setContextBreadcrumb,
      },
      settings: {
        value: settings,
        setValue: this.setContextSettings,
      },
    };
  }

  setContextBreadcrumb(breadcrumbValues: NavBreadcrumbModel[]) {
    //
    this.setState({ breadcrumbValues });
  }

  setContextSettings(settings: Settings) {
    //
    const { settingsService } = this.injected;

    settingsService.saveSettings(settings);
    this.setState({ settings });
  }

  render() {
    //
    const { children } = this.props;

    return (
      <AppContext.Provider
        value={this.getContext()}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default ServiceInjector.with(SettingsService)(AppContextProvider);
