import { CSSProperties, type FC, type MouseEventHandler } from "react";

export const FSButton: FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  style: CSSProperties;
}> = ({ onClick, style }) => (
  <button onClick={onClick} style={style}>
    &#10021;
  </button>
);
