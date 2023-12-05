import {AModel} from "./a-model.model";

export interface Lecturer extends AModel {
  name: string;
  hourlyRate: number;
  dailyRate: number;
}
