import {AModel} from "./a-model.model";

export interface Notification extends AModel{
  email: string;
  activated: boolean;
}
