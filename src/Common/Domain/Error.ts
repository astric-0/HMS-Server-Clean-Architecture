export enum ErrorType {
  None = 0,
  Failure = 1,
  Validation = 2,
  NotFound = 3,
  Conflict = 4,
}

export default class Error {
  constructor(
    public Code: string,
    public Description: string,
    public Type: ErrorType,
  ) {}

  public static readonly None: Readonly<Error> = Object.freeze(
    new Error('', '', ErrorType.None),
  );

  public static readonly NullValue: Readonly<Error> = Object.freeze(
    new Error(
      'Generic.NullValue',
      'Null value was provided',
      ErrorType.Failure,
    ),
  );

  public static readonly NotFound: Readonly<Error> = Object.freeze(
    new Error(
      'Generic.NotFound',
      "Couldn n't find the given record",
      ErrorType.NotFound,
    ),
  );

  public static readonly InValidValue: Readonly<Error> = Object.freeze(
    new Error(
      'Generic.InValidValue',
      'Value provided was not valid',
      ErrorType.Failure,
    ),
  );
}
