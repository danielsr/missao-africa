import React, { useState } from 'react';
import { useForm } from '../hooks';
import { Input, Button } from '../components';
import api from '../services/api';
import { setToken, redirectToReturnUrl } from '../services/auth';

function Login() {
  const { values, bindInput } = useForm({ email: '', password: '' });
  const [error, setError] = useState(false);

  const login = async () => {
    try {
      const resp = await api.login(values);
      setToken(resp.data);
      redirectToReturnUrl();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex items-center justify-center">
      <div className="shadow-lg rounded w-1/4">
        <div className="bg-blue-900 text-white p-3 rounded-t">Login</div>
        <div className="p-3">
          <Input label="E-mail" className="mb-2" {...bindInput('email')} />
          <Input label="Password" type="password" className="mb-2" {...bindInput('password')} />
          <Button label="Login" onClick={login} />
          {error && <div>Invalid user</div>}
        </div>
      </div>
    </div>
  );
}

export default Login;
