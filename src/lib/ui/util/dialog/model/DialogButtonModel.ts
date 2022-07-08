class DialogButtonModel {
  //
  content: string;
  onClick?: () => void;

  constructor(content: string, onClick?: () => void) {
    //
    this.content = content;
    this.onClick = onClick;
  }

  [key: string]: any;
}

export default DialogButtonModel;
