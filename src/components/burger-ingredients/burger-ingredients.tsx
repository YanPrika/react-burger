import React, {useRef} from 'react';
import {Tab, Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-ingredients.module.css';
import data from '../../utils/data';

interface IngredienParams {
    _id: string;
    name: string;
    price: number;
    image: string;
  } 

const IngredienParams = ({image, name, price}: IngredienParams ) => (
    <div className={css.product} >
        <img src={image} alt={name}/>
        <Counter count={1} size="small"/>
        <span className={css.price}>
            <p className={`${css.price} text text_type_digits-default`}>{price}</p> 
            <CurrencyIcon type="primary"/>
        </span>
            <span className="text text_type_main-small">
            {name}
        </span>                                
    </div>
)

export const BurgerIngredients = () => {
    
    const bunsRef = useRef<HTMLHeadingElement>(null);
    const saucesRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);    

    const [current, setCurrent] = React.useState<string>('bun');   
    
    const bunArray = data.filter((item) => item.type === 'bun');
    const mainArray = data.filter((item) => item.type === 'main');
    const sauceArray = data.filter((item) => item.type === 'sauce');   
    
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

                <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                    {bunArray.map((item) => (
                        <div className={css.product} key={item._id}>
                            <IngredienParams {...item}/>
                        </div>
                    ))}                    
                </ul>
                
                <h2 className="text text_type_main-medium pt-10 pl-5" ref={saucesRef}>Соусы</h2>

                <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                    {sauceArray.map((item) => (<div key={item._id}>
                            <IngredienParams {...item}/>
                        </div>
                    ))}
                </ul>                        

                <h2 className="text text_type_main-medium pt-10 pl-5" ref={mainRef}>Начинки</h2>

                <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                    {mainArray.map((item) => (<div key={item._id}>
                            <IngredienParams {...item}/>
                        </div>
                    ))}
                </ul>
            </div>
        </div>         
    );
}

export default BurgerIngredients;