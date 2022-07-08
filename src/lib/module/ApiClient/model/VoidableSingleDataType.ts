import SingleDataType from './SingleDataType';


type VoidableSingleDataType<T> =
  T extends void ? undefined :
    SingleDataType<T>;

export default VoidableSingleDataType;
