import { useState } from 'react';
import './contactForm.scss';
import Loader from 'app/components/shared/Loader';

export default function ContactForm () {
  const initialValue = {email: '', name: '', subject: '', message: ''};
  const [fields, setFields] = useState<Record<string, string>>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);

  const onInputUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let newFields = {...fields};
    newFields[e.target.name] = e.target.value;
    setFields(newFields);
  }
  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    //Pretend to send a message
    setTimeout(() => {
      setFields(initialValue);
      setIsLoading(false);
      setIsSent(true);

      setTimeout(() => {
        setIsSent(false);
      }, 2000);
    }, 3000);
  }
  return (
    <form onSubmit={onSendMessage} className='contact-form'>
      <input onChange={onInputUpdate} value={fields.email} className='contact-form__input' name='email' type='email' placeholder='E-mail'/>
      <input onChange={onInputUpdate} value={fields.name} className='contact-form__input' name='name' type='text' placeholder='Name'/>
      <input onChange={onInputUpdate} value={fields.subject} className='contact-form__input' name='subject' type='text' placeholder='Subject'/>
      <textarea onChange={onInputUpdate} value={fields.message} className='contact-form__input' name="message" rows={6} placeholder='Message'/>
      <button type='submit'>Send</button>
      {isLoading && 
        <div className='contact-form__loader'>
          <Loader />
        </div>
      }
      {isSent && <div className='contact-form__success'>Message Sent!</div>}
    </form>
  )
}