import { IReactComponent, IWrappedReactComponent } from '@nara-way/accent';
import React, { Component, ContextType } from 'react';
import reactUtils from '../../reactUtils';
import { RoleContext } from '../RoleProvider';
import { DramaRolesEventListener } from '../WithDramaRoles';


const withDramaRoles = <TProps extends {}>(ReactComponent: IReactComponent<TProps>, drama: string, roles: string[]): IWrappedReactComponent<Omit<TProps, 'drama' | 'actor' | 'roles' | 'allowed'>> => {
  //
  class WithDramaRolesService extends Component<TProps> {
    //
    static contextType = RoleContext;
    // @ts-ignore
    context!: ContextType<typeof RoleContext>;

    private allowed = false;

    private listener: DramaRolesEventListener = {
      allowed: () => {
      },
      denied: (requiredRoles: string[]) => {
      },
    };

    componentDidMount() {
      //
      this.init();
    }

    private init() {
      this.authorize();
    }

    private authorize() {
      //
      if (this.has(...roles)) {
        this.onAllowed();
      } else {
        this.onDenied(roles);
      }
    }

    private onAllowed() {
      //
      this.allowed = true;
      this.forceUpdate();

      const { allowed: onAllowed } = this.listener;

      if (onAllowed) {
        onAllowed();
      }
    }

    private onDenied(requiredRoles: string[]) {
      //
      const { denied: onDenied } = this.listener;

      if (onDenied) {
        onDenied(requiredRoles);
      }
    }

    private getActiveRoles() {
      //
      if (!this.context) {
        return [];
      }

      const roles = this.context.dramaRoles;

      return roles.filter(item => item.startsWith(`${drama}:`)).map(role => role.substring(role.indexOf(':') + 1));
    }

    private getActiveActor() {
      //
      if (!this.context) {
        return undefined;
      }

      const { actor } = this.context;

      return actor;
    }

    private has(...roles: string[]) {
      //
      if (!roles || roles.length === 0) {
        return true;
      }

      return !!this.getActiveRoles().find(role => roles.includes(role));
    }

    private setEventListener(listner: DramaRolesEventListener) {
      //
      if (listner && listner.allowed) {
        this.listener.allowed = listner.allowed;
      }
      if (listner && listner.denied) {
        this.listener.denied = listner.denied;
      }
    }

    render() {
      //
      return (
        <ReactComponent
          drama={drama}
          actor={this.getActiveActor()}
          roles={{
            get: () => this.getActiveRoles.bind(this)(),
            has: (...roles: string[]) => this.has.bind(this)(...roles),
            on: (listener: DramaRolesEventListener) => this.setEventListener.bind(this)(listener),
          }}
          allowed={this.allowed}
          {...this.props}
        />
      );
    }
  }

  return reactUtils.copyWrappedComponent(WithDramaRolesService, ReactComponent);
};


/**
 * Class decorator for drama ReactComponent
 * @param drama
 * @param roles
 */
function drama(
  drama: string,
  roles: string[],
): (ReactComponent: any) => any {
  //
  return (ReactComponent) =>
    withDramaRoles(ReactComponent, drama, roles);
}

export default withDramaRoles;
export { drama };
