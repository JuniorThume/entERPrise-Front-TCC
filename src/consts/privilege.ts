
const SALESMAN_PRIVILEGE = [
  '', // Representa a Home
  'products',
  'sales',
  'customers'
];

const MANAGER_PRIVILEGE = [
  ...SALESMAN_PRIVILEGE,
  'reports',
  'suppliers',
  'purchases',
  'employees',
];

const ADMIN_PRIVILEGE = [
  ...MANAGER_PRIVILEGE,
  'settings',
  'history',
  'logs',
];

export const roles = {
  'admin': ADMIN_PRIVILEGE,
  'manager': MANAGER_PRIVILEGE,
  'salesman': SALESMAN_PRIVILEGE
}