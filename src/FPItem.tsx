import {
  useContext,
  createContext,
  useRef,
  useEffect,
  type CSSProperties,
  type ReactNode,
  type FC,
} from "react";

import { FPContext } from "./FPContext";

export const FPItemContext = createContext(null);

export interface FPItemInterface {
  children: ReactNode;
  //
  height?: string;
  style?: CSSProperties;
  className?: string;
}
export const FPItem: FC<FPItemInterface> = ({
  children,
  //
  className = "",
  height = "100vh",
  style = {},
}) => {
  const { subscribe, unsubscribe, getIndex } = useContext(FPContext);
  const FPItemRef = useRef(null);

  useEffect(() => {
    subscribe(FPItemRef);

    return () => {
      unsubscribe(FPItemRef);
    };
  }, []);
  return (
    <FPItemContext.Provider
      value={{
        index: getIndex(FPItemRef),
      }}
    >
      <div
        className={className}
        style={{
          height,
          ...style,
        }}
        ref={FPItemRef}
      >
        {children}
      </div>
    </FPItemContext.Provider>
  );
};
