import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";

const BurgerIngredient = (data) => {
    const { _id } = data;
    const [{isDrag}, dragRef] = useDrag({
        type: "ingredient",
        item: {_id},
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
                    <CurrencyIcon />
                </p>
                <p className={styles.ingredient__name}>
                    {data.name}
                </p>
            </button>
        </div>
    );
}

BurgerIngredient.propTypes = {
    __v: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default BurgerIngredient;