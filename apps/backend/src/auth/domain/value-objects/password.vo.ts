export class Password {
  constructor(private readonly value: string) {
    if (value.length < 6) throw new Error('Password too short');
  }
  getValue() {
    return this.value;
  }
}
