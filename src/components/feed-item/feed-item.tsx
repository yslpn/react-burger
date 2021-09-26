import styles from './feed-item.module.css'
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import resultData from '../../utils/formate-date';
import { RootState } from 'index';
import { FC } from 'react';
import { TIngredient, TLocation } from "types";

interface IFeedItem {
  item: any;
  link: any;
}

const FeedItem: FC<IFeedItem> = ({ item, link }) => {
  let location = useLocation<TLocation>();
  const { ingredientsData } = useSelector((store: RootState) => ({
    ingredientsData: store.ingredients.ingredientsData,
  }));

  const { number, name, status, createdAt, ingredients } = item;
  
  const filteredIngredients = ingredients.map((item: string) => ingredientsData.find((element: TIngredient): boolean => element._id === item));

  const price = filteredIngredients.reduce((prevValue: number, item: TIngredient) => prevValue + item.price, 0);

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
            <CurrencyIcon type='primary' />
          </p>
        </div>
      </article>
    </Link>
  );
}

export default FeedItem;