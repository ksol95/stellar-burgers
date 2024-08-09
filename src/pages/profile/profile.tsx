import { FC, SyntheticEvent, useEffect, useState, Dispatch } from 'react';

import { ProfileUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { selectUserData, updateUser } from '@slices';
import { Navigate } from 'react-router-dom';

export const Profile: FC = () => {
  // ### Профиль
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);

  if (!user) {
    return <Navigate to='/login' />;
  }

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    console.log('Рисуем форму');
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (isFormChanged) {
      // note: обновление пользователя (с сервера не приходит ошибка)
      dispatch(updateUser(formValue)).finally(() => {
        console.log('Данные пользователя обновлены');
        //Актуализируем форму
        setFormValue({ ...user, password: '' });
      });
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
