import React from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-constructor.module.css';
import data from '../../utils/data';

export const BurgerConstructor = () => {

    const orderSumm = 5080;	

    return (        
        <div className={`${css.column} pt-20 pl-10`}>
            <div >
                <div className={css.rowMiddleIngrTopBottom}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={data[0].image}
                    />
                </div>
                <div className={css.scrollzone}>
                    <div className={css.rowMiddleIngr}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            type={undefined}
                            text="Мини-салат Экзо-Плантаго"
                            price={4400}
                            thumbnail="https://code.s3.yandex.net/react/code/salad.png"
                        />
                    </div>
                    <div className={css.rowMiddleIngr}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            type={undefined}
                            text="Соус фирменный Space Sauce"
                            price={80}
                            thumbnail="https://code.s3.yandex.net/react/code/sauce-04.png"
                        />
                    </div>
                    <div className={css.rowMiddleIngr}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            type={undefined}
                            text="Мясо бессмертных моллюсков Protostomia"
                            price={1337}
                            thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"
                        />
                    </div>
                </div>
                <div className={css.rowMiddleIngrTopBottom}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={data[0].image}
                    />
                </div>
                <div className={css.total}>
                    <p className="text text_type_digits-medium">{orderSumm}</p>
                    <CurrencyIcon type="primary"/>
                    <Button htmlType="button" type="primary" size="medium" extraClass="ml-2">
                        Оформить заказ
                    </Button>                   
                </div>
            </div>
            
        </div>        
    )
}

export default BurgerConstructor;