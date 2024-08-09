import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { selectUserData } from '@slices';

export const AppHeader: FC = () => {
  const user = useSelector(selectUserData);
  return <AppHeaderUI userName={user?.name} />;
};
