import React from 'react';
import { Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-constructor.module.css';
import data from '../../utils/data';

export const BurgerConstructor = () => {

    let orderSumm = 200 + 200;	

    return (
        <>
            <div className={`${css.column} pt-10 pl-5`}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={data[0].image}
                    />
                    <ConstructorElement
                        type={undefined}
                        text=""
                        price={0}
                        thumbnail=""
                    />
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={data[0].image}
                    />
                    <div className={css.total}>
                        <p className="text text_type_digits-medium">{orderSumm}</p>
                        <CurrencyIcon type="primary"/>
                        <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                            Оформить заказ
                        </Button>                   
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default BurgerConstructor;