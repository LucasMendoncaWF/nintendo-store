import { ReactNode, useState } from "react";
import './accordion.scss';

interface Props {
  title: string;
  children : ReactNode;
}

export default function Accordion ({title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div  className="accordion">
      <div className="accordion__title">
        {title}
        <button onClick={() => setIsOpen(!isOpen)}>
          <i className={`accordion__arrow ${isOpen ? 'down' : 'up'}`}></i>
        </button>
      </div>
      <div className={`accordion__content ${isOpen && 'open'}`}>
        {children}
      </div>
    </div>
  )
}