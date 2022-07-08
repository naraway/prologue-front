interface AppContextType<T> {
  //
  value: T;
  setValue: (value: T) => void;
}

export default AppContextType;
