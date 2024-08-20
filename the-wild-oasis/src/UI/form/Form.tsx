import { ReactNode, FormEventHandler } from "react";

interface Props {
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}
function Form({ children, onSubmit }: Props) {
  return <form onSubmit={onSubmit}>{children}</form>;
}

export default Form;
