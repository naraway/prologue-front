import { inject } from 'mobx-react';
import { mobxUtils } from '~/lib/module';


/**
 * Class decorator
 * @param serviceNames
 */
function injectFromName(...serviceNames: string[]) {
  //
  return (target: any): any =>
    inject(mobxUtils.injectFromName(...serviceNames))(target);
}

export default injectFromName;
