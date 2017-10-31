import { NgModule } from "@angular/core";

import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdDialogModule, MdProgressBarModule, MdTooltipModule, MdInputModule } from "@angular/material";

import { AppComponent } from "./components/app.component";
import { Login } from "./components/login.component";
import { QuestList } from "./components/quest-list.component";
import { CompletedQuestList } from "./components/completed-quest-list.component";
import { QuestDetail } from "./components/quest-detail.component";
import { ModalCompletingQuest } from "./modals/components/modal-completing-quest.component";
import { ModalDeletingQuest } from "./modals/components/modal-deleting-quest.component";
import { ModalAddingQuest } from "./modals/components/modal-adding-quest.component";

import { QuestService } from "./services/quest.service";
import { Authentification } from "./services/authentification.service";

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpModule, JsonpModule, FormsModule, BrowserAnimationsModule, MdDialogModule, MdProgressBarModule, MdTooltipModule, MdInputModule],
  declarations: [AppComponent, Login, QuestList, CompletedQuestList, QuestDetail, ModalCompletingQuest, ModalDeletingQuest, ModalAddingQuest],
  entryComponents: [ModalCompletingQuest, ModalDeletingQuest, ModalAddingQuest],
  providers: [QuestService, Authentification],
  bootstrap: [AppComponent]
})

export class AppModule { }

