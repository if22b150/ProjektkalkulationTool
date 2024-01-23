import {Expense} from "./expense.model";

export interface ProjectExpense {
  id?: number; // optional, because when being used for creation there is no id
  expense: Expense;
  costs: number;
}
