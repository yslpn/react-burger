import FeedItem from "../../components/feed-item/feed-item"
import styles from './orders.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ProfileNav } from 'components/profile-nav';
import {
    WS_USER_CONNECTION_START,
    wsConnectionClosed
} from '../../services/actions/ws';

const OrdersPage = () => {
    const { userLogged, ingredientsRequestSuccess, profileOrders, getOrdersSuccess } = useSelector(store => ({
        userLogged: store.login.userLogged,
        ingredientsRequestSuccess: store.ingredients.ingredientsRequestSuccess,
        profileOrders: store.ws.profileOrders,
        getOrdersSuccess: store.ws.getOrdersSuccess
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_USER_CONNECTION_START });
        return () => dispatch(wsConnectionClosed())
    }, [dispatch]);

    return (
        !userLogged ? <Redirect to={'/login'} /> :
            <section>
                <div className={styles.wrapper}>
                    <ProfileNav>
                        В этом разделе вы можете просмотреть свою историю заказов
                    </ProfileNav>
                    <ul className={`${styles.main__content} ${styles.main__feed_list}`}>
                        {ingredientsRequestSuccess && getOrdersSuccess ?
                            profileOrders?.map((item, index) => (
                                <li className={styles.list__item} key={index}>
                                    <FeedItem item={item} link='orders' />
                                </li>
                            ))
                            : null
                        }
                    </ul>
                </div>
            </section>
    );
}

export default OrdersPage;