import { createContext, type RefObject } from "react";

import { FPItemRef } from ".";
const observeFn = (el) => el;

export const FPContext = createContext({
  getIndex: (el: any) => 0 as number,
  ReactFPRef: null as RefObject<HTMLDivElement>,
  slides: [] as RefObject<HTMLDivElement>[],
  subscribe: observeFn,
  unsubscribe: observeFn,
});
