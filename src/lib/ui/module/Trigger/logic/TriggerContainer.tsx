import React, { PropsWithChildren, ReactNode } from 'react';
import { autobind } from '~/lib/decorator';

import TriggerContextModel from '../model/TriggerContextModel';
import TriggerContext from '../sub/TriggerContext/TriggerContext';


interface Props {
  element: React.ReactElement;
  toggle?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  onOpen?: (event: React.SyntheticEvent, ...params: any[]) => void;
  onClose?: (event: React.SyntheticEvent, ...params: any[]) => void;
}

interface State {
  open: boolean;
}


@autobind
class TriggerContainer extends React.Component<PropsWithChildren<Props>> {
  //
  static defaultProps = {
    toggle: false,
    onClick: () => {
    },
    onOpen: () => {
    },
    onClose: () => {
    },
  };

  state: State = {
    open: false,
  };


  getContext(): TriggerContextModel {
    //
    const { open } = this.state;

    return {
      open,
      onOpen: this.onOpen,
      onClose: this.onClose,
    };
  }

  onClick(event: React.MouseEvent) {
    //
    event.stopPropagation();

    const { toggle, onClick } = this.props;
    const { open } = this.state;

    onClick!(event);

    if (toggle && open) {
      this.onClose(event);
    } else if (!open) {
      this.onOpen(event);
    }
  }

  onOpen(event: React.SyntheticEvent) {
    //
    this.props.onOpen!(event);
    this.setState({ open: true });
  }

  onClose(event: React.SyntheticEvent) {
    //
    this.props.onClose!(event);
    this.setState({ open: false });
  }

  renderChildren(value: TriggerContextModel) {
    //
    const { children } = this.props;

    let targetChildren: React.ReactNode = children;

    if (typeof children === 'function') {
      // @ts-ignore
      targetChildren = children(value);
    }

    return targetChildren;
  }

  render() {
    //
    const { element } = this.props;

    return (
      <TriggerContext.Provider value={this.getContext()}>
        <span onClick={this.onClick}>
          {element}
        </span>

        <TriggerContext.Consumer>
          {this.renderChildren}
        </TriggerContext.Consumer>
      </TriggerContext.Provider>
    );
  }
}

export default TriggerContainer;
