import {
  type CSSProperties,
  type FC,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useMemo,
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
  const useStyle = useMemo(
    () => ({
      height,
      ...style,
    }),
    [style]
  );

  const { subscribe, unsubscribe } = useContext(FPContext);
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
      style={useStyle}
      ref={FPItemRef}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
