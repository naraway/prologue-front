import AppContextContext from './AppContext';
import AppContextProvider from './AppContextProvider';

export * from './model';

type AppContextComponent = {
  Context: typeof AppContextContext;
  Provider: typeof AppContextProvider;
}

const AppContext = {} as AppContextComponent;

AppContext.Context = AppContextContext;
AppContext.Provider = AppContextProvider;

export default AppContext;
