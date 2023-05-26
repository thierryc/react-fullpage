import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import FullpageContext from "./FullpageContext";

export interface FullpageInterface {
  children: ReactNode;
  //
  className?: string;
  keyboardShortcut?: boolean;
  onChange?: Function;
  onHide?: Function;
  onShow?: Function;
  wrapperStyle?: CSSProperties;
  pageStyle?: CSSProperties;
  transitionTiming: number;
}
export default function Fullpage({
  children,
  //
  className = "",
  keyboardShortcut = true,
  onChange,
  onHide,
  onShow,
  wrapperStyle = {},
  pageStyle = {},
  transitionTiming = 700,
}: FullpageInterface): JSX.Element {
  const ticking = useRef(false);

  const useStyle = useMemo(
    () => ({
      position: "relative" as const,
      ...wrapperStyle,
    }),
    [wrapperStyle]
  );

  const usePageStyle = useMemo(
    () => ({
      left: 0,
      position: "fixed" as const,
      right: 0,
      top: 0,
      ...pageStyle,
    }),
    [pageStyle]
  );

  const [pageState, setPageState] = useState({
    fullpageHeight: 0,
    lockScroll: false,
    offsetHeight: 0,
    pageYOffset: 0,
    resetScroll: false,
    slideIndex: 0,
    transitionTiming,
    translateY: 0,
    viewportHeight: 0,
  });

  const [slide, setSlide] = useState(null);
  const [slides, setSlides] = useState<any[]>([]);

  const driverRef = useRef<HTMLElement>(null);
  const warperRef = useRef<HTMLElement>(null);
  const fullpageRef = useRef<HTMLElement>(null);

  const getIndex = (slide) => {
    return slides.indexOf(slide);
  };

  const subscribe = (slide) => {
    // add new slide (push)
    // sort slide for top to bottom
    setSlides(
      [...slides, slide].sort((a, b) => {
        const aTop = a.el.current.offsetTop;
        const bTop = b.el.current.offsetTop;
        return aTop - bTop;
      })
    );
    ticking.current = false;
    handleResize();

    return slide;
  };

  const unsubscribe = (slide) => {
    setSlides(slides.filter((s) => s.el !== slide.el));
    handleResize();
    handleScroll();

    return slide;
  };

  const handleScroll = () => {
    const { resetScroll, translateY, offsetHeight } = pageState;

    if (pageState.lockScroll) {
      // if > top and bottom < fix scroll
      window.scrollTo(0, translateY * -1);

      return false;
    }

    if (slide)
      if (
        slide &&
        window.pageYOffset >= slide.el.current.offsetTop &&
        (window.pageYOffset <=
          slide.el.current.offsetTop + offsetHeight - this.viewportHeight ||
          slide === slides[slides.length - 1])
      ) {
        setPageState({
          ...pageState,
          translateY: -window.pageYOffset,
          transitionTiming: 0,
        });
        return true;
      }

    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        if (resetScroll) {
          window.scrollTo(0, translateY * -1);
        }

        const pageYOffset = window.pageYOffset || 0;

        setPageState({
          ...pageState,
          pageYOffset,
          resetScroll: false,
          transitionTiming,
        });

        ticking.current = false;

        goto(
          slides.find((slide) => {
            const el = slide.el.current;

            return pageYOffset < el.offsetTop + el.offsetHeight * 0.5;
          })
        );
      });
    }

    ticking.current = true;
    return true;
  };

  const handleResize = () => {
    if (!ticking.current || !fullpageRef.current || !driverRef.current) return;

    window.requestAnimationFrame(() => {
      const fullpageHeight = fullpageRef.current!.clientHeight;
      // update count
      setPageState({
        ...pageState,
        fullpageHeight,
        ticking: false,
        viewportHeight: Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ),
      });

      driverRef.current!.style.height = `${fullpageHeight}px`;
    });

    ticking.current = true;
  };

  const handleKeys = (event: KeyboardEvent) => {
    if (!keyboardShortcut) return true;

    const eventKey = event.code || event.keyCode;

    if (
      eventKey === 33 || // pageUp:    33,
      eventKey === 37 || // left:      37,
      eventKey === 38 // up:        38,
    ) {
      event.preventDefault();
      return event.shiftKey ? first() : back();
    }
    if (
      eventKey === 34 || // pageDown:  34,
      eventKey === 39 || // right:     39,
      eventKey === 40 // down:      40,
    ) {
      event.preventDefault();
      return event.shiftKey ? last() : next();
    }
    if (
      eventKey === 35 // end:       35,
    ) {
      event.preventDefault();
      return last();
    }
    if (
      eventKey === 36 // home:      36,
    ) {
      event.preventDefault();
      return first();
    }

    return true;
  };

  // TODO: add update methode
  const update = () => {
    return this;
  };

  const goto = (newSlide, resetScroll = false) => {
    const { transitionTiming, fullpageHeight, viewportHeight } = pageState;

    if (slide !== newSlide && newSlide) {
      const translateY = Math.max(
        (fullpageHeight - viewportHeight) * -1,
        newSlide.el.current.offsetTop * -1
      );

      if (onHide && typeof onHide === "function") {
        setTimeout(() => onHide(translateY), transitionTiming);
      }

      const newPageState = {
        ...pageState,
        slideIndex: getIndex(newSlide),
        translateY,
        lockScroll: true,
        offsetHeight: newSlide.el.current.offsetHeight,
        resetScroll,
      };
      setPageState(newPageState);
      setSlide(newSlide);

      setTimeout(() => {
        setPageState({ ...pageState, lockScroll: false });
      }, 1000);

      if (onShow && typeof onShow === "function") {
        onShow(translateY);
      }
      // call back function
      if (typeof onChange === "function") {
        onChange({ ...newPageState, slide, slides });
      }
    }

    return newSlide;
  };

  const back = () => {
    const index = Math.max(0, pageState.slideIndex - 1);
    goto(slides[index], true);
  };

  const next = () => {
    const index = Math.min(slides.length - 1, pageState.slideIndex + 1);
    goto(slides[index], true);
  };

  const first = () => {
    goto(slides[0], true);
  };

  const last = () => {
    goto(slides[slides.length - 1], true);
  };

  useEffect(() => {
    handleResize();
    if (slides.length) setSlide(slides[0]);
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
    }
    if (typeof document !== "undefined") {
      document.addEventListener("keydown", handleKeys);
    }

    return () => {
      // set body height == to 'auto'
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      }
      if (typeof document !== "undefined") {
        document.removeEventListener("keydown", handleKeys);
      }
    };
  }, []);

  const { translateY, pageYOffset, offsetHeight, slideIndex, resetScroll } =
    pageState;

  // TODO(noah): update the naming convention of components
  // ^this FUllpage component isnt the fullpage component
  // ^ the Fullpage component is actually the FUllpageSections component
  // ^ and this component is just a wrapper component
  return (
    <FullpageContext.Provider
      value={{
        back,
        fullpageRef,
        getIndex,
        goto: (slide) => goto(slide, resetScroll),
        next,
        offsetHeight,
        pageYOffset,
        slideIndex,
        slides,
        pageStyle: usePageStyle,
        subscribe,
        transitionTiming: pageState.transitionTiming,
        translateY,
        unsubscribe,
        warperRef,
      }}
    >
      <div name="Driver" style={useStyle} ref={driverRef}>
        {children}
      </div>
    </FullpageContext.Provider>
  );
}
