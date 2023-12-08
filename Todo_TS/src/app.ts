import "./style.css";
import type { ParamsType } from "./components/Utils/TypeDeclare.ts";

export default function App({ $target }: ParamsType) {
  console.log($target);
}
