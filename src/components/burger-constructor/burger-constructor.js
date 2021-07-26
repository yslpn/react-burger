import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { makeOrder } from '../../services/actions/order';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { modalIsOpened, orderDetails, orderItems, ingredientsData } = useSelector(store => ({
        modalIsOpened: store.modal.modalIsOpened,
        orderDetails: store.modal.orderDetails,
        orderItems: store.order.orderItems,
        ingredientsData: store.ingredients.ingredientsData
    }));
    const [amount, setAmount] = React.useState(0);

    const onDropHandler = (a) => {
        const item = ingredientsData.find(i => i._id === a._id);
        if (item.type === 'bun') {
            orderItems.map((elem) => {
                if (elem.type === 'bun') {
                    dispatch({ type: 'REMOVE_ITEM_FROM_ORDER', orderItems: elem });
                    dispatch({ type: 'DECREASE_COUNTER', ingredient: elem });
                }
                return null;
            })
        }
        dispatch({ type: 'ADD_ITEM_TO_ORDER', orderItems: item });
        dispatch({ type: 'INCREASE_COUNTER', ingredient: item });
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);
        },
    });

    const getBurgerElem = (data, index, lock, position) => {
        let name = data.name;
        if (position === 'top') {
            name += ' (верх)';
        } else if (position === 'bottom') {
            name += ' (низ)';
        }
        return (
            <div className={styles.burger__item} key={index}>
                {position ? null : <DragIcon type="secondary" />}
                <ConstructorElement
                    thumbnail={data.image_mobile}
                    type={position}
                    isLocked={lock}
                    text={name}
                    price={data.price}
                />
            </div>
        );
    };

    React.useEffect(() => {
        setAmount(orderItems.reduce((acc, i) => i.type === 'bun' ? acc + (i.price * 2) : acc + i.price, 0));
    }, [orderItems]);

    return (
        <div
            ref={dropTarget}
        >
            <section className={styles.burger}>
                <div>
                    <div className={styles.burger__head}>
                        {orderItems.map((elem, index) => elem.type === 'bun' ? getBurgerElem(elem, index, true, 'top') : null)}
                    </div>
                    <div className={styles.burger__list}>
                        {orderItems.map((elem, index) => elem.type !== 'bun' ? getBurgerElem(elem, index, false) : null)}
                    </div>
                    <div className={styles.burger__footer}>
                        {orderItems.map((elem, index) => elem.type === 'bun' ? getBurgerElem(elem, index, true, 'bottom') : null)}
                    </div>
                </div>
                <div className={styles.burger__order}>
                    <p className={`${styles.burger__amount} text text_type_main-large`}>
                        {amount}&nbsp;<CurrencyIcon type="primary" />
                    </p>
                    <Button type="primary" size="large" onClick={() => {
                        dispatch(makeOrder(orderItems));
                    }}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
            {modalIsOpened && orderDetails &&
                <Modal>
                    <OrderDetails />
                </Modal>
            }
        </div>
    );
}

export default BurgerConstructor;