import {AModel} from "./a-model.model";
import {Faculty} from "./faculty.model";

export interface User extends AModel {
  email: string;
  verified: boolean;
  // only set in response of login
  token?: string;
  role: ERole;
  // not set for admin
  faculty?: Faculty;
  // if true, password must be reset
  // if false, login is possible
  passwordReset: boolean;

  // only set in response when admin creates customer
  password?: string;
}

export enum ERole {
  FACULTY = "faculty",
  CUSTOMER = "customer",
  ADMIN = "admin"
}
