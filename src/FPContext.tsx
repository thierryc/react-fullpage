import { createContext } from "react";

const voidFn = (el?) => void 0;
const getIndex = (el: any) => 0;
const observeFn = (el) => el;

export const FPContext = createContext({
  back: voidFn,
  FPContainerInnerRef: null,
  getIndex,
  goto: voidFn,
  next: voidFn,
  offsetHeight: 0,
  pageStyle: {},
  pageYOffset: 0,
  slideIndex: 0,
  slides: [],
  subscribe: observeFn,
  transitionTiming: 700,
  translateY: 0,
  unsubscribe: observeFn,
  FPContainerOuterRef: null,
});
