import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { BurgerContext } from '../../services/burger-context';

import { apiURL } from '../../utils/constants'
import { useSelector, useDispatch } from 'react-redux';
import { LOADED, LOADING, ERROR } from '../../services/actions/loading';

function App() {
  const [data, setData] = React.useState();

  const dispatch = useDispatch();

  const { isLoading, isError } = useSelector(store => ({
    isLoading: store.loading.isLoading,
    isError: store.loading.isError
  }));
  
  React.useEffect(() => {
    const getResource = async (url) => {
      dispatch({ type: LOADING });
      try {
        const res = await fetch(`${apiURL}${url}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Could not fetch ${url}, received ${response.status}`)
            };
            return response.json();
          })
          .then((json) => {
            dispatch({ type: LOADED });
            return json;
          })
          .catch(() => {
            dispatch({ type: ERROR });
          });
        return await res;
      } catch (err) {
        dispatch({ type: ERROR });
        console.log(err);
      }
    };

    const getAllIngredients = async () => {
      try {
        const res = await getResource(`/ingredients`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllIngredients();
  }, [dispatch]);

  return (
    <div className="app">
      <BurgerContext.Provider value={{ data }}>
        <AppHeader />
        <main className={styles.main}>
          <div className={`${styles.container} ${styles.main__wrapper}`}>
            <h1 className={`${styles.head} text text_type_main-large mt-10 mb-5`}>Собери бургер</h1>
            <div className={styles['main__content-items']}>
              {isLoading ? <p className={styles['main__loading']}>Загрузка</p> :
                <>
                  {isError ? <p className="text text_type_main-defalult">Ошибка, обратитесь к администратору сайта</p> :
                    <>
                      <div className={styles['main__content-item']}>
                        {data && <BurgerIngredients />}
                      </div>
                      <div className={styles['main__content-item']}>
                        {data && <BurgerConstructor />}
                      </div>
                    </>
                  }
                </>
              }
            </div>
          </div>
        </main>
      </BurgerContext.Provider>
    </div >
  );
}

export default App;
