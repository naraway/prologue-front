import { FailureMessage } from '@nara-way/accent';

const exceptionUtils = {
  //
  getFailureMessage: (e: any) => {
    //
    if (e.response && e.response.data && e.response.data.failureMessage) {
      return e.response.data.failureMessage;
    } else if (e.request && e.request.getResponseHeader('X-Exception-Message')) {
      return new FailureMessage(
        'Unknown exception.',
        e.request.getResponseHeader('X-Exception-Message'),
      );
    } else {
      return new FailureMessage(
        'Unknown exception.',
        e.message,
      );
    }
  },
};

export default exceptionUtils;
