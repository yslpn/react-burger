import BurgerConstructor from 'components/burger-constructor/burger-constructor';
import BurgerIngredients from 'components/burger-ingredients/burger-ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './main.module.css'
import { FC } from 'react';

const MainPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={`${styles.head} text text_type_main-large mt-10 mb-5`}>Собери бургер</h1>
            <div className={styles.wrapper}>
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
        </div>
    );
}

export default MainPage;