import {AModel} from "./a-model.model";
import {Faculty} from "./faculty.model";

export interface Lecturer extends AModel {
  name: string;
  hourlyRate: number;
  dailyRate: number;
  faculty: Faculty;
}
