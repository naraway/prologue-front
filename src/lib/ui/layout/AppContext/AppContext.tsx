import React from 'react';
import AppContextModel from './model/AppContextModel';


const AppContext = React.createContext<AppContextModel>({
  breadcrumb: {
    value: [],
    setValue: () => {
    },
  },
  settings: {
    value: {},
    setValue: () => {
    },
  },
});

export default AppContext;
