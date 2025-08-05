export interface UserInfo {
userId: number;
firstName:string;
createdBy:number;
createdDate:string;
email:string;
isActive:number;
isDeleted:boolean
isEmailConfirmed:boolean;
tokenExpirationDate:string;
isLoggedIn:true;
roleId:number;
profileImagePath:string;
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