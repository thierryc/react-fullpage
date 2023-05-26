import { useContext } from "react";

import FullpageContext from "./FullpageContext";

export interface FullpageNumberInterface {}
export default function FullpageNumber({}: FullpageNumberInterface): JSX.Element {
  const { slideIndex } = useContext(FullpageContext);

  return <span>{`${slideIndex + 1}`}</span>;
}
