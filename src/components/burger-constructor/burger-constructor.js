import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructor = (props) => {

    const amount = props.data.reduce((a, b) => a + b.price, 0);

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
        )
    }

    return (
        <section className={styles.burger}>
            <div>
                <div className={styles.burger__head}>
                    {props.data.map((data) => {
                        if (data._id === '60b646daabc9290027b206d7') {
                            return burgerElem(data, true, "top");
                        };
                        return null;
                    })}
                </div>
                <div className={styles.burger__list}>
                    {props.data.map((data) => {
                        if (data.type !== 'bun' && data._id !== '60b646daabc9290027b206d7') {
                            return burgerElem(data, false);
                        };
                        return null;
                    })}
                </div>
                <div className={styles.burger__footer}>
                    {props.data.map((data) => {
                        if (data._id === '60b646daabc9290027b206d7') {
                            return burgerElem(data, true, "bottom");
                        };
                        return null;
                    })}
                </div>
            </div>
            <div className={styles.burger__order}>
                <p className={`${styles.burger__amount} text text_type_main-large`}>{amount} <CurrencyIcon type="primary" /></p>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.array,
    price: PropTypes.number,
};

export default BurgerConstructor;