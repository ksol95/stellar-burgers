import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IngredientDetailsUI, Preloader } from '@ui';
import { getIngredients, ingredientsSelector } from '@slices';
import { AppDispatch } from 'src/services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(ingredientsSelector);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    //Если нету ингедиентов, грузим их со стора
    const dispatch = useDispatch<AppDispatch>();
    //Загружаем ингредиенты
    dispatch(getIngredients());
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
