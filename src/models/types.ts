export interface RuleForm {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
}

export interface userRegistrationStore {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  password: string;
  confirmPassword: string;
  role: 'admin' | 'isCustomer';
}
