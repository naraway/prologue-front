import TriggerContainer from './logic/TriggerContainer';
import TriggerContext from './sub/TriggerContext/TriggerContext';

export * from './model';

type TriggerComponent = typeof TriggerContainer & {
  //
  Context: typeof TriggerContext;
}

const Trigger = TriggerContainer as TriggerComponent;

Trigger.Context = TriggerContext;

export default Trigger;
