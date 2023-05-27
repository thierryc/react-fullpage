import {
  useState,
  useEffect,
  useRef,
  useContext,
  useMemo,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type ReactElement,
  type FC,
} from "react";

import {FPContext} from "./FPContext";

export interface FPContainerInterface {
  children: ReactNode;
  //
  className?: string;
  style?: CSSProperties;
}
export const FullpageSection: FC<FPContainerInterface> = ({
  children,
  className = "",
  style = {},
}) => {
  const { pageStyle, FPContainerOuterRef, transitionTiming, translateY, FPContainerInnerRef } =
    useContext(FPContext);

  const useStyle = useMemo(
    () => ({
      position: "absolute" as const,
      left: 0,
      right: 0,
      ...style,
    }),
    [style]
  );

  return (
    <div style={pageStyle} ref={FPContainerOuterRef}>
      <div
        ref={FPContainerInnerRef}
        className={className}
        style={{
          transition: `transform ${transitionTiming}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
          transform: `translate3D(0, ${translateY}px, 0)`,
          ...useStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}
