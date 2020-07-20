import React, { useState } from 'react';
import { useForm } from 'hooks';
import { Input, Button, Modal } from 'components';
import { InputType } from 'components/Input';
import api from 'services/api';
import { setToken, redirectToReturnUrl } from 'services/auth';
import useUser from './hooks';
import { ModalSize } from 'components/Modal';

function Login() {
  const { values, bindInput } = useForm();
  const [error, setError] = useState(false);
  const { setUser } = useUser();

  const login = async () => {
    try {
      const { data } = await api.login(values);
      setToken(data.token);
      setUser(data.user);
      redirectToReturnUrl();
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Modal title="Login" size={ModalSize.Small}>
      <Input label="E-mail" className="mb-2" {...bindInput('email')} />
      <Input
        label="Password"
        type={InputType.password}
        className="mb-2"
        {...bindInput('password')}
      />
      <Button className="mt-4" label="Login" onClick={login} />
      {error && <div>Invalid user</div>}
    </Modal>
  );
}

export default Login;
