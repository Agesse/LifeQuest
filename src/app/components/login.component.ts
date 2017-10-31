import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Authentification } from "../services/authentification.service";

import { STRINGS } from "../ressources/strings.constants";

@Component({
  selector: 'login',
  templateUrl: "./../templates/login.component.html"
})

// Composant permettant de se logger sur l'application.
export class Login {

  // VARIABLES
  STRINGS = STRINGS;
  errorBadLogin: boolean = false; // permet l'affichage d'un message d'erreur
  user: string;
  mdp: string;

  // CONSTRUCTEUR
  constructor(private authService: Authentification, private router: Router) { }

  // FONCTIONS
  /**
   * @desc Lors de la validation du formulaire, envoi les informations au service d'authentification.
   * Si l'authentification est valide, redirige vers l'url d'origine si disponible, la page d'accueil sinon.
   * Sinon affiche un message d'erreur.
   */
  onSubmit() {
    this.errorBadLogin = false;
    this.authService.login(this.user, this.mdp);
    this.authService.eventLoggedIn.subscribe(loginValid => {
      if (loginValid) {
        this.authService.redirectUrl ? this.router.navigate([this.authService.redirectUrl]) : this.router.navigate(["/active-quests"]);
      } else {
        this.errorBadLogin = true;
      }
    })
  }

}
