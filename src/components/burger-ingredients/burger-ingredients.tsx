import React, { FC } from 'react';
import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { Link, useLocation } from 'react-router-dom';
import { TLocation } from 'types';
import { useAppDispatch, useAppSelector } from 'services/hooks';

const BurgerIngredients = () => {
    const location = useLocation<TLocation>();
    const dispatch = useAppDispatch();
    const { ingredientsData, ingredientsRequest, ingredientsFailed } = useAppSelector((store) => ({
        ingredientsData: store.ingredients.ingredientsData,
        ingredientsRequest: store.ingredients.ingredientsRequest,
        ingredientsFailed: store.ingredients.ingredientsFailed
    }));

    const [current, setCurrent] = React.useState<string>('buns');

    const scrollContainerRef = React.useRef(null);
    const buns = React.useRef(null);
    const sauces = React.useRef(null);
    const toppings = React.useRef(null);

    const scrollOptions = {
        block: "start",
        behavior: "smooth"
    }

    const scrollTo = (e: string) => {
        setCurrent(e);
        if (e === 'buns') {
            buns.current.scrollIntoView(scrollOptions);
        } else if (e === 'sauces') {
            sauces.current.scrollIntoView(scrollOptions);
        } else if (e === 'toppings') {
            toppings.current.scrollIntoView(scrollOptions);
        };
    };

    const handleScroll = (): void => {
        const scrollContainerPosition = scrollContainerRef.current.getBoundingClientRect().top;
        const firstHeaderPosition = buns.current.getBoundingClientRect().top;
        const secondHeaderPosition = sauces.current.getBoundingClientRect().top;
        const thirdHeaderPosition = toppings.current.getBoundingClientRect().top;

        const firstDiff = Math.abs(scrollContainerPosition - firstHeaderPosition);
        const secondDiff = Math.abs(scrollContainerPosition - secondHeaderPosition);
        const thirdDiff = Math.abs(scrollContainerPosition - thirdHeaderPosition);

        if (firstDiff < secondDiff && firstDiff < thirdDiff) {
            setCurrent('buns')
        } else if (secondDiff < firstDiff && secondDiff < thirdDiff) {
            setCurrent('sauces')
        } else {
            setCurrent('toppings')
        }
    };

    if (ingredientsRequest) {
        return <p className={null}>????????????????</p>
    }

    if (ingredientsFailed) {
        return <p className={null}>????????????, ???????????????????? ?? ???????????????????????????? ??????????</p>
    }

    return (
        <>
            <section className="ingredients">
                <div className={styles.ingredients__tabs}>
                    <Tab value="buns" active={current === 'buns'} onClick={scrollTo}>
                        ??????????
                    </Tab>
                    <Tab value="sauces" active={current === 'sauces'} onClick={scrollTo}>
                        ??????????
                    </Tab>
                    <Tab value="toppings" active={current === 'toppings'} onClick={scrollTo}>
                        ??????????????
                    </Tab>
                </div>
                <div className={styles.ingredients__content} ref={scrollContainerRef} onScroll={handleScroll}>
                    <div className="ingredients__wrapper" ref={buns}>
                        <h2 className={`${styles.ingredients__head} text text_type_main-medium`}>??????????</h2>
                        <div className={styles.ingredients__items}>
                            {ingredientsData.map((data) => {
                                if (data.type === "bun") {
                                    return (
                                        <div key={data._id} data-test='ingredient' className={styles['ingredients__item-wrapper']} onClick={() => {
                                            dispatch({ type: 'OPEN_MODAL', ingredientDetails: data });
                                        }}>
                                            <Link key={data._id} to={{
                                                pathname: `/ingredients/${data._id}`,
                                                state: { background: location }
                                            }} style={{ textDecoration: 'none' }}
                                            >
                                                <BurgerIngredient {...data} />
                                            </Link>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <div className="ingredients__wrapper" ref={sauces}>
                        <h2 className={`${styles.ingredients__head} text text_type_main-medium`}>??????????</h2>
                        <div className={styles.ingredients__items}>
                            <div className={styles.ingredients__items} >
                                {ingredientsData.map((data) => {
                                    if (data.type === "sauce") {
                                        return (
                                            <div key={data._id} data-test='ingredient' className={styles['ingredients__item-wrapper']} onClick={() => {
                                                dispatch({ type: 'OPEN_MODAL', ingredientDetails: data });
                                            }}>
                                                <Link key={data._id} to={{
                                                    pathname: `/ingredients/${data._id}`,
                                                    state: { background: location }
                                                }} style={{ textDecoration: 'none' }}
                                                >
                                                    <BurgerIngredient key={data._id} {...data} />
                                                </Link>
                                            </div>
                                        )
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="ingredients__wrapper" ref={toppings}>
                        <h2 className={`${styles.ingredients__head} text text_type_main-medium`}>??????????????</h2>
                        <div className={styles.ingredients__items}>
                            <div className={styles.ingredients__items} >
                                {ingredientsData.map((data) => {
                                    if (data.type === "main") {
                                        return (
                                            <div key={data._id} data-test='ingredient' className={styles['ingredients__item-wrapper']} onClick={() => {
                                                dispatch({ type: 'OPEN_MODAL', ingredientDetails: data });
                                            }}>
                                                <Link key={data._id} to={{
                                                    pathname: `/ingredients/${data._id}`,
                                                    state: { background: location }
                                                }} style={{ textDecoration: 'none' }}
                                                >
                                                    <BurgerIngredient key={data._id} {...data} />
                                                </Link>
                                            </div>
                                        )
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BurgerIngredients;