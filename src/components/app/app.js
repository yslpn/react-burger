import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { Route, Switch } from 'react-router-dom';
import { LoginPage, MainPage, NotFoundPage, ResetPassPage, RegPage, ProfilePage, IngredientsPage, ForgotPassPage } from '../../pages';

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegPage />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPassPage />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPassPage />
          </Route>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
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
