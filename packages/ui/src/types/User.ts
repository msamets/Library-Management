// src/types/user.ts

import { Role } from './role';

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
}
