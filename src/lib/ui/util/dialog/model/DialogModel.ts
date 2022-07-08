import DialogButtonModel from './DialogButtonModel';
import DialogNoticeType from './DialogNoticeType';
import DialogSizeType from './DialogSizeType';


class DialogModel {
  //
  message: string | JSX.Element;
  confirmButton: DialogButtonModel;
  cancelButton: DialogButtonModel | null;
  noticeType: DialogNoticeType = DialogNoticeType.Info;
  size: DialogSizeType = DialogSizeType.Mini;

  title?: string;

  constructor(
    message: string | JSX.Element,
    confirmButton: DialogButtonModel,
    cancelButton: DialogButtonModel | null,
    noticeType: DialogNoticeType = DialogNoticeType.Info,
    size: DialogSizeType = DialogSizeType.Mini,
    messageTitle?: string,
  ) {
    //
    this.message = message;
    this.confirmButton = confirmButton;
    this.cancelButton = cancelButton;
    this.noticeType = noticeType;
    this.size = size;

    this.title = messageTitle;
  }
}

export default DialogModel;
