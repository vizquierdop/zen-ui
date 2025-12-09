export enum RoleType {
    CUSTOMER = 0,
    BUSINESS = 1,
    ADMIN = 2,
}

export function getRoleTypeName(value: string | number): string {
  let name = '';
  switch (value) {
    case 0:
    case 'CUSTOMER':
      name = 'CUSTOMER';
      break;
    case 1:
    case 'BUSINESS':
      name = 'BUSINESS';
      break;
    case 2:
    case 'ADMIN':
      name = 'ADMIN';
      break;
    default:
      break;
  }
  return name;
}