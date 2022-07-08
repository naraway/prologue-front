class Term {
  //
  korean: string;
  english: string;
  russian?: string;

  constructor(korean: string, english: string) {
    //
    this.korean = korean;
    this.english = english;
  }

  static new(korean: string, english: string): Term {
    return new Term(korean, english);
  }

  static newWithRussian(korean: string, english: string, russian: string): Term {
    //
    const term = new Term(korean, english);

    term.russian = russian;

    return term;
  }
}

export default Term;
