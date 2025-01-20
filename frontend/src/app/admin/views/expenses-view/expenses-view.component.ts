import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import {AResourceView} from "../a-resource-view";
import {Expense} from "../../../models/expense.model";

@Component({
  selector: 'app-expenses-view',
  templateUrl: './expenses-view.component.html',
  styleUrls: ['./expenses-view.component.scss']
})
export class ExpensesViewComponent extends AResourceView<Expense> {
  constructor(public expenseService: ExpenseService) {
    super(expenseService)
  }
}
