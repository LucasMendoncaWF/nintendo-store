import { IMask, IMaskInput } from 'react-imask';
import "./cardForm.scss";
import { useState } from 'react';
import { CardPaymentModel } from 'app/models/paymentModel';

interface Props {
  onSubmit: (data: CardPaymentModel) => void;
}

export default function CardForm({onSubmit}: Props) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [errors, setError] = useState<string[]>([]);

  const validateForm = () => {
    const cleanCard = cardNumber.replace(/\s/g, '');
    const cleanCVC = cvc.replace(/\s/g, '');
    const nameValid = name.trim().length >= 3;
    const cardValid = /^\d{16}$/.test(cleanCard);
    const cvcValid = /^\d{3,4}$/.test(cleanCVC);

    const expiryValid = (() => {
      const [mm, yy] = expiry.split('/');
      if (!mm || !yy || mm.length !== 2 || yy.length !== 2) return false;

      const now = new Date();
      const inputDate = new Date(Number('20' + yy), Number(mm) - 1);
      const lastValidDate = new Date(now.getFullYear(), now.getMonth());

      return inputDate >= lastValidDate;
    })();

    const validationErrors = [];
    if (!nameValid) validationErrors.push("Please enter a valid name (at least 3 characters).");
    if (!cardValid) validationErrors.push("Card number must be 16 digits.");
    if (!expiryValid) validationErrors.push("Expiration date is invalid or in the past.");
    if (!cvcValid) validationErrors.push("CVC must be 3 or 4 digits.");

    return validationErrors;
  };

  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();

    //removes the error warnings after some time
    if (validationError.length) {
      setError(validationError);
      setTimeout(() => {
        setError([]);
      }, 10000);
      return;
    }
    
    setError([]);
    onSubmit({
      cardNumber,
      expiry,
      cvc,
      name,
    });
  };

  return (
    <form onSubmit={onSubmitForm} className="card-form d-flex wrap space-between">
      <input
        type="text"
        placeholder="Card Holder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="primary-input"
        maxLength={100}
        required
      />
      <IMaskInput
        mask="0000 0000 0000 0000"
        value={cardNumber}
        onAccept={(value) => setCardNumber(value)}
        placeholder="Card Number"
        className="primary-input"
        required
      />
      <IMaskInput
        mask="MM/YY"
        blocks={{
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
          },
          YY: {
            mask: IMask.MaskedRange,
            from: 25,
            to: 99,
          },
        }}
        value={expiry}
        onAccept={(value) => setExpiry(value)}
        placeholder="Expiry (MM/AA)"
        className="primary-input card-form__input-half"
        required
      />
      <IMaskInput
        mask="0000" 
        value={cvc}
        onAccept={(value) => setCvc(value)}
        placeholder="CVC"
        required
        className="primary-input card-form__input-half"
      />

      <div className="card-form__pay-button d-flex">
        <button className='primary-button' type="submit">
          Pay
        </button>
      </div>
      {!!errors.length && 
        <div className="card-form__error-message">
          {errors.map((error, index) => <li key={index}>{error}</li>)}
        </div>
        }
    </form>
  );
}