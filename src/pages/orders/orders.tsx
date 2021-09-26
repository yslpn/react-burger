import FeedItem from "../../components/feed-item/feed-item"
import styles from './orders.module.css';
import { useEffect, FC } from 'react';
import { Redirect } from 'react-router-dom';
import ProfileNav from 'components/profile-nav/profile-nav';
import {
    WS_USER_CONNECTION_START,
    wsConnectionClosed
} from '../../services/actions/ws';
import { useAppDispatch, useAppSelector } from 'services/hooks';

const OrdersPage: FC = () => {
    const { userLogged, ingredientsRequestSuccess, profileOrders, profileOrdersSuccess } = useAppSelector((store) => ({
        userLogged: store.login.userLogged,
        ingredientsRequestSuccess: store.ingredients.ingredientsRequestSuccess,
        profileOrders: store.ws.profileOrders,
        profileOrdersSuccess: store.ws.profileOrdersSuccess
    }));
    const dispatch = useAppDispatch();

    useEffect((): any => {
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
                        {ingredientsRequestSuccess && profileOrdersSuccess ?
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