import { makeExtendedObservable } from '~/lib/decorator';


class NameValueModel {
  //
  name: string;

  value: string | number;

  constructor(name: string, value: string | number) {
    //
    makeExtendedObservable(this);
    this.name = name;
    this.value = value;
  }
}

export default NameValueModel;
