import css from '../../components/burger-ingredients/burger-ingredients.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient, IngredientsCount } from '../../utils/types';
import { useDrag } from 'react-dnd';

type propsIngr = {
    ingr: Ingredient
    , ingredientsCounter: IngredientsCount
}

export default function IngredienParams({ ingr, ingredientsCounter }: propsIngr) {
    const [, dragRef] = useDrag({
        type: "ingredient",
        item: ingr,
    });
    
    return (
        <div className={css.product} ref={dragRef}>
            <img src={ingr.image} alt={ingr.name} />
            {(ingredientsCounter[ingr._id] !== undefined) && <Counter count={ingredientsCounter[ingr._id]} size="small" />}            
            <span className={css.price}>
                <p className={`${css.price} text text_type_digits-default`}>{ingr.price}</p>
                <CurrencyIcon type="primary" />
            </span>
            <span className="text text_type_main-small">
                {ingr.name}
            </span>
        </div>
    );
}