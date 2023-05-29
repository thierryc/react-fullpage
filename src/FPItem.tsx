import {
  useContext,
  createContext,
  useRef,
  useEffect,
  type CSSProperties,
  type ReactNode,
  type FC,
} from "react";
import { FPContext, FPItemRef } from ".";

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
  const FPItemRef: FPItemRef = useRef(null);

  useEffect(() => {
    subscribe(FPItemRef);

    return () => {
      unsubscribe(FPItemRef);
    };
  }, []);
  return (
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
  );
};
