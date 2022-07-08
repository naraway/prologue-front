import { InvalidParamsException } from '@nara/accent';
import { DialogButtonModel, DialogModel, DialogOptionsModel } from './model';
import DialogService from './service/DialogService';


const defaultValue = {
  confirmButtonText: '확인',
  cancelButtonText: '취소',
};

type DialogObjectType = DialogOptionsModel & {
  message: string | JSX.Element;
};

function dialog(message: string | JSX.Element | DialogObjectType, options: DialogOptionsModel, cancelable: boolean = false): Promise<boolean> {
  //
  return new Promise(resolve => {
    //
    if (!message) {
      throw new InvalidParamsException('dialog', `Message must not be empty.`);
    }

    let dialogObject: DialogObjectType;

    if ((message as DialogObjectType).message) {
      dialogObject = {
        ...(message as DialogObjectType),
      };
    } else {
      dialogObject = {
        message: message as string | JSX.Element,
        ...options,
      };
    }

    const confirmContent = (dialogObject.confirmButton && dialogObject.confirmButton.content) || defaultValue.confirmButtonText;
    const confirmOnClick = () => resolve(true);

    const confirmButton = new DialogButtonModel(confirmContent, confirmOnClick);

    let cancelButton: DialogButtonModel | null = null;

    if (cancelable) {
      const cancelContent = (dialogObject.cancelButton && dialogObject.cancelButton.content) || defaultValue.cancelButtonText;
      const cancelOnClick = () => resolve(false);

      cancelButton = new DialogButtonModel(cancelContent, cancelOnClick);
    }

    const dialog = new DialogModel(
      dialogObject.message, confirmButton, cancelButton, dialogObject.noticeType, dialogObject.size, dialogObject.title,
    );

    DialogService.instance.add(dialog);
  });
}


/**
 * Alert dialog
 *
 * @param message
 * @param options
 */
async function alert(message: string | JSX.Element | DialogObjectType, options: DialogOptionsModel = {}): Promise<void> {
  //
  return dialog(message, options).then(() => undefined);
}

/**
 * Confirm dialog
 *
 * @param message
 * @param options
 */
async function confirm(message: string | JSX.Element | DialogObjectType, options: DialogOptionsModel = {}): Promise<boolean> {
  //
  return dialog(message, options, true);
}

export default {
  alert,
  confirm,
};
