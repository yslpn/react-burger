import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <div className={`${styles.container} ${styles.main__wrapper}`}>
          <h1 className={`${styles.head} text text_type_main-large mt-10 mb-5`}>Собери бургер</h1>
          <div className={styles['main__content-items']}>
            <DndProvider backend={HTML5Backend}>
              <div className={styles['main__content-item']}>
                <BurgerIngredients />
              </div>
              <div className={styles['main__content-item']}>
                <BurgerConstructor />
              </div>
            </DndProvider>
          </div>
        </div>
      </main>
    </div >
  );
}

export default App;
