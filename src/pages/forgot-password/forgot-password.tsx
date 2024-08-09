import { FC, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';
import { useForm } from '../../components/hooks/useForm';

export const ForgotPassword: FC = () => {
  const { formValue, handleChange, setFormValue } = useForm<{
    email: string;
  }>({
    email: ''
  });
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    setError(null);
    forgotPasswordApi(formValue)
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

  return (
    <ForgotPasswordUI
      errorText={error?.message}
      email={formValue.email}
      handleInputChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};
