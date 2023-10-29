import React, { useMemo, useState } from 'react';
import { useSelector } from '../../hooks/hooks';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import css from './burger-ingredients.module.css';
import { Ingredient, IngredientsCount } from '../../utils/types';
import IngredientParams from '../ingredient-params/Ingredient-params';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerIngredients = () => {
    const { ingredients } = useSelector((store: any) => store.ingredients);
    const { bunComponent, otherComponents } = useSelector((store: any) => store.components);
    const [currentTab, setCurrentTab] = useState("bun");
    const location = useLocation();
    const navigate = useNavigate();

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
            <div className={css.scrollzone} onScroll={setActiveTab}>
                {
                    arrIngr.map((val, index:number) => (
                        <div key={index}>
                            <h2 id={val["typeId"]} className="text text_type_main-medium pt-10 pl-5">{val["type"]}</h2>
                            <ul className={`${css.ingredientsGroupList} pt-6 pb-8 pl-4`}>
                                {
                                    val["arr"]?.map((item: Ingredient) => (
                                        <div
                                            className={css.product}
                                            data-id={item._id}
                                            key={item._id}
                                            onClick={() => { navigate(`/ingredients/${item._id}`, { state: { background: location } }); }}
                                        >
                                            <IngredientParams ingr={item} ingredientsCounter={ingredientsCounter} />
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div >
        </div >
    );
}

export default BurgerIngredients;