import { NaraException } from '@nara/accent';
import { Component } from 'react';


/**
 * React.Component를 확장 한 React base 컴포넌트 입니다.
 * 클래스 유형 컴포넌트에 extends 하여 사용합니다.
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
