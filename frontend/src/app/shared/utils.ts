import {ProjectLecturer} from "../models/project-lecturer.model";
import {ProjectExpense} from "../models/project-expense.model";
import {OtherExpense} from "../models/other-expense.model";

export default class Utils {
  static calculateProjectCosts(projectLecturers: ProjectLecturer[], projectExpenses: ProjectExpense[], otherExpenses: OtherExpense[], participants: number) {
    return this.getLecturersCosts(projectLecturers) + this.getExpenseCosts(projectExpenses) + (otherExpenses ? this.getOtherExpenseCosts(otherExpenses, participants) : 0)
  }

  static getExpenseCosts(projectExpenses: ProjectExpense[]): number {
    let costs = 0;
    projectExpenses.forEach(projectExpense => {
      costs += projectExpense.costs ?? 0;
    });
    return costs
  }

  static getOtherExpenseCosts(otherExpenses: OtherExpense[], participants: number): number {
    let costs = 0;
    otherExpenses.forEach(oe => {
      let cost = oe.costs ?? 0
      costs += oe.perParticipant ? cost * participants : cost;
    })
    return costs
  }

  static getLecturersCosts(projectLecturers: ProjectLecturer[]): number {
    let costs = 0;
    projectLecturers.forEach(projectLecturer => {
      let dailyRate = projectLecturer.dailyRateOverride ?? projectLecturer.lecturer.dailyRate
      let hourlyRate = projectLecturer.hourlyRateOverride ?? projectLecturer.lecturer.hourlyRate
      costs += (projectLecturer.hours ?? 0) * (projectLecturer.daily ? dailyRate : hourlyRate);
    });
    return costs
  }
}
