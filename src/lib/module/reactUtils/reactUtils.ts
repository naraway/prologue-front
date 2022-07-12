import { IReactComponent, IWrappedReactComponent } from '@nara-way/accent';
import hoistNonReactStatic from 'hoist-non-react-statics';


const reactUtils = {
  //
  getDisplayName(Component: IReactComponent) {
    //
    return Component.displayName || Component.name || 'Component';
  },

  copyWrappedComponent(TargetComponent: IReactComponent, BaseComponent: IReactComponent): IWrappedReactComponent {
    //
    hoistNonReactStatic(TargetComponent, BaseComponent);

    (TargetComponent as any).displayName = `${(TargetComponent as any).name}(${reactUtils.getDisplayName(BaseComponent)})`;
    (TargetComponent as any).wrappedComponent = BaseComponent;
    (TargetComponent as any).__docgenInfo = (BaseComponent as any).__docgenInfo;

    return TargetComponent as IWrappedReactComponent;
  },
};

export default reactUtils;
