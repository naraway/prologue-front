type VoidableSingleResponseType<T> =
  T extends void ? undefined :
    T | null;

export default VoidableSingleResponseType;
