import React, { FC } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDrop, useDrag } from "react-dnd";
import { makeOrder, dropToCart, delElem } from '../../services/actions/order';
import { useHistory } from 'react-router-dom';
import { TIngredient } from 'types';
import { useAppDispatch, useAppSelector } from 'services/hooks';

interface IBurgerElem {
    elem: TIngredient;
    index: number;
    lock: boolean;
    position?: 'top' | 'bottom';
    moveIngredient: (a: number, b: number) => void;
}

const GetBurgerElem = (
    {
        elem,
        index,
        lock,
        position,
        moveIngredient
    }: IBurgerElem
) => {
    const dispatch = useAppDispatch();

    let name = elem.name;
    if (position === 'top') {
        name += ' (верх)';
    } else if (position === 'bottom') {
        name += ' (низ)';
    }

    const ref = React.useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'sort',
        hover: (item: { index: number }, monitor) => {
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
                handleClose={() => dispatch(delElem(elem))}
            />
        </div>
    );
};

const BurgerConstructor = () => {
    let history = useHistory();
    const dispatch = useAppDispatch();
    const { userLogged,
        modalIsOpened,
        modalIsLoading,
        orderDetails,
        orderItems,
        ingredientsData
    } = useAppSelector((store) => ({
        userLogged: store.login.userLogged,
        modalIsOpened: store.modal.modalIsOpened,
        modalIsLoading: store.modal.modalIsLoading,
        orderDetails: store.modal.orderDetails,
        orderItems: store.order.orderItems,
        ingredientsData: store.ingredients.ingredientsData
    }));
    const [amount, setAmount] = React.useState<number>(0);

    const moveIngredient = (dragIndex: number, hoverIndex: number): void => {
        const dragIngredient = orderItems[dragIndex];
        if (dragIngredient.type === 'bun') {
            return;
        }
        const newOrderItems = [...orderItems];
        newOrderItems.splice(dragIndex, 1);
        newOrderItems.splice(hoverIndex, 0, dragIngredient);

        dispatch({ type: 'ADD_FULL_ORDER_LIST', orderItems: newOrderItems });
    }

    const [{ isDragOver }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            dispatch(dropToCart(itemId, ingredientsData, orderItems));
        },
        collect: (monitor) => ({
            isDragOver: monitor.isOver(),
        })
    });

    const border = isDragOver ? '1px dashed #8585AD' : 'none';

    React.useEffect(() => {
        setAmount(orderItems.reduce((acc, i) => i.type === 'bun' ? acc + (i.price * 2) : acc + i.price, 0));
    }, [ingredientsData, orderItems]);

    return (
        <div
            ref={dropTarget}
            data-test='dropTarget'
        >
            <section className={styles.burger} style={{ border }}>
                <div>
                    <div className={styles.burger__head} data-test='container-bun'>
                        {orderItems.map((elem, index) => elem.type === 'bun' ? <GetBurgerElem key={index} elem={elem} index={index} lock={true} position={'top'} moveIngredient={moveIngredient} /> : null)}
                    </div>
                    <div className={styles.burger__list} data-test='container'>
                        {orderItems.map((elem, index) => elem.type !== 'bun' ? <GetBurgerElem key={index} elem={elem} index={index} lock={false} moveIngredient={moveIngredient} /> : null)}
                    </div>
                    <div className={styles.burger__footer} data-test='container-bun'>
                        {orderItems.map((elem, index) => elem.type === 'bun' ? <GetBurgerElem key={index} elem={elem} index={index} lock={true} position={'bottom'} moveIngredient={moveIngredient} /> : null)}
                    </div>
                </div>
                <div className={styles.burger__order}>
                    <p className={`${styles.burger__amount} text text_type_main-large`} data-test='burger-price'>
                        {amount}&nbsp;<CurrencyIcon type="primary" />
                    </p>
                    <Button type="primary" size="large" onClick={() => {
                        if (!userLogged) {
                            history.push('/login');
                            return;
                        }
                        let bun, ingredients;

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
                            dispatch({
                                type: 'LOADING_MODAL'
                            })
                            dispatch({
                                type: 'CLEAR_ORDER_ITEMS'
                            })
                            dispatch({
                                type: 'RESET_COUNTER'
                            })
                        };
                    }}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
            {(modalIsLoading || modalIsOpened) && orderDetails &&
                <Modal>
                    {modalIsLoading ? <p className={styles.loading}>Загрузка...</p> : <OrderDetails />}
                </Modal>
            }
        </div>
    );
}

export default BurgerConstructor;