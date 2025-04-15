import { useUserStore } from 'app/stores/userStore';
import { loginPost } from 'app/services/login';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Loader from 'app/components/shared/Loader';
import './loginForm.scss';

export default function LoginForm() {

  const {toggleLoginModal, isLoginModalOpen, login, isLoggedIn} = useUserStore();
  const [fields, setFields] = useState<Record<string, string>>({email: '', password: ''});
  const [copied, setCopied] = useState(false);

  const {
    mutate: loginMutation,
    isError,
    isPending,
    reset: resetLoginMutation
  } = useMutation({
    async mutationFn () {
      return await loginPost(fields.email, fields.password);
    },
    onSettled(){
      setTimeout(() => {
        resetLoginMutation();
      }, 5000);
    },
    onSuccess(response){
      login(response.data);
      toggleLoginModal(false);
      setFields({email: '', password: ''});
    },
  })
  if(!isLoginModalOpen || isLoggedIn) {
    return null;
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation();
  }

  const onInputUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newFields = {...fields};
    newFields[e.target.name] = e.target.value;
    setFields(newFields);
  }

  const onClose = () => {
    if(!isPending) {
      toggleLoginModal(false)
    }
  }

  const onCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
  
  return (
    <div className="login__background" onClick={onClose}>
      {isPending && 
        <div className='login__loader'>
          <Loader />
        </div>
      }
      <form onSubmit={onSubmit} className="login__modal" onClick={(e) => e.stopPropagation()}>
        <button type='button' className='login__modal__close' onClick={onClose}>x</button>
        <div className='login__modal__title'>Sign In</div>
        <div>
          <label>E-mail</label>
          <input onChange={onInputUpdate} value={fields.email} name='email' className='primary-input' required type='email' />
        </div>
        <div>
          <label>Password</label>
          <input onChange={onInputUpdate} value={fields.password} name='password' className='primary-input' required type='password' />
        </div>
        <div className='login__modal__forgot'>Forgot my password</div>
        <div className='d-flex space-between'>
          <button className='login__modal__button' disabled={isPending} type="submit">Sign In</button>
          <button className='login__modal__button' disabled>Register</button>
        </div>
        <div className='login__modal__mock'>
          Mocked user: <button type='button' onClick={() => onCopy('userlogin@test.com')}>userlogin@test.com</button>, password: <button onClick={() => onCopy('test123')} type='button'>test123</button>
        </div>
        {copied && <div className='login__modal__copied'>Copied!</div>}
        {isError && <div className='login__modal__error'>The email or password typed is incorrect.</div>}
      </form>
    </div>
  )
}