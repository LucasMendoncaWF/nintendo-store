import { useState } from 'react';

import ErrorMessage from '../ErrorMessage';
import Loader from '../Loader';
import './selectWithSearch.scss';

interface Props {
  className?: string;
  inputValue?: string;
  name: string;
  onChange: (value?: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  values?: { name: string; value: string }[];
}

export default function SelectWithSearch({
  className,
  inputValue,
  name,
  values,
  isLoading,
  isError,
  onChange,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const canShowList = !isLoading && !isError && !!values?.length;

  const onClickOption = (value: string) => {
    onChange(value);
    onClose();
  };

  const onClose = () => {
    setTimeout(() => {
      setIsOpen(false);
      const currValue = (document.getElementById(name) as HTMLInputElement)
        ?.value;
      if (!values?.find((item) => item.name === currValue)) {
        onChange('');
      }
    }, 100);
  };

  return (
    <div className="select-with-search" onBlur={onClose}>
      <input
        autoComplete="off"
        id={name}
        onFocus={() => setIsOpen(true)}
        value={inputValue}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        className={`primary-input ${className}`}
      />
      {isOpen && (
        <div className="select-with-search__options-modal">
          {isLoading && <Loader />}
          {isError && (
            <ErrorMessage message="An error occurred while fetching the countries" />
          )}
          {canShowList &&
            values
              .sort((a, b) => a.name.localeCompare(b.name))
              .filter(
                (item) =>
                  !inputValue ||
                  item.name.toLowerCase().includes(inputValue?.toLowerCase()),
              )
              .map((item, index) => (
                <button
                  key={index}
                  onClick={() => onClickOption(item.value)}
                  type="button"
                  className="select-with-search__option"
                >
                  {item.name}
                </button>
              ))}
        </div>
      )}
    </div>
  );
}
