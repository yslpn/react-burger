import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const BurgerConstructor = (props) => {
    const amount = props.data.reduce((a, b) => a + b.price, 0);
    const [modalStatus, setmodalStatus] = React.useState(false);
    const toggleModal = () => setmodalStatus(!modalStatus);

    const burgerElem = (data, lock, position) => {
        return (
            <div className={styles.burger__item} key={data._id}>
                {position ? null : <DragIcon type="secondary" />}
                <ConstructorElement
                    thumbnail={data.image_mobile}
                    type={position}
                    isLocked={lock}
                    text={data.name}
                    price={data.price}
                />
            </div>
        );
    };

    return (
        <>
            <section className={styles.burger}>
                <div>
                    <div className={styles.burger__head}>
                        {props.data.map((data) => {
                            if (data.type === 'bun' && data.name === 'Краторная булка N-200i') {
                                return burgerElem(data, true, "top");
                            };
                            return null;
                        })}
                    </div>
                    <div className={styles.burger__list}>
                        {props.data.map((data) => {
                            if (data.type !== 'bun') {
                                return burgerElem(data, false);
                            };
                            return null;
                        })}
                    </div>
                    <div className={styles.burger__footer}>
                        {props.data.map((data) => {
                            if (data.type === 'bun' && data.name === 'Краторная булка N-200i') {
                                return burgerElem(data, true, "bottom");
                            };
                            return null;
                        })}
                    </div>
                </div>
                <div className={styles.burger__order}>
                    <p className={`${styles.burger__amount} text text_type_main-large`}>{amount} <CurrencyIcon type="primary" /></p>
                    <Button type="primary" size="large" onClick={toggleModal}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
            { modalStatus &&
                <Modal status={modalStatus} close={toggleModal}>
                    <OrderDetails />
                </Modal>
            }
        </>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.array.isRequired
};

export default BurgerConstructor;