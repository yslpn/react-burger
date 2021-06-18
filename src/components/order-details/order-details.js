import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import done from '../../images/done.svg';

const OrderDetails = (props) => {
    return (
        <div className={styles.order}>
            <p className={styles['order__id']}>{props.data.order.number}</p>
            <p className={styles['order__id-text']}>идентификатор заказа</p>
            <img className={styles['order__done-img']} src={done} alt="Готово" width="120" height="120"/>
            <p className={styles['order__bottom-text']}>Ваш заказ начали готовить</p>
            <p className={`${styles['order__bottom-text']} ${styles['order__bottom-text--last']}`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

OrderDetails.propTypes = {
    data: PropTypes.object.isRequired
};

export default OrderDetails;