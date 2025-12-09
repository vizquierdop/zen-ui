import { Pipe, PipeTransform } from "@angular/core";
import { getReservationStatusTypeName } from "../../models/enums/reservation-status-type.enum";

@Pipe({
  name: 'reservationStatusTypePipe',
  standalone: true,
  pure: false,
})
export class ReservationStatusTypePipe implements PipeTransform {
  constructor() {}

  transform(value: number) {
    return getReservationStatusTypeName(value);
  }
}
