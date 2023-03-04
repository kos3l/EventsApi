export interface UserModel {
  comparePassword(password: string): Promise<string>;
}
