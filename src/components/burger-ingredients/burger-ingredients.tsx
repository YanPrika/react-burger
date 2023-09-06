import React, { useState, useEffect, useRef } from 'react';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-ingredients.module.css';
import { Ingredient } from '../../utils/index';
import { getIngredients } from '../../utils/api';
import IngredientDetails from '../ingredient-details/ingredient-details';

const IngredienParams = ({ image, name, price }: Ingredient) => (
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

export const BurgerIngredients = ({ data }: {data: Ingredient[]}) => {
    
    let dataId: string;
    const [showModal, setShow] = useState(<></>);

    function showDialog(id: string) {

        setShow(<IngredientDetails dataId={id} onClose={hideDialog} /> as JSX.Element);
    }

    function hideDialog() {
        setShow(<></>);
    }

    const bunsRef = useRef<HTMLHeadingElement>(null);
    const saucesRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);

    const [current, setCurrent] = useState<string>('bun');    

    const bunArray = data?.filter((item) => item.type === 'bun');
    const mainArray = data?.filter((item) => item.type === 'main');
    const sauceArray = data?.filter((item) => item.type === 'sauce');

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
            {showModal}
            <div className={css.scrollzone}>
                <h2 className="text text_type_main-medium pt-10 pl-5" ref={bunsRef}>Булки</h2>
                
                <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                    {bunArray?.map((item) => (
                        <div className={css.product} data-id = {item._id} key={item._id} onClick={()=>{showDialog(item._id)}}>
                            <IngredienParams {...item} />                                                        
                        </div>
                    ))}                    
                </ul>

                <h2 className="text text_type_main-medium pt-10 pl-5" ref={saucesRef}>Соусы</h2>

                <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`} >
                    {sauceArray?.map((item) => (
                        <div className={css.product} data-id = {item._id} key={item._id} onClick={()=>{showDialog(item._id)}}>
                            <IngredienParams {...item} />                            
                        </div>
                    ))}
                </ul>

                <h2 className="text text_type_main-medium pt-10 pl-5" ref={mainRef}>Начинки</h2>

                <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`} >
                    {mainArray?.map((item) => (
                        <div className={css.product} data-id = {item._id} key={item._id} onClick={()=>{showDialog(item._id)}}>
                            <IngredienParams {...item} />                                                   
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default BurgerIngredients;