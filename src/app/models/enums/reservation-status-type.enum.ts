export enum ReservationStatusType {
  PENDING = 0,
  ACCEPTED = 1,
  CANCELLED = 2,
  COMPLETED = 3,
}

export function getReservationStatusTypeName(value: string | number): string {
  let name = '';
  switch (value) {
    case 0:
    case 'PENDING':
      name = 'PENDING';
      break;
    case 1:
    case 'ACCEPTED':
      name = 'ACCEPTED';
      break;
    case 2:
    case 'CANCELLED':
      name = 'CANCELLED';
      break;
    case 3:
    case 'COMPLETED':
      name = 'COMPLETED';
      break;
    default:
      break;
  }
  return name;
}
