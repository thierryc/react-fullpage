import { useContext, useMemo, type CSSProperties } from "react";

import FullpageContext from "./FullpageContext";

export interface FullpageNavigationInterface {
  style?: CSSProperties;
  itemStyle?: CSSProperties;
  reverse?: boolean;
}
// TODO: do navigation
export default function FullpageNavigation({
  style = {},
  itemStyle = {},
  reverse = false,
}: FullpageNavigationInterface): JSX.Element {
  const useStyle = useMemo(
    () => ({
      position: "fixed" as const,
      height: "100vh",
      display: "flex",
      flexDirection: "column" as const,
      flexWrap: "nowrap" as const,
      justifyContent: "center",
      listStyleType: "none",
      paddingRight: "1em",
      right: 0,
      top: 0,
      zIndex: 100,
      ...style,
    }),
    [style]
  );

  const { slideIndex, slides, transitionTiming, goto } =
    useContext(FullpageContext);

  const useItemStyle = useMemo(
    () => ({
      backgroundColor: reverse ? "white" : "black",
      borderRadius: "50%",
      transition: `all ${transitionTiming * 0.5}ms ease-in-out`,
      ...itemStyle,
    }),
    [itemStyle, transitionTiming, reverse]
  );

  return (
    <div style={useStyle}>
      {slides.map((slide, i) => (
        <div key={i}>
          <div
            style={{
              ...useItemStyle,
              height: slideIndex === i ? 14 : 10,
              margin: slideIndex === i ? 3 : 5,
              opacity: slideIndex === i ? 1 : 0.5,
              width: slideIndex === i ? 14 : 10,
            }}
            onClick={() => goto(slide)}
            onKeyDown={() => goto(slide)}
            role="button"
            tabIndex={-1}
            aria-label={`Slide ${i}`}
          >
            {/* TODO(noah) useless? */}
            <span
              style={{
                display: "none",
              }}
            >
              {`slide slideIndex ${i}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
