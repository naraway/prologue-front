import { Constructor } from '@nara/accent';


type SingleDataType<T> =
  T extends string ? StringConstructor :
    T extends number ? NumberConstructor :
      T extends boolean ? BooleanConstructor :
        ObjectConstructor | Constructor;

export default SingleDataType;
