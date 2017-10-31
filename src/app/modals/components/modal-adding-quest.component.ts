import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

import { STRINGS } from "./../../ressources/strings.constants";
import { Quest } from "./../../classes/quest";
import { Objective } from "./../../classes/objective";

@Component({
  selector: "modal-adding-quest",
  templateUrl: "./../templates/modal-adding-quest.component.html"
})
export class ModalAddingQuest {

  // VARIABLES
  STRINGS = STRINGS; //constantes des textes
  newQuest: Quest; //nouvelle quete rentree
  warningMessage: string; //message de warning a utiliser
  isWarningState = false; //y a-t-il un warning a afficher ?


  // CONSTRUCTEUR
  constructor(public dialog: MdDialogRef<ModalAddingQuest>, @Inject(MD_DIALOG_DATA) public data: any) {
    this.newQuest = new Quest();
  }


  // FONCTIONS
	/**
	 * @desc Envoie la nouvelle quete quand le bouton submit est appuye et ferme la modale.
	 */
  onSubmit() {
    this.dialog.close(this.newQuest);
  }

	/**
	 * @desc Supprime un objectif.
	 * @param {number} i - Index de l'objectif a supprimer.
	 */
  delObjective(i: number) {
    this.newQuest.objectives.splice(i, 1);
  }


	/**
	 * @desc Ajoute un nouvel objectif avec en description la valeur de l'input.
	 * @param {string} inputValue - Valeur de l'input.
	 */
  addObjective(inputValue: string) {
    this.isWarningState = false; // reset l'etat de warning

    // SI : input non vide
    if (inputValue) {
      // check si l'objectif existe deja
      for (let obj of this.newQuest.objectives) {
        // SI : objectif deja present, met un warning
        if (inputValue === obj.descr) {
          this.isWarningState = true;
          this.warningMessage = this.STRINGS.warningSameObjective;
        }
      }
      // SINON : ajoute l'objectif
      if (!this.isWarningState) {
        let objectif = new Objective();
        objectif.descr = inputValue;
        this.newQuest.objectives.push(objectif);
      }
    }
    // SINON : input vide, met un warning
    else {
      this.isWarningState = true;
      this.warningMessage = this.STRINGS.warningEmptyObjective;
    }
  }
}
