import Home from './pages/Home/index';

import {Route,Routes, useNavigate} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Edit from './pages/Edit';
import { useContext, useEffect } from 'react';
import { Context } from './context/Provider';

function App() {
  const navigate = useNavigate();
  const contextApi = useContext(Context);
  const token = contextApi?.getToken();

  useEffect(() => {
    console.log('TOKEN',token)
    if(!token){
      navigate('/login')
    }
  },[contextApi])
  
  return (
    <>
    {contextApi ? (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/edit" element={<Edit/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    ):null}
  </>
  );
}

export default App;
