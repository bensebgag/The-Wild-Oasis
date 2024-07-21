import { ReactNode } from "react";
import "./Table.scss";
function Tabel({ children }: { children: ReactNode }) {
  return <table>{children}</table>;
}

export default Tabel;
