import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { useDispatch, useSelector } from '@store';
import { getFeeds, selectFeedOrders } from '@slices';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(selectFeedOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI
    orders={orders}
    handleGetFeeds={() => {
      dispatch(getFeeds());
    }}
  />;
};
