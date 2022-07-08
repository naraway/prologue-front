import { makeExtendedObservable } from '~/lib/decorator';


class NameTextModel {
  //
  name: string;

  text: string;

  value: string | number;

  active?: boolean;

  disabled?: boolean;

  constructor(name: string, text: string, value: string | number, active?: boolean, disabled?: boolean) {
    //
    makeExtendedObservable(this);
    this.name = name;
    this.text = text;
    this.value = value;
    this.active = active;
    this.disabled = disabled;
  }

  static fromName(name: string) {
    //
    return new NameTextModel(name, name, name, false, false);
  }

  static newWithModel(name: string, text: string, model: any) {
    //
    const nameText = new NameTextModel(name, text, name, false, false);

    nameText.model = model;
    return nameText;
  }

  static fromNameText(name: string, text: string) {
    //
    return new NameTextModel(name, text, name, false, false);
  }

  static from(name: string, text: string, value: string | number) {
    //
    return new NameTextModel(name, text, value, false, false);
  }

  [key: string]: any;
}

export default NameTextModel;
