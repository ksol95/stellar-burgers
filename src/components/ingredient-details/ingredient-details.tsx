import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { IngredientDetailsUI, Preloader } from '@ui';
import { selectIngredientById } from '@slices';
import { RootState, useSelector } from '@store';

export const IngredientDetails: FC = () => {
  // ### Подробно об ингредиенте
  const { id } = useParams();

  const ingredientData =
    id && useSelector((state: RootState) => selectIngredientById(state, id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
