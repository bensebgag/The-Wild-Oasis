import { ReactNode } from "react";

function Form({ children }: { children: ReactNode }) {
  return <form>{children}</form>;
}

export default Form;
