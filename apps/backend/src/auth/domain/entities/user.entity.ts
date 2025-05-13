export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public password: string,
    public emailVerified = false,
    public refreshToken?: string,
    public verificationCode?: string,
    public resetToken?: string,
    public resetTokenExpires?: Date,
    public readonly createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
