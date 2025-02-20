import Error from './Error';

export default class Result<TValue = void> {
  #isSuccess: boolean;
  #error: Error;
  #value: TValue;

  constructor(isSuccess: boolean, error: Error, value?: TValue) {
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

  public static Success<TValue = void>(value?: TValue): Result<TValue> {
    return new Result(true, Error.None, value);
  }

  public static Failure<TValue = void>(error: Error): Result<TValue> {
    return new Result(false, error);
  }
}

/**

  public static readonly Generic = class<TValue> extends Result {
    #value?: TValue;

    constructor(value: TValue | null, isSuccess: boolean, error: Error) {
      super(isSuccess, error);
      this.#value = value;
    }

    public static Success<TValue>(value?: TValue) {
      return new Result.Generic<TValue>(value, true, Error.None);
    }

    public static Failure(error: Error) {
      return new Result.Generic(null, false, error);
    }

    public get Value(): TValue {
      if (!this.IsSuccess) throw this.Error;
      return this.#value;
    }
  }; */
