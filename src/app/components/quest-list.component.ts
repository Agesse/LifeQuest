import { Component, OnInit, HostListener } from '@angular/core';
import { MdDialog } from "@angular/material";

import { QuestService } from "../services/quest.service";
import { ModalAddingQuest } from "../modals/components/modal-adding-quest.component";

import { Quest } from "../classes/quest";
import { STRINGS } from "../ressources/strings.constants";

@Component({
  selector: 'active-quest',
  templateUrl: "./../templates/quest-list.component.html"
})
// Liste des quetes actives
export class QuestList implements OnInit {

  // CONSTRUCTEUR
  constructor(private questService: QuestService, private mdDialog: MdDialog) { }


  // VARIABLES
  quests: Quest[]; //quetes actives a afficher
  selectedQuest: Quest; //quete selectionnee pour le detail
  toggleList: boolean = false; //affichage de la liste de quete quand petit écran
  largeScreen: boolean = window.screen.width > 991; //indique si l'écran est grand
  STRINGS = STRINGS;


  // FONCTIONS
  /**
   * @desc Charge la liste des quetes.
   */
  ngOnInit() {
    this.reload();
  }

  /**
   * Ecoute l'évènement de resize de la fenêtre et met à jour la taille de l'écran.
   * @param {*} event
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.largeScreen = event.target.innerWidth > 991;
  }

	/**
	 * @desc Permet le rechargement de la liste avec replacement sur une quete par son ID, la 1ere si null.
	 * @param {string} questId? - Identifiant de la quete.
	 */
  reload(questId?: String) {
    this.questService.getQuestOnGoing()
      .subscribe(promiseQuests => {
        this.quests = promiseQuests;
        if (this.quests.length > 0) {
          if (!questId) {
            this.selectedQuest = this.quests[0];
          } else {
            for (var i = 0, l = this.quests.length; i < l; i++) {
              if (this.quests[i]._id === questId) {
                this.selectedQuest = this.quests[i];
              }
            }
          }
        } else {
          this.selectedQuest = null;
        }
      });
  }

	/**
	 * @desc Permet la selection d'une quete pour afficher son detail.
	 * @param {Quest} quest - Quete a afficher.
	 */
  onSelect(quest: Quest) {
    this.selectedQuest = quest;
  }

	/**
	 * @desc Ouvre une modale permettant la saisie d'une nouvelle quete.
	 */
  addQuest() {
    let dialog = this.mdDialog.open(ModalAddingQuest);
    dialog.afterClosed()
      .subscribe(quest => {
        if (quest !== null) {
          this.questService.addQuest(quest)
            .subscribe((res) => {
              this.reload(res._id);
            });
        }
      });
  }
}
