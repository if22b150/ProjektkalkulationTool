import {AModel} from "./a-model.model";

export interface GroupSpecificExpense extends AModel {
  name: string;
  costs: number;
  perParticipant: boolean;
}
