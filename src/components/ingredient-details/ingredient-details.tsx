import React, { FC } from 'react';
import css from './ingredient-details.module.css';
import { Ingredient } from '../../utils/types';

const IngredientDetails: FC<{ dataId: string | undefined, data: Ingredient[] }> = ({  dataId, data }) => {

    const bunItem = data?.filter((item) => item._id === dataId);

    return (
        <div>
            {bunItem?.map((item, index:number) => (
                <div key={index}>
                    
                    <div className={css.header} >
                        <h3 className={`text text_type_main-large ${css.title}`}>Детали ингредиента</h3>
                    </div>
                    <div className={css.image} ><img src={item.image_large} alt="Изображение ингридиента" /></div>
                    <p className={`${css.name} text-center text text_type_main-medium mb-8`} >{item?.name}</p>
                    <div className={`${css.detail} mb-15`}>
                        <div className={css['detail-item']}>
                            <div className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</div>
                            <div className="text-center text text_type_digits-default text_color_inactive" >{item.calories}</div>
                        </div>
                        <div className={css['detail-item']}>
                            <div className="text text_type_main-default text_color_inactive mb-2">Белки, г</div>
                            <div className="text-center text text_type_digits-default text_color_inactive" >{item.proteins}</div>
                        </div>
                        <div className={css['detail-item']}>
                            <div className="text text_type_main-default text_color_inactive mb-2">Жиры, г</div>
                            <div className="text-center text text_type_digits-default text_color_inactive" >{item.fat}</div>
                        </div>
                        <div className={css['detail-item']}>
                            <div className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</div>
                            <div className="text-center text text_type_digits-default text_color_inactive" key={item._id}>{item.carbohydrates}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default IngredientDetails;