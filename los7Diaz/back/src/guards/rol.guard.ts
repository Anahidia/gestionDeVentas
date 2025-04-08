import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
 // Asegúrate de tener el enum importado
import { ROLES_KEY } from '../decorators/roles.decorator'; // Importaremos un decorador para los roles más adelante
import { UserRole } from 'src/entities/user.entiti';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<UserRole[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true; // Si no se especifican roles, dejamos que pase
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Esto asume que el usuario está en el request (generalmente esto proviene del JWT)

    if (!user) {
      throw new ForbiddenException('Acceso denegado, no se ha encontrado el usuario');
    }

    const hasRole = requiredRoles.some(role => user.rol ? role === UserRole.ADMIN : role === UserRole.SELLER);

    if (!hasRole) {
      throw new ForbiddenException('No tienes permisos para acceder a esta ruta');
    }

    return true;
  }
}
