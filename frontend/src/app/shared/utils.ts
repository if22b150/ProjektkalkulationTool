import {ProjectLecturer} from "../models/project-lecturer.model";
import {ProjectExpense} from "../models/project-expense.model";
import {OtherExpense} from "../models/other-expense.model";

export default class Utils {
  static calculateProjectCosts(projectLecturers: ProjectLecturer[], projectExpenses: ProjectExpense[], otherExpenses: OtherExpense[]) {
    let costs = 0;
    projectLecturers.forEach(projectLecturer => {
      let dailyRate = projectLecturer.dailyRateOverride ?? projectLecturer.lecturer.dailyRate
      let hourlyRate = projectLecturer.hourlyRateOverride ?? projectLecturer.lecturer.hourlyRate
      costs += (projectLecturer.hours ?? 0) * (projectLecturer.daily ? dailyRate : hourlyRate);
    });
    projectExpenses.forEach(projectExpense => {
      costs += projectExpense.costs ?? 0;
    });
    otherExpenses.forEach(oe => {
      costs += oe.costs ?? 0;
    })
    return costs;
  }
}
