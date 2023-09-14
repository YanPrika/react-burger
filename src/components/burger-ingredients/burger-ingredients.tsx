import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-ingredients.module.css';
import { Ingredient, IngredientsCount } from '../../utils/types';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import IngredienParams from '../ingredient-params/Ingredient-params';

interface RootState {
    BurgerIngredients: any,
    burgerReducer: any,
    tabSwitchReducer: any,
    burgerConstructorReducer: any
}

export const BurgerIngredients = () => {

    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector((store: any) => store.ingredients);
    const { bunComponent, otherComponents } = useSelector((store: any) => store.components);

    const [showModal, setShow] = useState(<></>);
    const [currentTab, setCurrentTab] = useState("bun");



    function showDialog(id: string) {
        setShow(
            <Modal onClose={hideDialog} key={id}>
                <IngredientDetails dataId={id} data={ingredients} />
            </Modal> as JSX.Element
        );
    }

    function hideDialog() {
        setShow(<></>);
    }

    const setCurrent = (tab: any) => {
        setCurrentTab(tab);
        const el = document.getElementById(tab);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    const setActiveTab = () => {
        const tabPosition = document.getElementById("contTab")?.getBoundingClientRect().top || 0;
        const tabElement = ["bun", "main", "sauce"];
        const tabElementData = tabElement.map((item) => {
            return { type: item, position: Math.abs((document.getElementById(item)?.getBoundingClientRect().top || 0) - tabPosition) };
        });
        const activeTabElement = tabElementData.sort((a, b) => { return a.position - b.position; })[0]["type"];
        setCurrentTab(activeTabElement);
    }

    const arrIngr = [
        {
            arr: ingredients?.filter((item: { type: string }) => item.type === 'bun'),
            type: "Булки",
            typeId: "bun"
        },
        {
            arr: ingredients?.filter((item: { type: string }) => item.type === 'main'),
            type: "Начинки",
            typeId: "main"
        },
        {
            arr: ingredients?.filter((item: { type: string }) => item.type === 'sauce'),
            type: "Соусы",
            typeId: "sauce"
        }
    ];

    const ingredientsCounter = useMemo(() => {
        const counters: IngredientsCount = {};
        otherComponents.forEach((component: Ingredient) => {
            if (!counters[component._id]) {
                counters[component._id] = 0;
            }
            counters[component._id]++;
        });
        if (bunComponent) {
            counters[bunComponent._id] = 2;
        }
        return counters;
    }, [bunComponent, otherComponents]);

    return (
        <div className={`${css.column} pt-10 pl-5`}>
            <h1 className="text text_type_main-large">
                Соберите бургер
            </h1>
            <div className={css.fl} id="contTab">
                <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrent}>Булки</Tab>
                <Tab value="main" active={currentTab === 'main'} onClick={setCurrent}>Начинки</Tab>
                <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrent}>Соусы</Tab>
            </div>
            {showModal}
            <div className={css.scrollzone} onScroll={setActiveTab}>
                {
                    arrIngr.map((val, index) => (
                        <div key={index}>
                            <h2 id={val["typeId"]} className="text text_type_main-medium pt-10 pl-5">{val["type"]}</h2>
                            <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                                {
                                    val["arr"]?.map((item: Ingredient) => (
                                        <div className={css.product} data-id={item._id} key={item._id} onClick={() => { showDialog(item._id) }}>
                                            <IngredienParams ingr={{
                                                _id: item._id,
                                                name: item.name,
                                                type: item.type,
                                                proteins: item.proteins,
                                                fat: item.fat,
                                                carbohydrates: item.carbohydrates,
                                                calories: item.calories,
                                                price: item.price,
                                                image: item.image,
                                                image_mobile: item.image_mobile,
                                                image_large: item.image_large,
                                                __v: item.__v,
                                            }} ingredientsCounter={ingredientsCounter} />
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div >
    );
}

export default BurgerIngredients;