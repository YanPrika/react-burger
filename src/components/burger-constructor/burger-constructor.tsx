import React, { useState, useEffect } from 'react';
import { Button, ConstructorElement, CurrencyIcon, Counter, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-constructor.module.css';
import { Ingredient, Test } from '../../utils/index';
import { getIngredients } from '../../utils/api';
import OrderDetails from '../app/order-details/order-details';

export const BurgerConstructor = () => {    

    const [arrIngr, setArrIngr] = useState<Ingredient[]>();
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

    const orderSumm  = arrIngr?.reduce((a,b) => (a + b.price), 0);    

    const bunArray = arrIngr?.filter((item) => item.type === 'bun');
    const mainArray = arrIngr?.filter((item) => item.type === 'main');
    const sauceArray = arrIngr?.filter((item) => item.type === 'sauce');

    const allInngrArray = mainArray?.concat(sauceArray !== undefined ? sauceArray : []);

    const bunItem = bunArray?.filter((item) => item._id === '643d69a5c3f7b9001cfa093c');

    return (
        <div className={`${css.column} pt-20 pl-10`}>
            <div >
                <div className={css.rowMiddleIngrTopBottom}>
                    {bunItem?.map((item) => (
                        <div className={css.product} key={item._id}>
                            <ConstructorElement
                                text={`${item.name} (верх)`}
                                thumbnail={item.image}
                                price={item.price}
                                type="top"
                                isLocked={(item.type === 'bun') ? true : false}
                                extraClass={undefined}
                                handleClose={undefined}
                            />                            
                        </div>
                    ))}
                </div>
                <div className={css.scrollzone}>
                    {allInngrArray?.map((item) => (
                        <div className={css.rowMiddleIngr} key={item._id}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                type={undefined}
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </div>
                    ))}
                </div>
                <div className={css.rowMiddleIngrTopBottom}>
                    {bunItem?.map((item) => (
                        <ConstructorElement
                            key={item._id}
                            text={`${item.name} (низ)`}
                            thumbnail={item.image}
                            price={item.price}
                            type="bottom"
                            isLocked={(item.type === 'bun') ? true : false}
                            extraClass={undefined}
                            handleClose={undefined}
                        />
                    ))}
                </div>
                <div className={css.total}>
                    <p className="text text_type_digits-medium">{orderSumm}</p>
                    <CurrencyIcon type="primary" />
                    <div onClick={showDialog}>
                        <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                            Оформить заказ
                        </Button>                        
                    </div>
                    {show && <OrderDetails order={''} onClose={hideDialog} />}
                </div>
            </div>

        </div>
    )
}

export default BurgerConstructor;