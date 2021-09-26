import styles from './order-details.module.css';
import done from '../../images/done.svg';
import { FC } from 'react';
import { useAppSelector } from 'services/hooks';

const OrderDetails: FC = () => {
    const { orderDetails } = useAppSelector((store) => ({
        orderDetails: store.modal.orderDetails
    }));

    return (
        <div className={styles.order}>
            <p className={styles['order__id']}>{orderDetails.order.number}</p>
            <p className={styles['order__id-text']}>идентификатор заказа</p>
            <img className={styles['order__done-img']} src={done} alt="Готово" width="120" height="120" />
            <p className={styles['order__bottom-text']}>Ваш заказ начали готовить</p>
            <p className={`${styles['order__bottom-text']} ${styles['order__bottom-text--last']}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails;