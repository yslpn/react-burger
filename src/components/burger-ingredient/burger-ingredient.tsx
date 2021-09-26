import React, { FC } from 'react';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { TIngredient } from "types"

const BurgerIngredient: FC<TIngredient> = React.memo((data) => {
    const { _id } = data;
    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: { _id },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        !isDrag &&
        <div ref={dragRef}>
            <button type="button" className={styles.ingredient} >
                {data.__v !== 0 ? <Counter count={data.__v} size="default" /> : null}
                <img className={styles.ingredient__image} src={data.image} alt={data.name} />
                <p className={styles.ingredient__price}>
                    <span className="mr-2">{data.price}</span>
                    <CurrencyIcon type="primary" />
                </p>
                <p className={styles.ingredient__name}>
                    {data.name}
                </p>
            </button>
        </div>
    );
});

export default BurgerIngredient;