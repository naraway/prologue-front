import DialogButtonModel from './DialogButtonModel';
import DialogModel from './DialogModel';


interface RenderDialogViewerParams {
  dialog: DialogModel;
  index: number;
  onClose: (index: number, button: DialogButtonModel | null) => void;
}

export default RenderDialogViewerParams;
