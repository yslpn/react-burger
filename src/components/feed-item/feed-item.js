import styles from './feed-item.module.css'
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import resultData from '../../utils/formate-date';

const FeedItem = ({ item, link }) => {
  let location = useLocation();
  const { ingredientsData } = useSelector(store => ({
    ingredientsData: store.ingredients.ingredientsData,
  }));

  const { number, name, status, createdAt, ingredients } = item

  const filteredIngredients = ingredients.map((item) => ingredientsData.find((element) => element._id === item));

  const price = filteredIngredients.reduce((prevValue, item) => prevValue + item.price, 0);

  return (
    <Link key={number} to={{
      pathname: `/${link === 'feed' ? 'feed' : 'profile/orders'}/${number}`,
      state: { background: location }
    }} style={{ textDecoration: 'none' }}
    >
      <article className={styles.order_item} >
        <header className={styles.header}>
          <p className={styles.number}>
            #{number}
          </p>
          <time className={styles.time}>
            {resultData(createdAt)}
          </time>
        </header>
        <h2 className={styles.title}>
          {name}
        </h2>
        <p className={styles.status} style={status === 'done' ? { color: '#00CCCC' } : { color: '#F2F2F3' }}>
          {status === 'done' ? 'Выполнен' : status === 'canceled' ? 'Отменен' : 'Выполняется'}
        </p>
        <div className={styles.list_wrapper}>
          <ul className={styles.ingredients}>
            {
              filteredIngredients.map((item, index) => (
                index < 5 ?
                  <li key={index} className={styles.ingredinet}>
                      {index === 4 && filteredIngredients.length > 5 &&
                        <span className={styles.more}>
                          +{filteredIngredients.length - 5}
                        </span>}
                      <img className={styles.img} src={item.image_mobile} alt={item.name} />
                  </li>
                  : null
              ))
            }
          </ul>
          <p className={styles.price__wrapper}>
            <span className={styles.price}>
              {price}
            </span>
            <CurrencyIcon />
          </p>
        </div>
      </article>
    </Link>
  );
}

export default FeedItem;