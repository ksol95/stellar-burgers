import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useDispatch } from '@hooks';
import { useEffect } from 'react';
import { getIngredients, checkUser } from '@slices';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  // Заголовок модальных окон с заказами
  const openingOrderNumber = useMatch('/profile/orders/:number')?.params.number;
  const openingFeedNumber = useMatch('/feed/:number')?.params.number;
  let openingModalTitle = openingOrderNumber || openingFeedNumber;
  openingModalTitle
    ? (openingModalTitle = '#' + openingModalTitle.padStart(6, '0'))
    : (openingModalTitle = ' ');

  useEffect(() => {
    console.count('app');
    dispatch(getIngredients());
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/ingredients/:id'
          element={
            <main className={styles.containerMain}>
              <h1 className={`${styles.title} text text_type_main-large`}>
                Детали ингредиента
              </h1>
              <IngredientDetails />
            </main>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <main className={styles.containerMain}>
              <h3 className={`${styles.title} text text_type_digits-default`}>
                {openingModalTitle}
              </h3>
              <OrderInfo />
            </main>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <main className={styles.containerMain}>
                <h3 className={`${styles.title} text text_type_digits-default`}>
                  {openingModalTitle}
                </h3>
                <OrderInfo />
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='*'
          element={
            <main className={`${styles.containerMain} mt-4`}>
              <NotFound404 />
            </main>
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={openingModalTitle} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title={openingModalTitle} onClose={() => navigate(-1)}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
