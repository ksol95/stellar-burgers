import styles from './constructor-page.module.css';

import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { FC } from 'react';
import { getIngredients, isLoadingSelectors } from '@slices';
import { useDispatch, useSelector } from '@store';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector(isLoadingSelectors);
  //Загружаем ингредиенты
  isIngredientsLoading && dispatch(getIngredients());

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
