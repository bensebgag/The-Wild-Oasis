import { ReactNode } from "react";

interface OptionsProps {
  children: ReactNode;
}
function Thead({ children }: OptionsProps) {
  return (
    <thead className="thead">
      <tr>{children}</tr>
    </thead>
  );
}

export default Thead;
