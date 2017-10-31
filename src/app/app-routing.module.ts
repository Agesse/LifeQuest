import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { Authentification } from "./services/authentification.service";
import { QuestList } from "./components/quest-list.component";
import { CompletedQuestList } from "./components/completed-quest-list.component";
import { Login } from "./components/login.component";

const routes: Routes = [
  { path: "", redirectTo: "/active-quests", pathMatch: "full", canActivate: [Authentification] },
  { path: "active-quests", component: QuestList, canActivate: [Authentification], },
  { path: "completed-quests", component: CompletedQuestList, canActivate: [Authentification], },
  { path: "login", component: Login }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
