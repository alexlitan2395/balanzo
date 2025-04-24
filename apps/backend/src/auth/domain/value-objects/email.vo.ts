export class Email {
  constructor(private readonly value: string) {
    if (!/^\S+@\S+\.\S+$/.test(value)) throw new Error('Invalid email');
  }
  getValue() {
    return this.value;
  }
}
