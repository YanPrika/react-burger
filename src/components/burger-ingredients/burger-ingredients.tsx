import React, {useRef} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-ingredients.module.css';
import data from '../../utils/data';

export const BurgerIngredients = () => {
    
    const bunsRef = useRef<HTMLHeadingElement>(null);
    const saucesRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);    

    const [current, setCurrent] = React.useState<string>('bun');   
    
    const bunArray = data.filter((item) => item.type === 'bun');
    const mainArray = data.filter((item) => item.type === 'main');
    const sauceArray = data.filter((item) => item.type === 'sauce');    

    return (
        <>
            <div className={`${css.column} pt-10 pl-5`}>
                <h1 className="text text_type_main-large">
                    Соберите бургер
                </h1>            
                <div className={css.fl}>
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </div>               

                <div className={css.scrollzone}>    
                    <h2 className="text text_type_main-medium pt-10 pl-5" ref={bunsRef}>
                        Булки
                    </h2>

                    <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4 pr-4`}>
                        {bunArray.map((item) => (
                            <>
                                <div className={css.product} >
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={1} size="default"/>
                                    <span className={css.inn_flex}>
                                        <span className="mr-3">{item.price}</span> <CurrencyIcon type="primary"/>
                                    </span>
                                        <span className="text text_type_main-small">
                                        {item.name}
                                    </span>                                
                                </div>
                            </>
                        ))}
                    </ul>
                    
                    <h2 className="text text_type_main-medium pt-10 pl-5" ref={saucesRef}>
                        Соусы
                    </h2>

                    <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4 pr-4`}>
                        {sauceArray.map((item) => (
                            <>
                                <div className={css.product} >
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={1} size="default"/>
                                    <span className={css.inn_flex}>
                                        <span className="mr-3">{item.price}</span> <CurrencyIcon type="primary"/>
                                    </span>
                                        <span className="text text_type_main-small">
                                        {item.name}
                                    </span>                                
                                </div>
                            </>
                        ))}
                    </ul>                        

                    <h2 className="text text_type_main-medium pt-10 pl-5" ref={mainRef}>
                        Начинки
                    </h2>

                    <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4 pr-4`}>
                        {mainArray.map((item) => (
                            <>
                                <div className={css.product} >
                                    <img src={item.image} alt={item.name}/>
                                    <Counter count={1} size="default"/>
                                    <span className={css.inn_flex}>
                                        <span className="mr-3">{item.price}</span> <CurrencyIcon type="primary"/>
                                    </span>
                                        <span className="text text_type_main-small">
                                        {item.name}
                                    </span>                                
                                </div>
                            </>
                        ))}
                    </ul>
                </div>
            </div>                
        </>             
    );
}

export default BurgerIngredients;