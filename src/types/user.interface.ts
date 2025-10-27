export enum UserRole {
  PROJECT_ADMIN,
  MEMBER
}

export default interface User {
  id: number;
  name: string;
  email: string;
}