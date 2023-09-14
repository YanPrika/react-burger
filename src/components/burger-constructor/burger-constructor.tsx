import React, { useState, useMemo } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-constructor.module.css';
import { useModal } from '../modal/useModal';
import BurgerIngredientsItem from '../burger-ingredients-item/burger-ingredients-item';
import OrderDetails from '../order-details/order-details';
import { componentsSlice } from "../../services/reducers/components";
import { useSelector, useDispatch } from '../hooks/hooks';
import { useDrop } from 'react-dnd';
import { createOrder } from '../../services/actions/orders';
import { Ingredient } from '../../utils/types';
import uuid from "react-uuid";

export const BurgerConstructor = () => {

    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector((store: any) => store.ingredients);

    const dispatch = useDispatch();
    const [modal, showModal] = useModal();

    const { bunComponent, otherComponents } = useSelector(
        (store: any) => store.components
    );

    const { getComponent, clearConstructor } = componentsSlice.actions;
    const [{ isHover }, dropIngredient] = useDrop({
        accept: "ingredient",
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
        drop(ingredient) {
            dispatch(getComponent(ingredient));
        },
    });

    const orderAmount = useMemo(() => {
        return (
            (bunComponent ? bunComponent.price * 2 : 0) +
            otherComponents.reduce(function (previousValue: number, item: Ingredient) {
                return previousValue + item.price;
            }, 0)
        );
    }, [bunComponent, otherComponents]);

    const placeOrder = () => {
        if (orderAmount > 0) {
            showModal({ id: uuid(), children: <OrderDetails /> })
            dispatch(createOrder([...otherComponents, bunComponent]))
                .unwrap()
                .then(() => {
                    dispatch(clearConstructor());
                });
        }
    };

    return (
        <div className={`${css.column} pt-25 pl-10`}>
            <div >
                <section
                    className={`${css.section_container}`}
                    ref={dropIngredient}
                >
                    {
                        !bunComponent && otherComponents.length === 0 && (
                            <div className={css.instruction}>
                                <p className="text text_type_main-default pt-4">
                                    Перетащите в это поле ингридиенты из меню слева.
                                </p>
                            </div>
                        )
                    }
                    {
                        (bunComponent || otherComponents.length > 0) && (
                            <div
                                className={`${css.burger_components} ${isHover ? css.hover : ""
                                    } `}
                            >
                                {
                                    bunComponent && (
                                        <div className={`${css.components_container} pl-4 pr-4`}>
                                            <BurgerIngredientsItem component={bunComponent} type="top" />
                                        </div>
                                    )
                                }
                                {
                                    otherComponents.length !== 0 && (
                                        <div className={` ${css.components_container_scroll} pl-4 pr-2`}>
                                            {
                                                otherComponents.map((component: Ingredient) => {
                                                    return (<BurgerIngredientsItem component={component} key={component.key} />);
                                                })
                                            }
                                        </div>
                                    )
                                }
                                {
                                    bunComponent && (
                                        <div className={`${css.components_container} pl-4 pr-4`}>
                                            <BurgerIngredientsItem component={bunComponent} type="bottom" />
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className={css.total}>
                        <p className="text text_type_digits-medium">{orderAmount}</p>
                        <CurrencyIcon type="primary" />
                        <div onClick={placeOrder}>
                            <Button htmlType="button" type="primary" size="medium" extraClass="ml-2" disabled={(orderAmount > 0) ? false : true}>
                                Оформить заказ
                            </Button>
                        </div>
                        {modal}
                    </div>
                </section>
            </div >
        </div >
    )
}

export default BurgerConstructor;