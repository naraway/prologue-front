import { observer } from 'mobx-react';
import React from 'react';
import { autobind } from '~/lib/decorator';
import { ReactComponent } from '~/lib/module';
import { DialogButtonModel, RenderDialogViewerParams } from '../model';
import DialogService from '../service/DialogService';


interface Props {
  renderDialog: (params: RenderDialogViewerParams) => React.ReactNode;
}

@autobind
@observer
class DialogContainer extends ReactComponent<Props> {
  //
  dialogService: DialogService = DialogService.instance;

  close(index: number) {
    //
    this.dialogService.remove(index);
  }

  onClose(index: number, button: DialogButtonModel | null) {
    //
    this.close(index);

    if (button && typeof button.onClick === 'function') {
      button.onClick();
    }
  }

  render() {
    //
    const { renderDialog } = this.props;
    const { dialogs } = this.dialogService;

    return dialogs.map((dialog, index) => (
      <React.Fragment key={index}>
        {renderDialog({
          dialog,
          index,
          onClose: this.onClose,
        })}
      </React.Fragment>
    ));
  }
}

export default DialogContainer;
