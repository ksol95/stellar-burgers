import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { loginUser, registerUser, selectUserError } from '@slices';
import { useForm } from '../../components/hooks/useForm';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const { formValue, handleChange, setFormValue } = useForm<{
    name: string;
    email: string;
    password: string;
  }>({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser(formValue)).then(() => {
      dispatch(loginUser(formValue));
      return <Navigate to={'/'} />;
    });
  };

  return (
    <RegisterUI
      errorText={useSelector(selectUserError)}
      email={formValue.email}
      userName={formValue.name}
      password={formValue.password}
      handleInputChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
