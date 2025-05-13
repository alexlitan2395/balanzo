export class AuthCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}
