import { ReactNode, useEffect, useRef, useState } from "react";

interface OptionsProps {
  children: ReactNode;
}
export default function Options({ children }: OptionsProps) {
  const [Display, setDisplay] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function handleClickOption() {
    setDisplay(!Display);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node))
        setDisplay(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  return (
    <div ref={ref}>
      <ul onClick={handleClickOption} className="dotes">
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {Display && <ul className="options">{children}</ul>}
    </div>
  );
}
