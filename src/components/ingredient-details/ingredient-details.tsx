import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI, Preloader } from '@ui';
import { getIngredients, selectIngredientById } from '@slices';
import { RootState, useDispatch, useSelector } from '@store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData =
    id && useSelector((state: RootState) => selectIngredientById(state, id));

  if (!ingredientData) {
    //Если нету ингедиентов, грузим их со стора
    const dispatch = useDispatch();
    //Загружаем ингредиенты
    dispatch(getIngredients());
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
