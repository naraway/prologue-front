import { makeExtendedObservable } from '~/lib/decorator';
import DialogModel from '../model/DialogModel';


class DialogService {
  //
  static readonly instanceName = 'dialogService';

  static instance: DialogService;

  dialogs: DialogModel[] = [];


  constructor() {
    //
    makeExtendedObservable(this);
  }

  add(dialog: DialogModel) {
    //
    this.dialogs.push(dialog);
  }

  remove(index: number) {
    //
    this.dialogs.splice(index, 1);
  }
}

DialogService.instance = new DialogService();
export default DialogService;
