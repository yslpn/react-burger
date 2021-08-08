import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import LoggedRoute from '../logged-route/logged-route';
import { 
  LoginPage, 
  MainPage, 
  NotFoundPage, 
  ResetPassPage, 
  RegPage, 
  ProfilePage, 
  IngredientsPage, 
  ForgotPassPage,
  OrdersPage } from '../../pages';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <Switch>
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
            <ResetPassPage />
          </LoggedRoute>
          <ProtectedRoute path="/profile" exact>
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact>
            <OrdersPage />
          </ProtectedRoute>
          <Route path="/ingredients/:id" exact>
            <IngredientsPage />
          </Route>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </main>
    </div >
  );
}

export default App;
