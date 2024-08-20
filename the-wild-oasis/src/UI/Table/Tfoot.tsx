import { ReactNode } from "react";
function Tfoot({ children }: { children: ReactNode }) {
  return <tfoot className="tfoot">{children}</tfoot>;
}

export default Tfoot;
