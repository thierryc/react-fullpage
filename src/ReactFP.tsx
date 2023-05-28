import {
  useState,
  useRef,
  useMemo,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type FC,
  type RefObject,
} from "react";

import { FPContext, type FPItemRef } from ".";

export interface ReactFPInterface {
  children: ReactNode;
  //
  className?: string;
  style?: CSSProperties;
}

export const ReactFP: FC<ReactFPInterface> = ({
  children,
  //
  className = "",
  style = {},
}) => {
  const useStyle = useMemo(
    () => ({
      position: "relative" as const,
      ...style,
    }),
    [style]
  );

  const [slides, setSlides] = useState<FPItemRef[]>([]);
  const ReactFPRef = useRef<HTMLDivElement>(null);

  const getIndex = (slide) => {
    return slides.indexOf(slide);
  };

  // set slides in lexical order
  const subscribe = (slide) =>
    setSlides((prevSlides) =>
      [...prevSlides, slide].sort(({ current: a }, { current: b }) => {
        const aTop = a.offsetTop;
        const bTop = b.offsetTop;
        return aTop - bTop;
      })
    );

  const unsubscribe = (slide) =>
    setSlides((prevSlides) => prevSlides.filter((s) => s !== slide));

  return (
    <FPContext.Provider
      value={{
        getIndex,
        ReactFPRef,
        slides,
        subscribe,
        unsubscribe,
      }}
    >
      <div style={useStyle} ref={ReactFPRef} className={className}>
        {children}
      </div>
    </FPContext.Provider>
  );
};
