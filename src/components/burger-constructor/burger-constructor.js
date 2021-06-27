import React from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { BurgerContext } from '../../services/burger-context';
import { apiURL } from '../../utils/constants'

const BurgerConstructor = () => {
    const [modalStatus, setModalStatus] = React.useState(false);
    const toggleModal = () => setModalStatus(!modalStatus);
    const { data } = React.useContext(BurgerContext);
    const [modalData, setModalData] = React.useState(undefined);

    const bun = data.filter(i => i.type === 'bun')[0];
    const filteredIngredients = data.filter(i => i.type !== 'bun');
    const amount = filteredIngredients.reduce((acc, i) => acc + i.price, 0) + bun.price * 2;

    let cart = { "ingredients": [...filteredIngredients, bun, bun].map((item) => item._id) }

    const sendResource = async (url, data) => {

        const res = await fetch(`${apiURL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Could not fetch ${url}, received ${response.status}`)
                };
                return response.json();
            })
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });

        return await res;
    };

    const makeOrder = async () => {
        try {
            const res = await sendResource('/orders', cart);
            setModalData(res);
        } catch (err) {
            console.log(err);
        }
    };

    const getBurgerElem = (data, lock, position) => {
        let name = data.name;
        if (position === 'top') {
            name += ' (верх)';
        } else if (position === 'bottom') {
            name += ' (низ)';
        }

        return (
            <div className={styles.burger__item} key={data._id}>
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

    return (
        <>
            <section className={styles.burger}>
                <div>
                    <div className={styles.burger__head}>
                        {getBurgerElem(bun, true, "top")}
                    </div>
                    <div className={styles.burger__list}>
                        {filteredIngredients.map((elems) => getBurgerElem(elems, false))}
                    </div>
                    <div className={styles.burger__footer}>
                        {getBurgerElem(bun, true, "bottom")}
                    </div>
                </div>
                <div className={styles.burger__order}>
                    <p className={`${styles.burger__amount} text text_type_main-large`}>
                        {amount}&nbsp;<CurrencyIcon type="primary" />
                    </p>
                    <Button type="primary" size="large" onClick={() => {
                        toggleModal();
                        makeOrder();
                    }}>
                        Оформить заказ
                    </Button>
                </div>
            </section>
            { modalStatus && modalData &&
                <Modal status={modalStatus} close={toggleModal}>
                    <OrderDetails data={modalData} />
                </Modal>
            }
        </>
    );
}

export default BurgerConstructor;