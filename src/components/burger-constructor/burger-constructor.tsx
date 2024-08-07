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
  clearConstructor
} from '@slices';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderDetails);
  const burger = useSelector(burgerComposition);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) {
      console.error('Необходимо выбрать булку');
      return;
    }
    if (!constructorItems.ingredients.length) {
      console.error('Необходимо добавить ингредиенты');
      return;
    }
    burger &&
      dispatch(orderPost(burger)).then(() => {
        dispatch(clearConstructor());
      });
  };

  const closeOrderModal = () => {
    if (!orderRequest) {
      dispatch(clearOrderDetails());
    }
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
