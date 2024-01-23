import {Project} from "../models/project.model";

export default class Utils {
  static calculateProjectCosts(project: Project) {
    let costs = 0;
    project.lecturers.forEach(projectLecturer => {
      costs += projectLecturer.hours * projectLecturer.lecturer.hourlyRate;
    });
    // newCosts += this.travelCosts.value;
    project.expenses.forEach(projectExpense => {
      costs += projectExpense.costs;
    });
    return costs;
  }
}
