// Quest objective.
export class Objective {
  descr: string;
  completed: boolean;

  constructor(descr?: string, completed?: boolean) {
    this.descr = descr ? descr : "";
    this.completed = completed ? completed : false;
  }
}
