import DialogButtonModel from './DialogButtonModel';
import DialogNoticeType from './DialogNoticeType';
import DialogSizeType from './DialogSizeType';


interface DialogOptionsModel {
  //
  title?: string;
  noticeType?: DialogNoticeType;
  size?: DialogSizeType;
  confirmButton?: DialogButtonModel;
  cancelButton?: DialogButtonModel;
}

export default DialogOptionsModel;
