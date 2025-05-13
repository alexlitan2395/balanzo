import * as bcrypt from 'bcryptjs';
import zxcvbn from 'zxcvbn';

export class Password {
  private constructor(private readonly value: string) {}

  static async create(password: string): Promise<Password> {
    if (!password) throw new Error('Password is required');
    const { score } = zxcvbn(password);
    if (score < 3) throw new Error('Password is too weak');
    const hash = await bcrypt.hash(password, 10);
    return new Password(hash);
  }

  static fromHashed(hash: string): Password {
    return new Password(hash);
  }

  async compare(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.value);
  }

  getHashed(): string {
    return this.value;
  }
}
