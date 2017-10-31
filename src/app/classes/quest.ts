import { Objective } from './objective';

export class Quest {
  _id: string;
  title: string;
  objectives: Objective[];
  reward: string;
  completed: boolean;

  constructor(title?: string, objectives?: Objective[], reward?: string) {
    this.title = title ? title : "";
    this.objectives = objectives ? objectives : new Array<Objective>();
    this.reward = reward ? reward : "";
    this.completed = false;
  }
}
