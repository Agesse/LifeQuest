import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";

import { STRINGS } from "./../../ressources/strings.constants";

@Component({
  selector: "modal-completing-quest",
  templateUrl: "./../templates/modal-completing-quest.component.html"
})
export class ModalCompletingQuest {
  STRINGS = STRINGS;

  constructor(public dialog: MdDialogRef<ModalCompletingQuest>, @Inject(MD_DIALOG_DATA) public data: any) { }
}
