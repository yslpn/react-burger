import styles from './ingredient-details.module.css';
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const { ingredientDetails } = useSelector(store => ({
        ingredientDetails: store.modal.ingredientDetails
    }));

    return (
        <div className={styles.details}>
            <h3 className={styles['details__header']}>Детали ингредиента</h3>
            <img src={ingredientDetails.image_large} alt={ingredientDetails.name} width="420" height="240" />
            <p className={styles['details__name']}>{ingredientDetails.name}</p>
            <ul className={styles['details__list']}>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Калории, ккал</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{ingredientDetails.calories}</p>
                </li>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Белки, г</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{ingredientDetails.proteins}</p>
                </li>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Жиры, г</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{ingredientDetails.fat}</p>
                </li>
                <li className={styles['details__list-item']}>
                    <p className={styles['details__item-text']}>Углеводы, г</p>
                    <p className={`${styles['details__item-text']} ${styles['details__item-text--data']}`}>{ingredientDetails.carbohydrates}</p>
                </li>
            </ul>
        </div>
    );
}

export default IngredientDetails;