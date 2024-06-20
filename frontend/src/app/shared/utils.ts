import {ProjectLecturer} from "../models/project-lecturer.model";
import {ProjectExpense} from "../models/project-expense.model";

export default class Utils {
  static calculateProjectCosts(projectLecturers: ProjectLecturer[], projectExpenses: ProjectExpense[]) {
    let costs = 0;
    projectLecturers.forEach(projectLecturer => {
      let dailyRate = projectLecturer.dailyRateOverride ?? projectLecturer.lecturer.dailyRate
      let hourlyRate = projectLecturer.hourlyRateOverride ?? projectLecturer.lecturer.hourlyRate
      costs += (projectLecturer.hours ?? 0) * (projectLecturer.daily ? dailyRate : hourlyRate);
    });
    // newCosts += this.travelCosts.value;
    projectExpenses.forEach(projectExpense => {
      costs += projectExpense.costs ?? 0;
    });
    return costs;
  }
}
