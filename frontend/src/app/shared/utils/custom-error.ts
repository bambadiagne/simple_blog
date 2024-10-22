export class CustomError extends Error {
  status: number;
  error: string;
  constructor(pay: { message: string; status: number; error: string }) {
    super();
    this.message = this.message;
    this.status = this.status;
    this.error = this.error;
  }
}
