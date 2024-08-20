import React, { ChangeEventHandler, ReactNode } from "react";
interface Props {
  children: ReactNode;
  isChecked: boolean;
  handleCheckboxChange: ChangeEventHandler<HTMLInputElement>;
}
const Checkbox: React.FC<Props> = ({
  children,
  isChecked,
  handleCheckboxChange,
}) => {
  return (
    <div className="checkbox">
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        {children}
      </div>
    </div>
  );
};

export default Checkbox;
