function staticImplements<T>() {
  //
  return <U extends T>(constructor: U) => {
  };
}

export default staticImplements;
