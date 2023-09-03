import React, { FC, useState, useEffect } from 'react';
import css from './ingredient-details.module.css';
import { getIngredients } from '../../utils/api';
import { ingredient } from '../../utils/index';
import Modal from '../modal/modal';
import ModalHeader from '../modal-header/modal-header';

const IngredientDetails: FC<{ dataId: string, onClose: any }> = ({ onClose, dataId }) => {

    /* const ingrStr = dataId;//"643d69a5c3f7b9001cfa093c"; */

    const [arrIngr, setArrIngr] = useState<ingredient>();
    useEffect(() => {
        getIngredients()
        .then(async (res) => await res.json())
        .then((res) => setArrIngr(res.data))
    }, []);

    const bunItem = arrIngr?.filter((item) => item._id === "643d69a5c3f7b9001cfa093c");
    
    return (
        <div>
            {bunItem?.map((item) => (
                <Modal onClose={onClose} key={item._id}>
                    <div className={css.modalHeader}><ModalHeader onClose={onClose} header='Детали ингредиента'/></div>
                    <div className={css.image}><img src={item.image_large} alt="Изображение ингридиента" /></div>
                    <p className={`${css.name} text-center text text_type_main-medium mb-8`}>{item?.name}</p>
                    <div className={`${css.detail} mb-15`}>
                        <div className={css['detail-item']}>
                            <div className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</div>
                            <div className="text-center text text_type_digits-default text_color_inactive">{item.calories}</div>
                        </div>
                        <div className={css['detail-item']}>
                            <div className="text text_type_main-default text_color_inactive mb-2">Белки, г</div>
                            <div className="text-center text text_type_digits-default text_color_inactive">{item.proteins}</div>
                        </div>
                        <div className={css['detail-item']}>
                            <div className="text text_type_main-default text_color_inactive mb-2">Жиры, г</div>
                            <div className="text-center text text_type_digits-default text_color_inactive">{item.fat}</div>
                        </div>
                        <div className={css['detail-item']}>
                            <div className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</div>
                            <div className="text-center text text_type_digits-default text_color_inactive">{item.carbohydrates}</div>
                        </div>
                    </div>
                </Modal>
            ))};
        </div>
    );
}

export default IngredientDetails;