import { Appointments } from "./appointments";

export interface Response {
    data: Data;
  }

export interface Data {
    appointments: Appointments
}
