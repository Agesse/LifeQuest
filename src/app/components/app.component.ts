import { Component } from "@angular/core";
import { STRINGS } from "../ressources/strings.constants";
import { Authentification } from "../services/authentification.service";

@Component({
  selector: "app",
  templateUrl: "./../templates/app.component.html"
})

// Composant principal de l'application
export class AppComponent {

  // VARIABLES
  loggedIn: boolean;
  STRINGS = STRINGS;

  // CONSTRUCTEUR
  constructor(private authentification: Authentification) {
    this.loggedIn = authentification.loggedIn;
    authentification.eventLoggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
  }
}
