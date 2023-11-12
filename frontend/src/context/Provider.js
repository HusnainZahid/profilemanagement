import React, { useState } from 'react';

const Context = React.createContext();

const Provider = (props) => {

  const [token, setToken] = useState(null);

  const getToken = () => {
    // localStorage.removeItem('Token')
    const login = JSON.parse(localStorage.getItem('Token'));
    return login
  }

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        getToken
      }}>
      {props.children}
    </Context.Provider>
  )
}

export { Provider, Context };