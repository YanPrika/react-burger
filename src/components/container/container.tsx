import css from "./container.module.css";
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

export default function container() {
    return (
        <main className={css.main_container}>
            <div className={css.content}>
                <BurgerIngredients />
                <BurgerConstructor />
            </div>
        </main>
    );
}
