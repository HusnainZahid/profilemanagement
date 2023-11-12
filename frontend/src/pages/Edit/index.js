import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './styles.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { APIRequest, IMAGE_BASE_URL } from '../../api';
import { Context } from '../../context/Provider';

function Edit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const [image,setImage] = useState();
  const contextApi = useContext(Context);
  const token = contextApi?.getToken();

  useEffect(() => {
    console.log(state?.profile)
    if(state?.profile){
      nameRef.current.value = state?.profile?.username;
      emailRef.current.value = state?.profile?.email;
    }
  },[])

    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
          setImage(event.target);
      }
    }

    const submitdata = async () => {
      var formdata = new FormData();
      formdata.append('username', nameRef?.current?.value);
      formdata.append('email', emailRef?.current?.value);
      if(image){
      formdata.append('image', image.files[0]);
      }
      console.log('formdata',formdata)
      const result = await APIRequest(`profile/${state?.profile?.id}`,"PUT",token,formdata);
      console.log('result',result);
      if(result?.status === 0){
        alert(result?.message)
      } else if(result?.message === 'Profile was updated successfully.') {
        navigate('/');
      } else if(result?.errors){
        alert(result?.errors[0]?.msg);
      }
    }

  return (
    <div className="edit_profile">
        <div className='edit_profile_card'>
        {image?.files || state?.profile?.image ? (
            <img onClick={onImageChange} alt="" className="profile_image" src={image?.files ? URL.createObjectURL(image?.files[0]):IMAGE_BASE_URL+state?.profile?.image}/>
          ):
        <div className='select_image'>
        <label htmlFor="files" className="file">+</label>
        <input id="files" onChange={onImageChange} style={{visibility:"hidden"}} type="file"/>
        </div>}
        <div className='change_image'>
        <label htmlFor="files" className="file">Change Image</label>
        <input id="files" onChange={onImageChange} style={{visibility:"hidden"}} type="file"/>
        </div>
        <Input placeholder={'Full Name'} lefticon={'fa fa-user'} type={'text'} refs={nameRef}/>
        <Input  placeholder={'Email'} lefticon={'fa fa-envelope'} type={'email'} refs={emailRef} />
        <Button title={'Submit'} onClick={() => {submitdata()}} />
        <div style={{marginBottom:'20px'}}/>
        </div>
    </div>
  );
}

export default Edit;