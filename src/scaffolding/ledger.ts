export class Ledger {
  last: string | null = null;

  record(e: any, timestamp: number) {
    const payload = { ...e, timestamp: timestamp, prev: this.last };
    // Logic for persistence...
    return payload;
  }
}
