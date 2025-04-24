import crypto from 'crypto';

export class VerificationCode {
  constructor(private readonly value: string) {
    if (value.length !== 6) throw new Error('Invalid verification code');
  }
  getValue() {
    return this.value;
  }
  generate(length = 6, expirationMinutes = 10) {
    const code = crypto.randomBytes(length).toString('hex').slice(0, length);
    const expirationTime = Date.now() + expirationMinutes * 60 * 1000;
    return {
      code,
      expirationTime
    };
  }
}
