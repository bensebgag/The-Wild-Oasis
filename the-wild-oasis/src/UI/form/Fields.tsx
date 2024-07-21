import { ReactNode } from "react";

function Fields({ children }: { children: ReactNode }) {
  return <div className="fields">{children}</div>;
}

export default Fields;
