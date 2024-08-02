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
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      {/* Защищенные роутеры */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile'>
        <Route index element={<Profile />} />
        <Route path='orders' element={<ProfileOrders />} />
      </Route>
      <Route path='*' element={<NotFound404 />} />
      <Route
        path='/feed/:number'
        element={
          <Modal
            title=''
            onClose={() => {
              console.log('close');
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal
            title=''
            onClose={() => {
              console.log('close');
            }}
          >
            <IngredientDetails />
          </Modal>
        }
      />
      {/* Защищенный роутер */}
      <Route
        path='/profile/orders/:number'
        element={
          <Modal
            title=''
            onClose={() => {
              console.log('close');
            }}
          >
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;
