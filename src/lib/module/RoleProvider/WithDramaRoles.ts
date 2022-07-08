export interface DramaRolesEventListener {
  allowed?: () => void;
  denied?: (requiredRoles: string[]) => void;
}

interface DramaRoles {
  get: () => string[];
  has: (...roles: string[]) => boolean;
  on: (listener: DramaRolesEventListener) => void;
}

export interface WithDramaRoles {
  //
  drama: string;
  actor: string;
  roles: DramaRoles;
  allowed: boolean;
}

export { default as withDramaRoles, drama } from './module/withDramaRoles';
