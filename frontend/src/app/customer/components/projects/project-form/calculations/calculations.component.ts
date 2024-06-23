import {Component, Input, OnInit} from '@angular/core';
import {ProjectExpense} from "../../../../../models/project-expense.model";
import {ProjectLecturer} from "../../../../../models/project-lecturer.model";
import {OtherExpense} from "../../../../../models/other-expense.model";
import Utils from "../../../../../shared/utils";
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-calculations',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgIf,
    NgForOf,
    DecimalPipe
  ],
  templateUrl: './calculations.component.html',
  styleUrl: './calculations.component.scss'
})
export class CalculationsComponent {
  @Input() projectExpenses: ProjectExpense[];
  @Input() projectLecturers: ProjectLecturer[];
  @Input() otherExpenses: OtherExpense[];
  @Input() participants: number;
  @Input() duration: number;
  @Input() priceForCoursePerDay: number;
  protected readonly Utils = Utils;

  get variableOtherExpenses(): OtherExpense[] {
    return this.otherExpenses.filter(oe => oe.perParticipant)
  }

  get variableOtherExpensesCosts(): number {
    let c = 0
    this.variableOtherExpenses.forEach(oe => {
      c += oe.costs ?? 0
    })
    return c
  }

  get fixOtherExpenses(): OtherExpense[] {
    return this.otherExpenses.filter(oe => !oe.perParticipant)
  }

  get fixOtherExpensesCosts(): number {
    let c = 0
    this.fixOtherExpenses.forEach(oe => {
      c += oe.costs ?? 0
    })
    return c
  }

  get revenue(): number {
    return this.participants * (this.priceForCoursePerDay) * this.duration
  }

  get allFixedCosts(): number {
    return Utils.getLecturersCosts(this.projectLecturers) + Utils.getExpenseCosts(this.projectExpenses) + this.fixOtherExpensesCosts
  }

  get db1(): number {
    return this.revenue - this.variableOtherExpensesCosts
  }

  get dbU1(): number {
    return this.db1 / this.revenue * 100
  }

  get db2(): number {
    return this.db1 - this.allFixedCosts
  }

  get dbU2(): number {
    return this.db2 / this.revenue * 100
  }
}
