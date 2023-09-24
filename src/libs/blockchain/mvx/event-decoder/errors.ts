class Err extends Error {
  inner: Error | undefined = undefined;

  constructor(message: string, inner?: Error) {
    super(message);
    this.inner = inner;
  }

  /**
   * Returns a pretty, friendly summary for the error or for the chain of errros (if appropriate).
   */
  summary(): any[] {
    const result = [];

    result.push({ name: this.name, message: this.message });

    let inner: any = this.inner;
    while (inner) {
      result.push({ name: inner.name, message: inner.message });
      inner = inner.inner;
    }

    return result;
  }
}

export class InvalidEventDataField extends Err {
  constructor(message: string) {
    super(`Invalid data field: ${message}`);
  }
}

export class InvalidEventTopicsField extends Err {
  constructor(message: string) {
    super(`Invalid topics field: ${message}`);
  }
}
