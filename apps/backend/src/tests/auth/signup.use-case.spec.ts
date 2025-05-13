import * as bcrypt from 'bcryptjs';

import { SignupUseCase } from '../../auth/application/use-cases/signup.use-case';
import { AuthCommand } from '../../auth/application/commands/auth.command';
import { User } from '../../auth/domain/entities/user.entity';

describe('SignupUseCase', () => {
  let useCase: SignupUseCase;
  let mockUserRepo: any;

  beforeEach(() => {
    mockUserRepo = {
      findByEmail: jest.fn(),
      save: jest.fn((user: User) => Promise.resolve(user)),
    };
    useCase = new SignupUseCase(mockUserRepo);
  });

  it('should sign up a new user', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);

    const password = '!Alex222!2';

    const hashedPassword = await bcrypt.hash(password, 10);

    const command = new AuthCommand('user@example.com', hashedPassword);
    const user = await useCase.execute(command);
    const result = await bcrypt.compare(password, hashedPassword);

    expect(user.email).toBe('user@example.com');
    expect(result).toBe(true);
    expect(mockUserRepo.save).toHaveBeenCalled();
  });

  it('should throw if email exists', async () => {
    mockUserRepo.findByEmail.mockResolvedValue({});

    await expect(
      useCase.execute(new AuthCommand('user@example.com', '!Alex222!2')),
    ).rejects.toThrow('Email already used');
  });

  it('should throw if password is weak', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);
    await expect(
      useCase.execute(new AuthCommand('user@example.com', 'weak')),
    ).rejects.toThrow('Password is too weak');
  });

  it('should throw if email format is invalid', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);
    await expect(
      useCase.execute(new AuthCommand('invalid-email', '!Alex222!2')),
    ).rejects.toThrow('Invalid email format');
  });
  it('should throw if password is empty', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);
    await expect(
      useCase.execute(new AuthCommand('user@example.com', ''))
    ).rejects.toThrow('Password is required');
  });

  it('should throw if email is empty', async () => {
    mockUserRepo.findByEmail.mockResolvedValue(null);
    await expect(
      useCase.execute(new AuthCommand('', '!Alex222!2'))
    ).rejects.toThrow('Email is required');
  });

});




