import { Injectable } from '@angular/core';
import { UISelectModel } from '../models/basic/ui-select.model';
import { getRoleTypeName, RoleType } from '../models/enums/role.enum';
import { getReservationStatusTypeName, ReservationStatusType } from '../models/enums/reservation-status-type.enum';

@Injectable({ providedIn: 'root' })
export class EnumService {
  constructor() {}

  getRoleTypeOptions(): UISelectModel[] {
    const roleTypes = Object.keys(RoleType).filter((roleType: string) =>
      isNaN(Number(roleType))
    );
    const selectResults: UISelectModel[] = roleTypes.map((roleType: string) => {
      return {
        label: getRoleTypeName(roleType),
        value: RoleType[roleType as keyof typeof RoleType],
      };
    });
    return selectResults;
  }

  getReservationStatusTypeOptions(): UISelectModel[] {
    const reservationStatusType = Object.keys(ReservationStatusType).filter((reservationStatusType: string) =>
      isNaN(Number(reservationStatusType))
    );
    const selectResults: UISelectModel[] = reservationStatusType.map((reservationStatusType: string) => {
      return {
        label: getReservationStatusTypeName(reservationStatusType),
        value: ReservationStatusType[reservationStatusType as keyof typeof ReservationStatusType],
      };
    });
    return selectResults;
  }
}
