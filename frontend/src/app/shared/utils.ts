import {Project} from "../models/project.model";
import {ProjectLecturer} from "../models/project-lecturer.model";
import {ProjectExpense} from "../models/project-expense.model";

export default class Utils {
  static calculateProjectCosts(projectLecturers: ProjectLecturer[], projectExpenses: ProjectExpense[]) {
    let costs = 0;
    projectLecturers.forEach(projectLecturer => {
      costs += projectLecturer.hours * (projectLecturer.daily ? projectLecturer.lecturer.dailyRate : projectLecturer.lecturer.hourlyRate);
    });
    // newCosts += this.travelCosts.value;
    projectExpenses.forEach(projectExpense => {
      costs += projectExpense.costs;
    });
    return costs;
  }
}
