import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


function App() {
  const [data, setData] = React.useState();
  const [hasError, setHasError] = React.useState(false);

  const apiURL = 'https://norma.nomoreparties.space/api';

  const getResource = async (url) => {
    try {
      const res = await fetch(`${apiURL}${url}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Could not fetch ${url}, received ${response.status}`)
          };
          return response.json();
        })
        .then((json) => {
          return json;
        })
        .catch(() => {
          setHasError(true);
        });

      return await res;
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const getAllIngredients = async () => {
      try {
        const res = await getResource(`/ingredients`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllIngredients();
  }, []);

  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <div className={`${styles.container} ${styles.main__wrapper}`}>
          <h1 className={`${styles.head} text text_type_main-large mt-10 mb-5`}>Собери бургер</h1>
          <div className={styles['main__content-items']}>
            {hasError ? <p className="text text_type_main-defalult">Ошибка, обратитесь к администратору сайта</p> :
              <>
                <div className={styles['main__content-item']}>
                  {data && <BurgerIngredients data={data} />}
                </div>
                <div className={styles['main__content-item']}>
                  {data && <BurgerConstructor data={data} />}
                </div>
              </>
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
