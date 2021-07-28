import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import { makeOrder, dropToCart } from '../../services/actions/order';

const GetBurgerElem = ({ elem, index, lock, position, moveIngredient }) => {
    const dispatch = useDispatch();

    let name = elem.name;
    if (position === 'top') {
        name += ' (верх)';
    } else if (position === 'bottom') {
        name += ' (низ)';
    }

    const ref = React.useRef(null);

    const [, drop] = useDrop({
        accept: 'sort',
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag(
        {
            type: 'sort',
            item: () => {
                return { index };
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging()
            })

        }
    )

    const delHandler = (elem) => {
        dispatch({ type: 'REMOVE_ITEM_FROM_ORDER', orderItems: elem });
        dispatch({ type: 'DECREASE_COUNTER', ingredient: elem });
    }

    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref));

    return (
        <div ref={ref} className={styles.burger__item} key={index} style={{ opacity }}>
            {position ? null : <DragIcon type="secondary" />}
            <ConstructorElement
                thumbnail={elem.image_mobile}
                type={position}
                isLocked={lock}
                text={name}
                price={elem.price}
                handleClose={() => delHandler(elem)}
            />
        </div>
    );
};

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { modalIsOpened, orderDetails, orderItems, ingredientsData } = useSelector(store => ({
        modalIsOpened: store.modal.modalIsOpened,
        orderDetails: store.modal.orderDetails,
        orderItems: store.order.orderItems,
        ingredientsData: store.ingredients.ingredientsData
    }));
    const [amount, setAmount] = React.useState(0);

    const moveIngredient = (dragIndex, hoverIndex) => {
        const dragIngredient = orderItems[dragIndex];
        if (dragIngredient.type === 'bun') {
            return;
        }
        const newOrderItems = [...orderItems];
        newOrderItems.splice(dragIndex, 1);
        newOrderItems.splice(hoverIndex, 0, dragIngredient);

        dispatch({ type: 'ADD_FULL_ORDER_LIST', orderItems: newOrderItems });
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            dispatch(dropToCart(itemId, ingredientsData, orderItems));
        },
    });

    React.useEffect(() => {
        setAmount(orderItems.reduce((acc, i) => i.type === 'bun' ? acc + (i.price * 2) : acc + i.price, 0));
    }, [ingredientsData, orderItems]);

    return (
        <div
            ref={dropTarget}
        >
            <section className={styles.burger}>
                <div>
                    <div className={styles.burger__head}>
                        {orderItems.map((elem, index) => elem.type === 'bun' ? <GetBurgerElem key={index} elem={elem} index={index} lock={true} position={'top'} moveIngredient={moveIngredient} /> : null)}
                    </div>
                    <div className={styles.burger__list}>
                        {orderItems.map((elem, index) => elem.type !== 'bun' ? <GetBurgerElem key={index} elem={elem} index={index} lock={false} moveIngredient={moveIngredient} /> : null)}
                    </div>
                    <div className={styles.burger__footer}>
                        {orderItems.map((elem, index) => elem.type === 'bun' ? <GetBurgerElem key={index} elem={elem} index={index} lock={true} position={'bottom'} moveIngredient={moveIngredient} /> : null)}
                    </div>
                </div>
                <div className={styles.burger__order}>
                    <p className={`${styles.burger__amount} text text_type_main-large`}>
                        {amount}&nbsp;<CurrencyIcon type="primary" />
                    </p>
                    <Button type="primary" size="large" onClick={() => {
                        let { bun, ingredients } = false;

                        orderItems.map((i) => {
                            if (i.type === 'bun') {
                                bun = true;
                            } else if (i.type !== 'bun') {
                                ingredients = true;
                            }
                            return null;
                        })

                        if (bun && ingredients) {
                            dispatch(makeOrder(orderItems))
                        };
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