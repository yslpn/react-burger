import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Switch, useLocation } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import LoggedRoute from '../logged-route/logged-route';
import {
  LoginPage,
  MainPage,
  NotFoundPage,
  RegPage,
  ProfilePage,
  IngredientPage,
  ForgotPassPage,
  OrdersPage,
  FeedPage
} from '../../pages';

import { useEffect } from 'react';
import { getUser } from '../../services/actions/login';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();
  let location = useLocation();
  let background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <Switch location={background || location}>
          <LoggedRoute path="/login" exact>
            <LoginPage />
          </LoggedRoute>
          <LoggedRoute path="/register" exact>
            <RegPage />
          </LoggedRoute>
          <LoggedRoute path="/forgot-password" exact>
            <ForgotPassPage />
          </LoggedRoute>
          <LoggedRoute path="/reset-password" exact>
            <ForgotPassPage />
          </LoggedRoute>
          <ProtectedRoute path="/profile" exact>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact>
            <OrdersPage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact>
            <IngredientPage />
          </Route>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/feed" exact>
            <FeedPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>

        {background && (
          <Route path='/ingredients/:id' children={<MainPage />} />
        )}
      </main>
    </div >
  );
}

export default App;
