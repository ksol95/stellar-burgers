import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, userError } from '@slices';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const error = useSelector(userError);

  // useEffect(() => {
  //   dispatch(clearErrors());
  // }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    };
    dispatch(loginUser(userData));
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
