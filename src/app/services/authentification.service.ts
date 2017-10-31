import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { REST } from "./../ressources/rest.constants";

@Injectable()
export class Authentification implements CanActivate {

  // VARIABLES
  loggedIn: boolean = false;
  authHeaders: Headers; //headers pour authentifier les requetes
  redirectUrl: string; //url de provenance de l'utilisateur
  eventLoggedIn: EventEmitter<boolean>; //evenement quand l'user se log

  // CONSTRUCTEUR
  constructor(private http: Http, private router: Router) {
    this.eventLoggedIn = new EventEmitter<boolean>();
    this.authHeaders = new Headers();
  }

  // FONCTIONS
  /**
   * @desc Tente de logger l'utilisateur.
   * @param {string} user - Identifiant de l'utilisateur.
   * @param {string} mdp - Mot de passe.
   */
  login(user: string, mdp: string) {
    this.http.get(REST.urlServerLocal + "/authent?user=" + user + "&mdp=" + mdp)
      .subscribe((res) => {
        this.loggedIn = true;
        this.authHeaders.append("authorization", btoa(user + mdp)); //cree le header avec les informations valides
        this.eventLoggedIn.emit(true);
      }, (err) => {
        this.eventLoggedIn.emit(false);
      });
  }

  /**
   * @desc Fonction de garde pour empecher l'acces aux personnes non loggees.
   * Redirige vers la page de login.
   *
   * @param {ActivatedRouteSnapshot} route - La route a proteger.
   * @param {RouterStateSnapshot} state - L'etat duquel on vient.
   * @returns {boolean} Vrai si on peut naviguer, faux sinon.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loggedIn) {
      return true;
    } else {
      this.redirectUrl = state.url;
      this.router.navigate(["/login"]);
      return false;
    }
  }

}
