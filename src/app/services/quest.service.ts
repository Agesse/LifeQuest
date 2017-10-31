import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { REST } from "./../ressources/rest.constants";
import { Authentification } from "./authentification.service";
import { Quest } from "./../classes/quest";

// Service permettant l'acces aux quetes et leur modification.
@Injectable()
export class QuestService {

  // CONSTRUCTEUR
  constructor(private http: Http, private authentification: Authentification) { }

  // FONCTIONS
  /**
   * Retourne la liste des quetes en cours.
   * @returns {Observable<Quest[]>} Promesse contenant la liste des quetes en cours.
   */
  getQuestOnGoing(): Observable<Quest[]> {
    return this.http.get(REST.urlServerLocal + "/quests?completed=false", { headers: this.authentification.authHeaders })
      .map((res) => {
        let body = res.json();
        return body;
      });
  }

  /**
   * Retourne la liste des quetes completees.
   * @returns {Observable<Quest[]>} Promesse contenant la liste des quetes completees.
   */
  getQuestDone(): Observable<Quest[]> {
    return this.http.get(REST.urlServerLocal + "/quests?completed=true", { headers: this.authentification.authHeaders })
      .map((res) => {
        let body = res.json();
        return body;
      });
  }

  /**
   * Change le statut de l'objectif d'une quete a complet.
   * Si tous les objectifs sont resolus, la quete devient completee.
   * @param {string} idQuest - ID de la quête.
   * @param {string} descrObj - Description de l'objectif.
   * @returns {Observable<Quest>} Promesse contenant la quete modifiee.
   */
  checkObj(idQuest: string, descrObj: string): Observable<Quest> {
    return this.http.put(REST.urlServerLocal + "/quests/" + idQuest + "/objectives?descr=" + descrObj, true, { headers: this.authentification.authHeaders })
      .map((res) => {
        return res.json();
      });
  }


  /**
   * Supprime la quete par son ID.
   * @param {string} idQuest - ID de la quête à supprimer.
   * @returns {Observable<int>} Promesse contenant le nombre de quêtes supprimées.
   */
  deleteQuest(idQuest: string) {
    return this.http.delete(REST.urlServerLocal + "/quests/" + idQuest, { headers: this.authentification.authHeaders })
      .map((res) => {
        return res;
      });
  }

  /**
   * Ajouter une quete en BDD.
   * @param {Quest} quest - La quête à ajouter.
   * @returns {Observable<Quest>} Promesse contenant la quête ajoutée.
   */
  addQuest(quest: Quest): Observable<Quest> {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", this.authentification.authHeaders.get("Authorization"));

    return this.http.post(REST.urlServerLocal + "/quests", quest, { headers: headers })
      .map((res) => {
        return res.json();
      });
  }
}
