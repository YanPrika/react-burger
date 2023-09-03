import React, { useState, useEffect, useRef } from 'react';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-ingredients.module.css';
import { Ingredient, ingredient } from '../../utils/index';
import { getIngredients } from '../../utils/api';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import BurgerIngredientItem from '../app/burger-ingredients-item/burger-ingredients-item';

const IngredienParams = ({ image, name, price }: ingredient) => (
    <div className={css.product} >
        <img src={image} alt={name} />
        <Counter count={1} size="small" />
        <span className={css.price}>
            <p className={`${css.price} text text_type_digits-default`}>{price}</p>
            <CurrencyIcon type="primary" />
        </span>
        <span className="text text_type_main-small">
            {name}
        </span>
    </div>
)

export const BurgerIngredients = ({  } ) => {
    
    let dataId = "";    

    const [arrIngr, setArrIngr] = useState<ingredient>();
    useEffect(() => {
        getIngredients()
        .then(async (res) => await res.json())
        .then((res) => setArrIngr(res.data))
    }, []);

    const [show, setShow] = useState(false);

    function showDialog() {
        setShow(true);        
    }

    function hideDialog() {
        setShow(false);        
    }

    const bunsRef = useRef<HTMLHeadingElement>(null);
    const saucesRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);

    const [current, setCurrent] = useState<string>('bun');    

    const bunArray = arrIngr?.filter((item) => item.type === 'bun');
    const mainArray = arrIngr?.filter((item) => item.type === 'main');
    const sauceArray = arrIngr?.filter((item) => item.type === 'sauce');
    /* console.log(arrIngr?.filter((item) => item._id === '643d69a5c3f7b9001cfa093c')); */
    return (
        <div className={`${css.column} pt-10 pl-5`}>
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1>
            <div className={css.fl}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
            </div>

            <div className={css.scrollzone}>
                <h2 className="text text_type_main-medium pt-10 pl-5" ref={bunsRef}>Булки</h2>
                
                <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`} onClick={showDialog}>
                    {bunArray?.map((item) => (
                        <div className={css.product} data-id = {item._id} key={item._id}>
                            <IngredienParams {...item} />
                            {show && <IngredientDetails dataId={item._id} onClose={hideDialog} />}                            
                        </div>
                    ))}                    
                </ul>

                <h2 className="text text_type_main-medium pt-10 pl-5" ref={saucesRef}>Соусы</h2>

                <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`} onClick={showDialog}>
                    {sauceArray?.map((item) => (
                        <div className={css.product} data-id = {item._id} key={item._id}>
                            <IngredienParams {...item} />
                            {show && <IngredientDetails dataId={item._id} onClose={hideDialog} />}
                        </div>
                    ))}
                </ul>

                <h2 className="text text_type_main-medium pt-10 pl-5" ref={mainRef}>Начинки</h2>

                <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`} onClick={showDialog}>
                    {mainArray?.map((item) => (
                        <div className={css.product} data-id = {item._id} key={item._id}>
                            <IngredienParams {...item} />
                            {show && <IngredientDetails dataId={item._id} onClose={hideDialog} />}                       
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BurgerIngredients;