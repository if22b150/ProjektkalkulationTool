import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expenses-view',
  templateUrl: './expenses-view.component.html',
  styleUrls: ['./expenses-view.component.scss']
})
export class ExpensesViewComponent implements OnInit{
  constructor(public expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getAll();
  }
}
