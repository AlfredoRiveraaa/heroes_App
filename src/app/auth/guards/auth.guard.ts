import { inject } from '@angular/core';
import { 
  CanActivateFn, 
  CanMatchFn, 
  Router, 
  Route, 
  UrlSegment, 
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';


import { AuthService } from '../services/auth.service'; 

/**
 * Guard para CAN ACTIVATE (CanActivateFn):
 * Decide si se puede NAVEGAR a una ruta (mostrar un componente).
 */
export const authGuard: CanActivateFn = (route, state): 
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const authService = inject(AuthService);
  const router = inject(Router);

  
  if (authService.auth.id) {
    return true; // Sí puede navegar a la ruta
  }

  
  console.log('Bloqueado por el AuthGuard - CanActivate');
  
  // MEJORA: En lugar de 'return false', redirigimos al login
  return router.createUrlTree(['/login']); 
};

/**
 * Guard para CAN MATCH (CanMatchFn):
 * Decide si un módulo (lazy loading) se puede DESCARGAR.
 * Este es el reemplazo moderno de 'CanLoad'.
 */
export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]): 
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  
  if (authService.auth.id) {
    return true; // Sí puede descargar el módulo
  }
  
  console.log('Bloqueado por el AuthGuard - CanMatch (CanLoad)');
  
  // MEJORA: En lugar de 'return false', redirigimos al login
  return router.createUrlTree(['/login']);
};