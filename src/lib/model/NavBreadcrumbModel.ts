import NameValueModel from './NameValueModel';


class NavBreadcrumbModel {
  //
  text: string;


  constructor(text: string, ...props: NameValueModel[]) {
    //
    this.text = text;

    props.map(prop => this[prop.name] = `${prop.value}`);
  }

  [key: string]: string | undefined;
}

export default NavBreadcrumbModel;
