export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public password: string,
    public emailVerified: boolean,
    public refreshToken?: string,
    public verificationCode?: string,
    public resetToken?: string,
    public resetTokenExpires?: Date,
  ) {}

  verifyEmail(code: string): boolean {
    return this.verificationCode === code;
  }

  canResetPassword(token: string): boolean {
    return this.resetToken === token && this.resetTokenExpires && new Date() < this.resetTokenExpires;
  }

}
