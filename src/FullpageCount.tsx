import { useContext, type CSSProperties } from "react";
import FullpageContext from "./FullpageContext";

export interface FullpageCountInterface {
  style?: CSSProperties;
}
export default function FullpageCount({
  style = {},
}: FullpageCountInterface): JSX.Element {
  const { slides } = useContext(FullpageContext);

  return <span style={style}>{slides.length}</span>;
}
