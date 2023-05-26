import {
  useContext,
  createContext,
  useRef,
  useEffect,
  type CSSProperties,
  type ReactNode,
} from "react";

import FullpageContext from "./FullpageContext";

export const FullpageSectionContext = createContext(null);

export interface FullpageSectionInterface {
  children: ReactNode;
  //
  height?: string;
  style?: CSSProperties;
  className?: string;
  onShow?: Function;
  onHide?: Function;
}
export default function FullpageSection({
  children,
  //
  className = "",
  height = "100vh",
  onHide,
  onShow,
  style = {},
}: FullpageSectionInterface): JSX.Element {
  const { subscribe, unsubscribe, getIndex } = useContext(FullpageContext);
  const sectionRef = useRef(null);

  useEffect(() => {
    subscribe(sectionRef);

    return () => {
      unsubscribe(sectionRef);
    };
  }, []);
  return (
    <FullpageSectionContext.Provider
      value={{
        index: getIndex(sectionRef),
      }}
    >
      <section
        className={className}
        style={{
          height,
          ...style,
        }}
        ref={sectionRef}
      >
        {children}
      </section>
    </FullpageSectionContext.Provider>
  );
}
