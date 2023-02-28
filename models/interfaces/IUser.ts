export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthdate: Date;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<string>;
}
