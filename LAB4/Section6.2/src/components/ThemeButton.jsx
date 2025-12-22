import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function ThemeButton() {
  const theme = useContext(ThemeContext);

  return <button className={`button-${theme}`}>Themed Button ({theme})</button>;
}
