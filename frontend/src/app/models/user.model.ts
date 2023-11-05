import {AModel} from "./a-model.model";

export interface User extends AModel {
  email: string;
  verified: boolean;
  token?: string;
  role: ERole;
}

export enum ERole {
  CUSTOMER = "customer",
  ADMIN = "admin"
}
