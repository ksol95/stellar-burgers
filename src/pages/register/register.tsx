import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { AppDispatch } from 'src/services/store';
import { useDispatch, useSelector } from '@store';
import { registerUser, userError, loginUser } from '@slices';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // dispatch(
    //   registerUserThunk({ email: email, name: userName, password: password })
    // ).then(() => {
    //   dispatch(loginUser({ email: email, password: password }));
    //   return <Navigate to={'/'} />;
    // });
    dispatch(
      registerUser({ email: email, name: userName, password: password })
    );
  };

  return (
    <RegisterUI
      errorText={useSelector(userError)}
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
