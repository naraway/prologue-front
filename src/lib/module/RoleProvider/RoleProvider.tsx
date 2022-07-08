import React, { PropsWithChildren } from 'react';
import ReactComponent from '../ReactComponent';


export interface ContextRole {
  actor: string;
  stageRoles: string[];
  taskRoles: string[];
  dramaRoles: string[];
}

export const RoleContext = React.createContext<ContextRole | undefined>({
  actor: '',
  stageRoles: [],
  taskRoles: [],
  dramaRoles: [],
});

interface Props {
  role: ContextRole;
}

export class RoleProvider extends ReactComponent<PropsWithChildren<Props>> {
  //
  render() {
    //
    const { role, children } = this.props;

    return (
      <RoleContext.Provider value={role}>
        {children}
      </RoleContext.Provider>
    );
  }
}

export default RoleProvider;
