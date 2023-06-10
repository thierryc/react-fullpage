import { createContext } from "react";

import { FPItemRef } from ".";
const observeFn = (el) => el;

export const FPContext = createContext({
  getIndex: (el: any) => 0 as number,
  isFullscreen: false,
  ReactFPRef: null as FPItemRef,
  slides: [] as FPItemRef[],
  subscribe: observeFn,
  unsubscribe: observeFn,
});
