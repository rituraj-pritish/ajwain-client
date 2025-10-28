export enum UserRole {
  PROJECT_ADMIN = 'PROJECT_ADMIN',
  MEMBER = 'MEMBER',
}

export default interface User {
  id: number
  name: string
  email: string
  role: UserRole
}
