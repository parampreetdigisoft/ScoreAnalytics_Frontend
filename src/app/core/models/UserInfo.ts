export interface UserInfo {
  userId: number;
  fullName:string;
  email:string;
  phone:string;
  isActive:number;
  role:string;
  createdBy:number;
  createdAt:string;
  isDeleted:boolean
  isEmailConfirmed:boolean;
  isLoggedIn:true;
  tokenExpirationDate:string;
  profileImagePath:string;
  token: string;
}

export interface RolePermission {
  menuName:string,
  status:boolean
}
export interface User {
  id: number;
  email: string;
  role: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}