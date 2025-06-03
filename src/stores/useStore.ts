import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { ElMessage } from 'element-plus';

import type { userRegistrationStore } from '@/models/types';

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    registeredUsers: JSON.parse(
      localStorage.getItem('registeredUsers') || '[]',
    ) as userRegistrationStore[],
  }),

  getters: {
    getUsers: (state) => state.registeredUsers,
  },
  actions: {
    registerUser(userData: userRegistrationStore): boolean {
      const { firstName, lastName, email, contactNumber, password, confirmPassword } = userData;

      const isExistingUser = this.registeredUsers.some(
        (user) => user.email === email || user.contactNumber === contactNumber,
      );

      if (isExistingUser) {
        ElMessage({
          message: 'User already exists with the same email and/or contact number.',
          grouping: true,
          type: 'error',
        });
        return false;
      }

      const id = uuidv4();
      this.registeredUsers.push({
        id,
        firstName,
        lastName,
        email,
        contactNumber,
        password,
        confirmPassword,
        role: 'isCustomer',
      });
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
      return true;
    },
  },
});
