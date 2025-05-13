import { Controller, Post, Body } from '@nestjs/common';
import { SignupUseCase } from '../application/use-cases/signup.use-case';
import { AuthCommand } from '../application/commands/auth.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly signup: SignupUseCase) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const user = await this.signup.execute(new AuthCommand(body.email, body.password));
    return { id: user.id, email: user.email };
  }
}
