import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import './selectWithSearch.scss';

interface Props {
  className?: string;
  value?: string;
  name: string;
  onChange: (value?: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  values?: {name: string, value: string}[];
}

export default function SelectWithSearch ({
  className,
  value,
  name,
  values,
  isLoading,
  isError,
  onChange
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const canShowList = !isLoading && !isError && !!values?.length;

  const onClickOption = (value: string) => {
    onChange(value);
    onClose();
  }

  const onClose = () => {
    setTimeout(() => {
      setIsOpen(false);
      const currValue = (document.getElementById(name) as HTMLInputElement)?.value;
      if(!values?.find(item => item.name === currValue)) {
        onChange('');
      }
    }, 100);
  }

  return (
    <div className="select-with-search" onBlur={onClose}>
      <input autoComplete="off" id={name} onFocus={() => setIsOpen(true)} value={value} name={name} onChange={(e) => onChange(e.target.value)} className={`primary-input ${className}`} />
      {isOpen &&
        <div className="select-with-search__options-modal">
          {isLoading &&
            <div className="d-flex justify-content-center">
              <Loader />
            </div>
          }
          {
            isError &&
            <ErrorMessage  message="An error occurred while fetching the countries" />
          }
          {
            canShowList &&
            values.sort((a, b) => a.name.localeCompare(b.name)).filter(item => !value || item.name.toLowerCase().includes(value?.toLowerCase())).map((item, index) =>
              <button key={index} onClick={() => onClickOption(item.value)} type="button" className="select-with-search__option">{item.name}</button>
            )
          }
        </div>
      }
    </div>
  )
}