import { useUserStore } from 'app/stores/userStore';
import './loginForm.scss';

export default function LoginForm() {

  const {toggleLoginModal, isLoginModalOpen} = useUserStore();

  if(!isLoginModalOpen) {
    return null;
  }

  return (
    <div className="login__background" onClick={() => toggleLoginModal(false)}>
      <form className="login__modal" onClick={(e) => e.stopPropagation()}>
        <button className='login__modal__close' onClick={() => toggleLoginModal(false)}>x</button>
        <div className='login__modal__title'>Sign In</div>
        <div>
          <label>E-mail</label>
          <input className='login__modal__input' required type='email' />
        </div>
        <div>
          <label>Password</label>
          <input className='login__modal__input' required type='password' />
        </div>
        <div className='login__modal__forgot'>Forgot my password</div>
        <div className='d-flex space-between'>
          <input className='login__modal__button' type="submit" value='Sign In'/>
          <button className='login__modal__button' disabled>Register</button>
        </div>
        <div className='login__modal__mock'>
          Mocked user: userlogin@test.com, password: test123
        </div>
      </form>
    </div>
  )
}