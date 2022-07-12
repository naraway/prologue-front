import { NaraException } from '@nara-way/accent';
import { Component } from 'react';


/**
 * Base component extended from React.Component.
 * This used for class based component.
 */
class ReactComponent<Props = {}, State = {}, InjectedProps = {}> extends Component<Props, State> {
  //
  private isDefaultPropsDefined(): boolean {
    //
    const defaultProps = (this.constructor as any).defaultProps;

    return defaultProps && Object.keys(defaultProps).length > 0;
  }

  get injected(): InjectedProps {
    //
    return this.props as any;
  }

  get propsWithDefault(): Required<Props> {
    //
    if (!this.isDefaultPropsDefined()) {
      throw new NaraException('ReactComponent', 'propsWithDefault, it must define defaultProps');
    }

    return this.props as Required<Props>;
  }
}

export default ReactComponent;
