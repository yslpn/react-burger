import { useEffect } from 'react';
import styles from './feed.module.css'
import FeedItem from 'components/feed-item/feed-item';
import { useSelector, useDispatch } from 'react-redux';
import {
    WS_CONNECTION_START,
    wsConnectionClosed
} from '../../services/actions/ws';
import OrdersTable from 'components/orders-table/orders-table';

const FeedPage = () => {
    const { ingredientsRequestSuccess, feedOrders } = useSelector(store => ({
        ingredientsRequestSuccess: store.ingredients.ingredientsRequestSuccess,
        feedOrders: store.ws.feedOrders,
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
        return () => dispatch(wsConnectionClosed());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <h1 className={styles.head}>Лента заказов</h1>
            <div className={styles.wrapper}>
                <div className={styles.main__contents}>
                    {ingredientsRequestSuccess &&
                        <>
                            <ul className={`${styles.main__content} ${styles.main__feed_list}`}>
                                {feedOrders.map((item, index) => (
                                    <li className={styles.list__item} key={index}>
                                        <FeedItem item={item} link='feed' />
                                    </li>
                                ))}
                            </ul>
                            <div className={styles.main__content}>
                                <OrdersTable />
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default FeedPage;