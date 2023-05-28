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

import { FPContext, type FPItemRef } from ".";

let throttled,
  ticking,
  lockScroll = false;

export interface FPContainerInterface {
  children: ReactNode;
  //
  className?: string;
  keyboardShortcut?: boolean;
  onChange?: Function;
  onHide?: Function;
  onShow?: Function;
  outerStyle?: CSSProperties;
  style?: CSSProperties;
  transitionTiming?: number;
}
export const FPContainer: FC<FPContainerInterface> = ({
  children,
  //
  className = "",
  keyboardShortcut = true,
  onChange,
  onHide,
  onShow,
  style = {},
  outerStyle = {},
  transitionTiming = 700,
}) => {
  const useOuterStyle = useMemo(
    () => ({
      left: 0,
      position: "fixed" as const,
      right: 0,
      top: 0,
      ...outerStyle,
    }),
    [outerStyle]
  );

  const useStyle = useMemo(
    () => ({
      position: "absolute" as const,
      left: 0,
      right: 0,
      ...style,
    }),
    [style]
  );

  const FPContainerInnerRef = useRef<HTMLDivElement>(null);

  const { ReactFPRef, slides, getIndex } = useContext(FPContext);

  const [slide, setSlide] = useState<FPItemRef>(null);

  const [pageState, setPageState] = useState({
    fullpageHeight: 0,
    offsetHeight: 0,
    scrollY: 0,
    resetScroll: false,
    slideIndex: 0,
    transitionTiming,
    translateY: 0,
    viewportHeight: 0,
  });

  const handleScroll = () => {
    if (throttled) return;
    throttled = true;

    // scroll first, then throttle
    setTimeout(() => {
      throttled = false;
    }, 200);

    console.info("\n\n\n handle scroll", slide, pageState);
    const { resetScroll, translateY, offsetHeight, viewportHeight } = pageState;

    if (lockScroll) {
      // if > top and bottom < fix scroll
      window.scrollTo(0, translateY * -1);
    } else if (
      slide?.current &&
      window.scrollY >= slide.current.offsetTop &&
      (window.scrollY <=
        slide.current.offsetTop + offsetHeight - viewportHeight ||
        slide === slides[slides.length - 1])
    ) {
      setPageState({
        ...pageState,
        translateY: -window.scrollY,
        transitionTiming: 0,
      });
    }
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (resetScroll) {
          window.scrollTo(0, translateY * -1);
        }

        const scrollY = window.scrollY || 0;

        setPageState({
          ...pageState,
          scrollY,
          resetScroll: false,
          transitionTiming,
        });

        goto(
          slides.find((slide) => {
            const el = slide.current;

            return scrollY < el.offsetTop + el.offsetHeight * 0.5;
          })
        );
        ticking = false;
      });
      ticking = true;
    }
  };

  const handleResize = () => {
    if (!FPContainerInnerRef.current) return;

    const curHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );

    // shortcircuit
    if (
      pageState.fullpageHeight === FPContainerInnerRef.current!.clientHeight &&
      pageState.viewportHeight === curHeight
    )
      return;

    console.info("\n\n\n handle resize", FPContainerInnerRef, ticking);
    if (!ticking) {
      console.info("\n\n handle resize: requesting animation frame");
      window.requestAnimationFrame(() => {
        const fullpageHeight = FPContainerInnerRef.current!.clientHeight;
        // update count
        setPageState((prevState) => ({
          ...prevState,
          fullpageHeight,
          viewportHeight: Math.max(
            document.documentElement.clientHeight,
            window.innerHeight
          ),
        }));
        ReactFPRef.current!.style.height = `${fullpageHeight}px`;
        ticking = false;
      });
      ticking = true;
    }
  };

  const handleKeys = (event: KeyboardEvent<Element>) => {
    if (!keyboardShortcut) return;

    switch (event.code) {
      case "PageDown":
      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault();
        event.stopPropagation();
        return next();
      }
      case "PageUp":
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault();
        event.stopPropagation();
        return back();
      }
      case "End": {
        event.preventDefault();
        event.stopPropagation();
        return last();
      }
      case "Home": {
        event.preventDefault();
        event.stopPropagation();
        return first();
      }
    }
  };

  const goto = (newSlide, resetScroll = false) => {
    const { transitionTiming, fullpageHeight, viewportHeight } = pageState;

    if (slide != newSlide) {
      const translateY = Math.max(
        (fullpageHeight - viewportHeight) * -1,
        newSlide.current.offsetTop * -1
      );

      // TODO(noah): no clue what the original author meant
      if (typeof onHide === "function") {
        setTimeout(() => onHide(translateY, transitionTiming));
      }

      lockScroll = true;

      const newPageState = {
        slideIndex: getIndex(newSlide),
        translateY,
        offsetHeight: newSlide.current.offsetHeight,
        resetScroll,
      };
      setPageState((prevState) => ({ ...prevState, ...newPageState }));
      setSlide(newSlide);

      setTimeout(() => {
        lockScroll = false;
      }, transitionTiming);

      // TODO(noah): no clue what the original author meant
      if (typeof onShow === "function") {
        onShow(newPageState);
      }
      // TODO(noah): no clue what the original author meant
      if (typeof onChange === "function") {
        onChange({ ...newPageState, slide, slides });
      }
    }
  };

  const last = () => {
    if (slides.length <= 1) return;

    goto(slides[slides.length - 1], true);
  };

  const back = () => {
    if (slides.length <= 1) return;

    switch (pageState.slideIndex) {
      case 0:
        return last();
      default:
        return goto(slides[pageState.slideIndex - 1], true);
    }
  };

  const first = () => {
    if (slides.length <= 1) return;

    goto(slides[0], true);
  };

  const next = () => {
    if (slides.length <= 1) return;

    switch (pageState.slideIndex) {
      case slides.length - 1:
        return first();
      default:
        return goto(slides[pageState.slideIndex + 1], true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
    }
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeys);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      }
      if (typeof document !== "undefined") {
        document.removeEventListener("keydown", handleKeys);
      }
    };
  });

  useEffect(() => {
    if (slides.length && !slide) goto(slides[0], true);
    handleResize();
  });

  return (
    <div style={useOuterStyle}>
      <div
        ref={FPContainerInnerRef}
        className={className}
        style={{
          transition: `transform ${transitionTiming}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
          transform: `translate3D(0, ${pageState.translateY}px, 0)`,
          ...useStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};
