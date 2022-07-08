import Extension from './Extension';
import FileTextType from './FileTextType';
import FileType from './FileType';
import fileUtilModule from './fileUtil';


type FileUtilType = typeof fileUtilModule & {
  Type: typeof FileType;
}

const fileUtil = fileUtilModule as FileUtilType;

fileUtil.Type = FileType;

export default fileUtil;
export { FileType, FileTextType, Extension, fileUtil };
