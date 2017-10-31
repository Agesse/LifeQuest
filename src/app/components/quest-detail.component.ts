import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { MdDialog } from "@angular/material";

import { ModalCompletingQuest } from "../modals/components/modal-completing-quest.component";
import { ModalDeletingQuest } from "../modals/components/modal-deleting-quest.component";
import { QuestService } from "../services/quest.service";

import { Quest } from "../classes/quest";
import { Objective } from "../classes/objective";
import { STRINGS } from "../ressources/strings.constants";


@Component({
  selector: 'quest-detail',
  templateUrl: "./../templates/quest-detail.component.html"
})
// Affichage du detail d'une quete
export class QuestDetail implements OnChanges {

  // VARIABLES
  @Input() quest: Quest; //quete a afficher
  @Output() reload = new EventEmitter<string>(); //evenement declanchant le rechargement de la liste
  completionRate = 0; //taux de completion de la quete
  STRINGS = STRINGS;


  // CONSTRUCTEUR
  constructor(private questService: QuestService, private mdDialog: MdDialog) { }


  // FONCTIONS
  ngOnChanges() {
    if (this.quest != null) {
      this.updateCompletion();
    }
  }

	/**
	 * @desc Passe a "completed" l'objectif selectionne si il n'est pas deja realise.
   * Si la quete devient completee, ouvre une modale contenant la description de la recompense,
   * et reload la liste sur le 1er item de la liste.
   * Sinon, reload la liste pour prendre en compte les changements et repositionne sur la quete.
	 * @param {Objective} objective - Objectif a completer.
	 */
  checkObj(objective: Objective) {
    if (!objective.completed) {
      this.questService.checkObj(this.quest._id, objective.descr)
        .subscribe(updatedDoc => {
          if (updatedDoc.completed) {
            let dialog = this.mdDialog.open(ModalCompletingQuest, {
              data: this.quest.reward
            });
            this.reload.emit();
          } else {
            this.reload.emit(updatedDoc._id);
          }
        });
    }
  }

	/**
	 * @desc Met a jour le taux de completion de la quete en cours.
	 */
  updateCompletion() {
    var nbObjChecked = 0;
    for (let o of this.quest.objectives) {
      if (o.completed) {
        nbObjChecked++;
      }
    }
    this.completionRate = nbObjChecked * 100 / this.quest.objectives.length;
  }


	/**
	 * @desc Supprime la quete en cours apres validation par une modale, et emet un evenement de rechargement.
	 */
  remove() {
    let dialog = this.mdDialog.open(ModalDeletingQuest);
    dialog.afterClosed()
      .subscribe(confirm => {
        if (confirm) {
          this.questService.deleteQuest(this.quest._id)
            .subscribe((res) => {
              this.reload.emit();
            });
        }
      });
  }
}
