import React from 'react';
import { autobind } from '~/lib/decorator';
import { ReactComponent } from '~/lib/module';
import { dialogUtil } from '../../util';
import fileUtil, { FileType } from '../../util/file';


interface Props {
  trigger: React.ReactElement;
  onSelectFile?: (file: File) => void;
  extensionWhitelist?: FileType[] | string[];
  maxSize?: number;
  validate?: (file: File) => boolean;
  uploadUrl?: string;
  uploadDirect?: boolean;
  onSuccessUpload?: (file: File) => void;
}

@autobind
class LocalFileSelectorContainer extends ReactComponent<Props> {
  static defaultProps = {
    validate: () => true,
    onSuccessUpload: () => {
    },
    onSelectFile: () => {
    },
  };

  private fileInputRef = React.createRef<HTMLInputElement>();

  onChangeFile(file: File) {
    //
    const { uploadDirect } = this.props;
    const { validate, onSuccessUpload, onSelectFile } = this.propsWithDefault;

    if (!validate(file)) {
      return;
    }

    const { extensionWhitelist } = this.props;

    if (!fileUtil.validateExtension(file, extensionWhitelist)) {
      dialogUtil.alert({
        title: 'Invalid File Type',
        message: 'Not a file has invalid extension.',
      });

      return;
    }

    if (uploadDirect) {
      dialogUtil.confirm({
        title: 'File Upload',
        message: 'Are you sure upload file?',
      }).then((result) => {
        if (result) {
          this._uploadFile(file)
            .then(() => onSuccessUpload(file));
        }
      });
    } else {
      onSelectFile(file);
    }

  }

  async _uploadFile(file: File) {

    const { uploadUrl, maxSize } = this.props;

    return fileUtil.fileSlice(file, maxSize)
      .map((chunk) => fileUtil.upload(uploadUrl!, chunk));
  }

  _openInputFile() {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  }

  render() {
    //
    const { trigger } = this.props;

    const eventAttachedTrigger = React.cloneElement(trigger, {
      onClick: this._openInputFile,
    });

    return (
      <>
        {eventAttachedTrigger}
        <input
          hidden
          ref={this.fileInputRef}
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              this.onChangeFile(e.target.files[0]);
            }
            e.target.value = '';
          }}
        />
      </>
    );
  }

}

export default LocalFileSelectorContainer;
