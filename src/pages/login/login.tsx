import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { clearErrors, loginUser, selectUserError } from '@slices';
import { useForm } from '../../components/hooks/useForm';

interface ILoginForm {
  email: string;
  password: string;
}

export const Login: FC = () => {
  const dispatch = useDispatch();

  const { formValue, handleChange, setFormValue } = useForm<ILoginForm>({
    email: '',
    password: ''
  });

  const error = useSelector(selectUserError);

  useEffect(() => {
    dispatch(clearErrors());
  }, []);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(formValue));
  };

  return (
    <LoginUI
      errorText={error}
      email={formValue.email}
      password={formValue.password}
      handleInputChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
