import {AModel} from "./a-model.model";

export interface OtherExpense extends AModel {
  name: string;
  costs: number;
}
