import React, { FC } from "react";
import css from "./order-details.module.css";
import Modal from "../modal/modal";
import vector from "../../images/vector.svg";
import checkmark from "../../images/checkmark.svg";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails: FC<{ order: string, onClose: any }> = ({ order, onClose }) => {
  return (
    <Modal onClose={onClose}>
        <div className={css.container}>            
            <p className="text text_type_digits-large pb-5">65464</p>
            <p className="text text_type_main-default pb-5">Идентификатор заказа</p>
            <div className={css.imageContainer}>                
                <img src={vector} className={css.rotate1} alt="Заказ принят" />                
                <img src={checkmark} className={css.checkmark} alt="Заказ принят" /> 
            </div >
            <div className={css.bottomContainer}>
                <p className={`${css.bottom1} text text_type_main-small`}>
                    Ваш заказ начали готовить
                </p>
                <p className={`${css.bottom2} text text_type_main-small`}>
                    Дождитесь готовности на орбитальной станции
                </p>
            </div>
        </div>
    </Modal>
  );
};

export default OrderDetails;