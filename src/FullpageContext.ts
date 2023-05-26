import { createContext } from "react";

const voidFn = (el?) => void 0;
const getIndex = (el: any) => 0;
const observeFn = (el) => el;

export default createContext({
  back: voidFn,
  fullpageRef: null,
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
  warperRef: null,
});
