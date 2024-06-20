import {Lecturer} from "./lecturer.model";

export interface ProjectLecturer {
  id?: number; // optional, because when being used for creation there is no id
  lecturer: Lecturer;
  hours: number;
  daily: boolean;
  hourlyRateOverride?: number;
  dailyRateOverride?: number;
}
