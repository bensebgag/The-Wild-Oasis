import { ReactNode } from "react";

function Tbody({ children }: { children: ReactNode }) {
  return <tbody className="tbody">{children}</tbody>;
}

export default Tbody;
