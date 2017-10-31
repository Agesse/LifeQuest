import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

import { STRINGS } from "./../../ressources/strings.constants";

@Component({
  selector: "modal-deleting-quest",
  templateUrl: "./../templates/modal-deleting-quest.component.html"
})
export class ModalDeletingQuest {
  STRINGS = STRINGS;

  constructor(public dialog: MdDialogRef<ModalDeletingQuest>, @Inject(MD_DIALOG_DATA) public data: any) { }
}
