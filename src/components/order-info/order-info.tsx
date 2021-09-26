import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-info.module.css';
import resultData from '../../utils/formate-date';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';
import { FC } from 'react';
import { TIngredient, TLocation } from "types";
import { useAppSelector } from 'services/hooks';

const OrderInfo: FC = () => {
    let location = useLocation<TLocation>();
    const history = useHistory();
    let background = history.action === 'PUSH' && location.state && location.state.background;

    const { ingredientsRequestSuccess, ingredientsData, feedOrders, profileOrders } = useAppSelector((store) => ({
        ingredientsRequestSuccess: store.ingredients.ingredientsRequestSuccess,
        ingredientsData: store.ingredients.ingredientsData,
        feedOrders: store.ws.feedOrders,
        profileOrders: store.ws.profileOrders,
    }));

    const { id } = useParams<{ id: string; }>();
    const currentItem = feedOrders.find((i): boolean => i.number === parseInt(id)) || profileOrders.find((i): boolean => i.number === parseInt(id));
    const filteredIngredients = currentItem.ingredients.map((item: string) => ingredientsData.find((element: TIngredient): boolean => element._id === item));
    
    const price = ingredientsRequestSuccess && filteredIngredients.reduce((prevValue: number, item: TIngredient) => {
        if (item.type === 'bun') {
            return prevValue + (item.price * 2)
        }
        return prevValue + item.price
    }, 0);

    return (
        ingredientsRequestSuccess &&
        <div className={styles.wrapper}>
            <p className={styles.number}>
                #{currentItem.number}
            </p>
            <p className={styles.name}>
                {currentItem.name}
            </p>
            <p className={styles.status} style={currentItem.status === 'done' ? { color: '#00CCCC' } : { color: '#F2F2F3' }}>
                {currentItem.status === 'done' ? 'Выполнен' : currentItem.status === 'canceled' ? 'Отменен' : 'Выполняется'}
            </p>
            <p className={styles.compound}>
                Состав:
            </p>
            <ul className={styles.ingredients}>
                {
                    filteredIngredients.map((item, index) => (
                        <li key={index} className={styles.ingredient_item}>
                            <Link to={{
                                pathname: `/ingredients/${item._id}`,
                                state: { background: location }
                            }} style={{ textDecoration: 'none' }}
                                target={background ? "_blank" : "_self"} rel="noopener noreferrer"
                                className={styles.ingredient_link}
                            >
                                <img className={styles.ingredient_img} src={item.image_mobile} alt={item.name} />
                                <p className={styles.ingredient_name}>
                                    {item.name}
                                </p>
                                <p className={styles.price_wrapper} >
                                    <span className={styles.price} >
                                        {item.type === 'bun' ? `2\u00A0x\u00A0${item.price}` : `1\u00A0x\u00A0${item.price}`}
                                    </span>
                                    <CurrencyIcon type="primary" />
                                </p>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <div className={styles.footer}>
                <time className={styles.time}>
                    {resultData(currentItem.createdAt)}
                </time>
                <p className={styles.price_wrapper} >
                    <span className={styles.price} >
                        {price}
                    </span>
                    <CurrencyIcon type="primary" />
                </p>
            </div>
        </div>
    );
}

export default OrderInfo;