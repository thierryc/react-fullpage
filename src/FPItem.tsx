import {
  useContext,
  useRef,
  useEffect,
  type CSSProperties,
  type ReactNode,
  type FC,
} from "react";
import { motion, type MotionProps } from "framer-motion";

import { FPContext, FPItemRef } from ".";

export interface FPItemInterface {
  children: ReactNode;
  //
  height?: string;
  style?: CSSProperties;
  className?: string;
  motionProps?: MotionProps;
}
export const FPItem: FC<FPItemInterface> = ({
  children,
  //
  className = "",
  height = "100vh",
  style = {},
  motionProps = {},
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
    <motion.div
      className={className}
      style={{
        height,
        ...style,
      }}
      ref={FPItemRef}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
