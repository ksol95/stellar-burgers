import { FC, useMemo, Dispatch } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  orderPost,
  selectConstructor,
  burgerComposition,
  selectOrderDetails,
  selectOrderRequest,
  clearOrderDetails,
  clearConstructor,
  selectUserData
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const constructorItems = useSelector(selectConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderDetails);
  const burger = useSelector(burgerComposition);
  const isAuthChecked = useSelector(selectUserData);

  const onOrderClick = () => {
    if (!isAuthChecked) {
      navigate('/login', { state: { from: location } });
      return;
    }
    if (!constructorItems.bun || orderRequest) {
      console.error('Необходимо выбрать булку');
      return;
    }
    if (!constructorItems.ingredients.length) {
      console.error('Необходимо добавить ингредиенты');
      return;
    }

    // Отправляем собранный бургер на сервер, при успешном запросе очищаем конструктор
    burger && //finally?
      dispatch(orderPost(burger)).then(() => {
        dispatch(clearConstructor());
      });
  };

  const closeOrderModal = () => {
    //Окно закрывается если нету активного запроса заказа
    !orderRequest && dispatch(clearOrderDetails());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
