import React from 'react';
import data from '../../utils/data';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../burger-ingredient/burger-ingredient.js'

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('buns');

    const buns = React.useRef(null);
    const sauces = React.useRef(null);
    const toppings = React.useRef(null);

    const scrollOptions = {
        block: "start", 
        behavior: "smooth"
    }

    const scrollTo = (e) => {
        setCurrent(e);
        if(e === 'buns') {
            buns.current.scrollIntoView(scrollOptions);
        } else if (e === 'sauces') {
            sauces.current.scrollIntoView(scrollOptions);
        } else if (e === 'toppings') {
            toppings.current.scrollIntoView(scrollOptions);
        }
    }

    return (
        <section className="ingredients">
            <div className={styles.ingredients__tabs}>
                <Tab value="buns" active={current === 'buns'} onClick={scrollTo}>
                    Булки
                </Tab>
                <Tab value="sauces" active={current === 'sauces'} onClick={scrollTo}>
                    Соусы
                </Tab>
                <Tab value="toppings" active={current === 'toppings'} onClick={scrollTo}>
                    Начинки
                </Tab>
            </div>
            <div className={styles.ingredients__content}>
                <div className="ingredients__wrapper" ref={buns}>
                    <h2 className={`${styles.ingredients__head} text text_type_main-medium`}>Булки</h2>
                    <div className={styles.ingredients__items}>
                        {data.map((data) => {
                            if (data.type === "bun") {
                                return (
                                    <BurgerIngredient key={data._id} {...data} />
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
                <div className="ingredients__wrapper" ref={sauces}>
                    <h2 className={`${styles.ingredients__head} text text_type_main-medium`}>Соусы</h2>
                    <div className={styles.ingredients__items}>
                        {data.map((data) => {
                            if (data.type === "sauce") {
                                return (
                                    <BurgerIngredient key={data._id} {...data} />
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
                <div className="ingredients__wrapper" ref={toppings}>
                    <h2 className={`${styles.ingredients__head} text text_type_main-medium`}>Начинки</h2>
                    <div className={styles.ingredients__items}>
                        {data.map((data) => {
                            if (data.type === "main") {
                                return (
                                    <BurgerIngredient key={data._id} {...data} />
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BurgerIngredients;