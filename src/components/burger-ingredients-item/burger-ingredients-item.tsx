import css from "./burger-ingredients-item.module.css";
import { mergeRefs } from "react-merge-refs";
import { useDrag, useDrop } from "react-dnd";
import { IngrType, Ingredient } from "../../utils/types";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { componentsSlice } from "../../services/reducers/components";

export default function BurgerIngredientsItem({ component, type = undefined }: { component: Ingredient, type?: IngrType }) {
  const { deleteComponent, moveComponent } = componentsSlice.actions;
  const componentDrag = component
  const dispatch = useDispatch();
  const isLocked = type === "top" || type === "bottom" ? true : false;
  const nameComponent = useMemo(
    function () {
      if (type === "top") {
        return component.name + " (верх)";
      } else if (type === "bottom") {
        return component.name + " (низ)";
      }
      return component.name;
    },
    [component, type]
  );

  const handledeleteButton = () => {
    dispatch(deleteComponent(component));
  };

  const [, dragRef] = useDrag({
    type: "component",
    item: component,
  });

  const [{ isHover }, dropComponent] = useDrop({
    accept: "component",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(componentDrop) {
      dispatch(moveComponent({ componentDrag, componentDrop }));
    },
  });

  return (
    <div
      {...(!isLocked && {
        ref: mergeRefs([dragRef, dropComponent]),
      })}
      className={`${css.component} ${isLocked ? css.component_type_locked : ""} ${isHover ? css.hover : ""}${type === "bottom" ? css.component_position_bottom : ""}mb-4`}
    >
      {!isLocked && <DragIcon type="primary" />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={nameComponent}
        price={component.price}
        thumbnail={component.image}
        handleClose={handledeleteButton}
      />
    </div>
  );
}










/* import { useState } from 'react';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/dataPropTypes';
import styles from './burger-ingredients-item.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { Ingredient } from '../../../utils';

function BurgerIngredientItem({ item, count }) {
    
    const [show, setShow] = useState(false);

    function showDialog() {
        setShow(true);
    }

    function hideDialog(e) {
        setShow(false);
        e.stopPropagation();
    }

    return (
        <li className={`${styles.card} mt-6 mb-8 ml-3 mr-2`} onClick={showDialog}>
            <img className={`${styles.image} ml-4 mr-4 mb-1`} src={item.image} alt="Детали ингредиент" />
            <div className={`${styles.price} mb-1`}>
                <span className="text text_type_digits-default mr-2">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={`${styles.title} text text_type_main-default`}>{item.name}</div>
            {count && count > 0 ? <Counter count={count} size="default" extraClass={styles.count} /> : undefined}
            {show && <IngredientDetails item={item} onClose={hideDialog} />}
        </li>
    );
}

BurgerIngredientItem.propTypes = {
    item: Ingredient.isRequired,
    count: PropTypes.number
}

export default BurgerIngredientItem; */