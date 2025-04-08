import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/entities/user.entiti';
  // Asegúrate de tener el enum importado

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);