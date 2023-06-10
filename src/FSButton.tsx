import { CSSProperties, type FC, type MouseEventHandler } from "react";
import { motion, type MotionProps } from "framer-motion";

export const FSButton: FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  style: CSSProperties;
}> = ({ onClick, style }) => {
  const motionProps: MotionProps = {
    initial: {
      scale: 0,
    },
    animate: {
      rotate: 180,
      scale: 1,
    },
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  };

  return (
    <motion.button onClick={onClick} style={style} {...motionProps}>
      &#10021;
    </motion.button>
  );
};
