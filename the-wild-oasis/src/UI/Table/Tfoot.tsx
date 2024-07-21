import { ReactNode } from "react";

function Tfoot({ children }: { children: ReactNode }) {
  return <tbody className="tfoot">{children}</tbody>;
}

export default Tfoot;
