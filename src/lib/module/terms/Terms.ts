import { fetchFromTermsStorage } from './TermsStorageUtil';
import { Term } from './dictionary';


export const Terms = (term: Term) => {
  const termsType = fetchFromTermsStorage();

  const requiredTerm: Required<Term> = {
    korean: term.korean,
    english: term.english,
    russian: term.russian || term.korean,
  };

  return requiredTerm[termsType];
};

