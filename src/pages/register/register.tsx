import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { loginUser, registerUser, selectUserError } from '@slices';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({ email: email, name: userName, password: password })
    ).then(() => {
      dispatch(loginUser({ email: email, password: password }));
      return <Navigate to={'/'} />;
    });
  };

  return (
    <RegisterUI
      errorText={useSelector(selectUserError)}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
