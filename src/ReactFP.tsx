import {
  useState,
  useRef,
  useMemo,
  type CSSProperties,
  type ReactNode,
  type ElementType,
  type FC,
} from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { motion, type MotionProps } from "framer-motion";

import { FPContext, FSButton, type FPItemRef } from ".";

export interface ReactFPInterface {
  children: ReactNode;
  //
  Button?: ElementType;
  buttonStyle?: CSSProperties;
  className?: string;
  motionProps?: MotionProps;
  style?: CSSProperties;
}

export const ReactFP: FC<ReactFPInterface> = ({
  children,
  //
  Button = FSButton,
  buttonStyle = {},
  className = "",
  motionProps = {},
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

  const fullscreen = useRef(false);
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

  const handle = useFullScreenHandle();

  return (
    <FullScreen handle={handle}>
      <Button
        onClick={() => {
          {
            fullscreen.current ? handle.exit() : handle.enter();
          }
          return void (fullscreen.current = !fullscreen.current);
        }}
        style={{
          position: "fixed",
          left: 10,
          top: 10,
          zIndex: 9999,
          ...buttonStyle,
        }}
      />
      <FPContext.Provider
        value={{
          getIndex,
          ReactFPRef,
          slides,
          subscribe,
          unsubscribe,
        }}
      >
        <motion.div
          style={useStyle}
          ref={ReactFPRef}
          className={className}
          {...motionProps}
        >
          {children}
        </motion.div>
      </FPContext.Provider>
    </FullScreen>
  );
};
