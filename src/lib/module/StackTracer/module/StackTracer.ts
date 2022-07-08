import sourceMapped from 'sourcemapped-stacktrace';
import IStackTrace from '../model/IStackTrace';


class StackTracer {
  //
  static blacklistKeywords = [
    'StackTracer.ts',
    'Exception.ts',
    '/node_modules/',
    '/webpack',
    'null:',
    'at http:',
  ];

  queue: IStackTrace[] = [];


  static capture() {
    //
    let errorStack = new Error().stack;

    if (!errorStack) {
      try {
        throw new Error();
      } catch (e: any) {
        errorStack = e.stack;
      }
    }

    const options = {
      sync: true,
      cacheGlobally: true,
    };
    let filteredStackTrace: IStackTrace[] = [];

    sourceMapped.mapStackTrace(errorStack, (stack) => {
      //
      filteredStackTrace = stack
        .filter(trace => StackTracer.blacklistKeywords.every(keyword => !trace.includes(keyword)))
        .map(trace => {
          const pathWords = trace.split('/');
          const filePathWord = pathWords[pathWords.length - 1];
          const fileNameAndLine = filePathWord.split(':');
          const [ file, line ] = fileNameAndLine;
          const name = file.split('.ts')[0];
          const startingWord = ' at ';
          const method = trace.substring(trace.indexOf(startingWord) + startingWord.length, trace.indexOf(' ('));

          return {
            file,
            name,
            line,
            method,
          };
        });
    }, options);

    const tracer = new StackTracer();

    tracer.queue = filteredStackTrace;
    return tracer;
  }

  getLast(): IStackTrace | undefined {
    //
    return this.queue[0];
  }
}

export default StackTracer;
