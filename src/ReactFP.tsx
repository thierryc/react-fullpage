import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import {FPContext} from "./FPContext";

export interface ReactFPInterface {
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
export default function ReactFP({
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
}: ReactFPInterface): JSX.Element {
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

  const ReactFPRef = useRef<HTMLElement>(null);
  const FPContainerOuterRef = useRef<HTMLElement>(null);
  const FPContainerInnerRef = useRef<HTMLElement>(null);

  const getIndex = (slide) => {
    // if (slide.current) console.info('\n\n\n in getIndex', slide, slides.indexOf(slide))
    return slides.indexOf(slide);
  };

  const subscribe = (slide) => {
    // add new slide (push)
    // sort slide from top to bottom
    setSlides((prevSlides) => {
      const newSlides = [...prevSlides, slide].sort(({current: a }, {current: b}) => {
        const aTop = a.offsetTop;
        const bTop = b.offsetTop;
        return aTop - bTop;
      })
      // console.info('\n\n\n adding slide', prevSlides, newSlides)
      return newSlides
    });
    ticking.current = false;
    handleResize();

    return slide;
  };

  const unsubscribe = (slide) => {

    setSlides(prevSlides => {
      const newSlides = prevSlides.filter((s) => s !== slide)
      // console.info('\n\n\n removing slide', slide, prevSlides, newSlides)
      return newSlides
    })
    handleResize();
    handleScroll();

    return slide;
  };

  const handleScroll = () => {
    const { resetScroll, translateY, offsetHeight, viewportHeight } = pageState;

    console.info('\n\n\n handle scroll', slide, ticking, pageState)
    if (pageState.lockScroll) {
      // if > top and bottom < fix scroll
      window.scrollTo(0, translateY * -1);

      return false;
    }

    if (slide?.current) {
      if (
        window.pageYOffset >= slide.current.offsetTop &&
        (window.pageYOffset <=
          slide.current.offsetTop + offsetHeight - viewportHeight ||
          slide === slides[slides.length - 1])
      ) {
        setPageState({
          ...pageState,
          translateY: -window.pageYOffset,
          transitionTiming: 0,
        });
        return true;
      }
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

        // ticking.current = false;

        goto(
          slides.find((slide) => {
            const el = slide.current;

            return pageYOffset < el.offsetTop + el.offsetHeight * 0.5;
          })
        );
      });
    }

    ticking.current = true;
    return true;
  };

  const handleResize = () => {
    console.info('\n\n\n handle resize', ticking, FPContainerInnerRef, ReactFPRef)
    if (!ticking.current || !FPContainerInnerRef.current || !ReactFPRef.current) return;

    window.requestAnimationFrame(() => {
      const fullpageHeight = FPContainerInnerRef.current!.clientHeight;
      ticking.current = false
      // update count
      setPageState({
        ...pageState,
        fullpageHeight,
        viewportHeight: Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ),
      });

      ReactFPRef.current!.style.height = `${fullpageHeight}px`;
    });

    ticking.current = true;
  };

  const handleKeys = (event: KeyboardEvent) => {
    console.info('\n\n\n handle keys', slides);

    if (!keyboardShortcut) return true;

    const eventKey = event.code || event.keyCode;

    switch (event.code) {
      case 'PageDown':
      case 'ArrowRight':
      case 'ArrowDown': {
        event.preventDefault();
        return event.shiftKey ? last() : next();
      }
      case 'PageUp':
      case 'ArrowLeft':
      case 'ArrowUp': {
        event.preventDefault();
        return event.shiftKey ? first() : back();
      }
      case 'End': {
        event.preventDefault();
        return last();
      }
      case 'Home': {
        event.preventDefault();
        return first();
      }
    }

    return true;
  };

  const goto = (newSlide, resetScroll = false) => {
    const { transitionTiming, fullpageHeight, viewportHeight } = pageState;

    console.info('\n\n\n in goto', slide, newSlide, slide != newSlide);

    // TODO(noah): this is always false
    // ^ because after move it always resets to slide 0
    // ^ i.e. only the first move works, then it gets stuck on 0 != 0
    if (slide != newSlide) {
      console.info('\n\n\n in first check', slide, newSlide)
      const translateY = Math.max(
        (fullpageHeight - viewportHeight) * -1,
        newSlide.current.offsetTop * -1
      );

      if (onHide && typeof onHide === "function") {
        setTimeout(() => onHide(translateY), transitionTiming);
      }

      const newPageState = {
        ...pageState,
        slideIndex: getIndex(newSlide),
        translateY,
        lockScroll: true,
        offsetHeight: newSlide.current.offsetHeight,
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
    const index = pageState.slideIndex >= slides.length - 1
      ? 0
      : pageState.slideIndex + 1

    // console.info('\n\n\n in back', index, slides[index])
    goto(slides[index], true);
  };

  const next = () => {
    const index = pageState.slideIndex < (slides.length - 1)
      ? pageState.slideIndex + 1
      : 0;

    console.info('\n\n\n in next', pageState.slideIndex, index, slides[pageState.slideIndex], slides[index])
    if (slides[index]) goto(slides[index], true);
    else console.error('\n\n\n cant go to slide', index, slides)
  };

  const first = () => {
    // console.info('\n\n\n in first', slides[0])
    goto(slides[0], true);
  };

  const last = () => {
    // console.info('\n\n\n in last', slides[slides.length -1])
    goto(slides[slides.length - 1], true);
  };

  useEffect(() => {
    let listenersAdded = false;

    if (!listenersAdded) {
      console.info('\n\n\n wtf adding listeners again')
      listenersAdded = true;
      // handleResize()
      if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);
      }
      if (typeof document !== "undefined") {
        document.addEventListener("keydown", handleKeys);
      }
    }

    return () => {
      console.info('\n\n\n removing listeners')
      // set body height == to 'auto'
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      }
      if (typeof document !== "undefined") {
        document.removeEventListener("keydown", handleKeys);
      }

      listenersAdded = false;
    };
  });

  const { translateY, pageYOffset, offsetHeight, slideIndex, resetScroll } =
    pageState;

  console.info('\n\n\n wtf fullpage', {slides, slide, pageState})

  // TODO(noah): update the naming convention of components
  // ^this FUllpage component isnt the fullpage component
  // ^ the Fullpage component is actually the FUllpageSections component
  // ^ and this component is just a wrapper component
  return (
    <FPContext.Provider
      value={{
        back,
        FPContainerInnerRef,
        FPContainerOuterRef,
        getIndex,
        goto,
        next,
        offsetHeight,
        pageStyle: usePageStyle,
        pageYOffset,
        slideIndex,
        slides,
        subscribe,
        transitionTiming: pageState.transitionTiming,
        translateY,
        unsubscribe,
      }}
    >
      <div style={useStyle} ref={ReactFPRef}>
        {children}
      </div>
    </FPContext.Provider>
  );
}
