import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { TIngredient } from "types";
import { useAppSelector } from 'services/hooks';

const IngredientDetails = () => {
    const { ingredientDetails, ingredientsData } = useAppSelector((store) => ({
        ingredientDetails: store.modal.ingredientDetails,
        ingredientsData: store.ingredients.ingredientsData
    }));
    const { id } = useParams<{ id: string; }>();
    const currentIngredient = (id ? ingredientsData.find((item: TIngredient) => item._id === id) : null) || ingredientDetails;

    return (
        <div className={styles.details}>
            <h3 className={styles['details__header']}>Детали ингредиента</h3>
            <img src={currentIngredient.image_large} alt={currentIngredient.name} width="420" height="240" />
            <p className={styles['details__name']}>{currentIngredient.name}</p>
            <ul className={styles['details__list']}>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Калории, ккал</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{currentIngredient.calories}</p>
                </li>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Белки, г</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{currentIngredient.proteins}</p>
                </li>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Жиры, г</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{currentIngredient.fat}</p>
                </li>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Углеводы, г</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{currentIngredient.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;