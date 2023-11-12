import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './styles.css';
import { useRef, useState } from 'react';
import { APIRequest } from '../../api';

function Register() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [securepassword,setsecurepassword] = useState(true);
  
  const validation = () => {
    if(!emailRef?.current?.value || !passwordRef?.current?.value){
      alert('Please Enter Email and Password');
    } else if(passwordRef?.current?.value.length < 6){
      alert('Password must be at least 6 chars long')
    } else {
      ApiCall();
    }
  }

  const ApiCall = async () => {
    let body = {
      email:emailRef?.current?.value,
      password:passwordRef?.current?.value
    }
    const result = await APIRequest('signup','POST',null,JSON.stringify(body));
    console.log('RESULT',result);
      if(result?.status === 0){
        alert(result?.message)
      } else if(result?.accessToken) {
        localStorage.setItem('Token', JSON.stringify(result?.accessToken));
        navigate('/');
      } else if(result?.errors){
        alert(result?.errors[0]?.msg);
      }
  }

  return (
    <div className="container">
        <div className='card'>
        <h2>Welcome</h2>
        <Input placeholder={'Email'} lefticon={'fa fa-envelope'} type={'email'} refs={emailRef}/>
        <Input placeholder={'Password'} lefticon={'fa fa-key'} righticon={securepassword ? 'fa fa-eye-slash':'fa fa-eye'} 
        type={securepassword ? 'password':'text'} 
        refs={passwordRef} 
        iconClick={() => {
          if(securepassword === false){
            setsecurepassword(true);
          } else {
            setsecurepassword(false);
          }
          }}/>
        <Button title={'Register'} onClick={() => {validation()}} />
        <p>Already have an account? <Link className='link' to={'/login'}><b>Login</b></Link></p>
        </div>
    </div>
  );
}

export default Register;