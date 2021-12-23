import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad ,CanActivate{
  caminar! : string;

  constructor( private authService : AuthService,
              private router : Router ){
    // this.caminar = "a"
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      //? ACTIVAR EL MODULO A PESAR DE QUE YA ESTE CARGADO
      //   if(this.authService.auth.id){
        //     return true 
        //   }
        // return false;
        
      return this.authService.verificaAutenticacion()
              .pipe(
                tap(  estaAutenticado =>{
                  if( !estaAutenticado ){
                    this.router.navigate(['./auth/login'])
                  }
                } )
              )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean > | boolean  { 

      //? NO CARGA EL MODULO, PERO CUANDO YA ESTE CARGADO NO AYUDA
      //   if(this.authService.auth.id){
      //     return true
      //   }
      // return false;

      return this.authService.verificaAutenticacion()
              .pipe(
                tap(  estaAutenticado =>{
                  if( !estaAutenticado ){
                    this.router.navigate(['./auth/login'])
                  }
                } )
              )

 

  }
}
