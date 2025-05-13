import { z } from 'zod';

const EmailSchema = z.string().email();

export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    if (!email) throw new Error('Email is required');
    const parsedEmail = EmailSchema.safeParse(email);
    if (!parsedEmail.success) {
      throw new Error('Invalid email format');
    }
    return new Email(parsedEmail.data.toLowerCase());
  }

  getValue(): string {
    return this.value;
  }
}




