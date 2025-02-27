import Error from './Error';

export default class Result<TValue = void> {
  #isSuccess: boolean;
  #error: Error;
  #value: TValue;

  constructor(isSuccess: boolean, error: Error, value: TValue | null) {
    console.log({ 'in constructor': value });
    this.#isSuccess = isSuccess;
    this.#error = error;
    this.#value = value;
  }

  public get IsSuccess(): boolean {
    return this.#isSuccess;
  }

  public get Error(): Readonly<Error> {
    return Object.freeze(this.#error);
  }

  public get Value(): Readonly<TValue> {
    if (!this.IsSuccess) throw this.Error;
    return Object.freeze(this.#value);
  }

  public static Success(): Result<void>;
  public static Success<TValue>(value: TValue): Result<TValue>;
  public static Success<TValue>(value?: TValue): Result<TValue> {
    const val = new Result<TValue>(true, Error.None, value);
    return val;
  }

  public static Failure<TValue = void>(error: Error): Result<TValue> {
    return new Result(false, error, null);
  }
}
