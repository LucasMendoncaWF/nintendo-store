import './errorMessage.scss';

interface Props {
  message: string;
  type?: 'small-popup';
}

export default function ErrorMessage({ message, type }: Props) {
  return (
    <div className={`error-message error-message--${type || 'default'}`}>
      {message}
    </div>
  );
}
