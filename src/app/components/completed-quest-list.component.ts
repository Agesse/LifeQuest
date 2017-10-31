import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

import { QuestService } from "../services/quest.service";

import { STRINGS } from "../ressources/strings.constants";
import { Quest } from "../classes/quest";

@Component({
  selector: 'completed-quest',
  templateUrl: "./../templates/completed-quest-list.component.html"
})
export class CompletedQuestList implements OnInit {

  // VARIABLES
  completedQuests: Quest[];
  selectedQuest: Quest;
  STRINGS = STRINGS;

  // CONSTRUCTEUR
  constructor(private questService: QuestService) { }

  // FONCTIONS
  ngOnInit() {
    this.questService.getQuestDone().subscribe(completedQuests => {
      this.completedQuests = completedQuests;
    });
  }

	/**
	 * @desc Permet l'affichage du detail de la quete selectionnee.
	 * @param {Quest} quest - Quete a afficher.
	 */
  onSelect(quest: Quest) {
    this.selectedQuest = quest;
  }
}
