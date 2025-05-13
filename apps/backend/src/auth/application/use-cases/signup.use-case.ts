import { Injectable } from '@nestjs/common';
import { SignupCommand } from '../commands/signup.command';
import { IUserRepository } from '../../domain/repositories/user-repository.interface';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { User } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';

@Injectable()
export class SignupUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(command: SignupCommand): Promise<User> {
    const email = Email.create(command.email);
    const existing = await this.userRepo.findByEmail(email.getValue());
    if (existing) throw new Error('Email already used');

    const password = await Password.create(command.password);

    const user = new User(
      randomUUID(),
      email.getValue(),
      password.getHashed(),
    );

    return this.userRepo.create(user);
  }
}
