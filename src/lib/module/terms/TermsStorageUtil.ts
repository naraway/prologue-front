import { NotInstantiatedException } from '@nara/accent';
import { TermType } from './dictionary';


const storageName = 'nara.language';
const storage = typeof window !== 'undefined' ? window.localStorage : null;

export function saveToTermsStorage(termsType: TermType) {
  if (storage) {
    storage.setItem(storageName, termsType);
  } else {
    throw new NotInstantiatedException('TermsStorageUtil', 'There is no localStorage');
  }
}

export function fetchFromTermsStorage(): TermType {
  //
  if (storage && storage.getItem(storageName)) {
    return storage.getItem(storageName) as TermType;
  }

  return TermType.Korean;
}

export function clearTermsStorage() {
  if (storage) {
    storage.removeItem(storageName);
  } else {
    throw new NotInstantiatedException('TermsStorageUtil', 'There is no localStorage');
  }
}
