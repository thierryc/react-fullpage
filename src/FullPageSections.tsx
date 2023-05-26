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
} from "react";

import FullpageContext from "./FullpageContext";

export interface FullpageSectionInterface {
  children: ReactNode;
  //
  className?: string;
  style?: CSSProperties;
}
export default function FullpageSection({
  children,
  className = "",
  style = {},
}: FullpageSectionInterface): ReactElement {
  const { pageStyle, warperRef, transitionTiming, translateY, fullpageRef } =
    useContext(FullpageContext);

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
    <article name="Warper" style={pageStyle} ref={warperRef}>
      <section
        ref={fullpageRef}
        name="Inner"
        className={className}
        style={{
          transition: `transform ${transitionTiming}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
          transform: `translate3D(0, ${translateY}px, 0)`,
          ...useStyle,
        }}
      >
        {children}
      </section>
    </article>
  );
}
