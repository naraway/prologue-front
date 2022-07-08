import {configure, isObservableArray} from "mobx";

configure({
  useProxies: 'ifavailable',
  isolateGlobalState: true,
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
});

(() => {
  const isArray = Array.isArray;
  Object.defineProperty(Array, 'isArray', {
    value: (target) => (isObservableArray(target) || isArray(target)),
  });
})();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
