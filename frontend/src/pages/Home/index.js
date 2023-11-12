import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import './styles.css';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Provider';
import { APIRequest, IMAGE_BASE_URL } from '../../api';

function Home() {
  const navigate = useNavigate();
  const contextApi = useContext(Context);
  const token = contextApi?.getToken();
  const [profile,setProfile] = useState(null);

  useEffect(() => {
    if(token){
      getProfile()
    }
  },[token])

  const getProfile = async () => {
    console.log(token)
    const result = await APIRequest("profile","GET",token);
    console.log('result',result?.data[0]);
    result?.data?.map((item) => {
      if(item?.accessToken === token){
        setProfile(item);
      }
    })
  }

  return (
    <div className="profile">
      {profile ? (
        <div className='profile_card'>
        {profile?.image ? (
            <img alt="" className="profile_image" src={IMAGE_BASE_URL+profile?.image}/>
        ):<div className="profile_image"/>}
        {profile?.username ? (
        <div className='row'>
        <i className={'fa fa-user'}/>
        <p>{profile?.username}</p>
        </div>
        ):null}
        {profile?.email ? (
        <div className='row'>
        <i className={'fa fa-envelope'}/>
        <p>{profile?.email}</p>
        </div>
        ):null}
        <div className='row_btn'>
        <Button title={'Edit Profile'} onClick={() => {navigate('/edit',{state:{profile:profile}})}} />
        <div className='padding'/>
        <Button title={'Logout'} onClick={async() => {
          const result = await APIRequest("profile","GET",token);
          localStorage.removeItem('Token');
          navigate('/login');
          }}/>
        </div>
        <div style={{marginBottom:'20px'}}/>
        </div>
        ):null}
    </div>
  );
}

export default Home;