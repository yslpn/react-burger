import React from 'react';
import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
    return (
        <div className={styles.details}>
            <h3 className={styles['details__header']}>Детали ингредиента</h3>
            <img src={props.data.image_large} alt={props.data.name} width="420" height="240"/>
            <p className={styles['details__name']}>{props.data.name}</p>
            <ul className={styles['details__list']}>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Калории, ккал</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{props.data.calories}</p>
                </li>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Белки, г</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{props.data.proteins}</p>
                </li>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Жиры, г</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{props.data.fat}</p>
                </li>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Углеводы, г</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{props.data.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

IngredientDetails.propTypes = {
    data: PropTypes.object.isRequired
};

export default IngredientDetails;