import DialogViewer from './container/DialogContainer';
import dialogModule from './dialog';

export * from './model';


type DialogType = typeof dialogModule & {
  Viewer: typeof DialogViewer;
};

const dialogUtil = dialogModule as DialogType;

dialogUtil.Viewer = DialogViewer;

export { dialogUtil };
