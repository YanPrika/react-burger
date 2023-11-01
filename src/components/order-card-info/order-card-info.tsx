import css from "../../components/order-card-info/order-card-info.module.css";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useMemo } from "react";
import { useSelector } from "../../hooks/hooks";
import { TOrderInfo, TIngredientWithCount } from "../../utils/types";

interface IOrderCardInfo {
  order: TOrderInfo;
  isModal?: boolean;
}

const OrderCardInfo: FC<IOrderCardInfo> = ({ order, isModal }) => {
  const { ingredients: ingredientsStore } = useSelector(
    (store) => store.ingredients
  );

  const { number, name, status, ingredients, createdAt } = order;

  let statusText;
  switch (status) {
    case "done":
      statusText = "Выполнен";
      break;
    case "created":
      statusText = "Создан";
      break;
    case "pending":
      statusText = "Готовится";
      break;
    default:
      statusText = "Статус заказа не известен";
      break;
  }

  const ingredientsOrderInfo = useMemo(() => {
    let ingredientsOrderData: TIngredientWithCount[] | [] = [];
    let orderAmountData: number = 0;
    ingredientsStore.forEach((ingredientStore) => {
      const ingredientsFilter = ingredients.filter((ingredient) => {
        return ingredient === ingredientStore._id;
      });
      if (ingredientsFilter.length) {
        let ingredientStoreWithCount: TIngredientWithCount = Object.assign(
          {},
          ingredientStore,
          {
            count: ingredientsFilter.length,
          }
        );

        ingredientsOrderData = [
          ...ingredientsOrderData,
          ingredientStoreWithCount,
        ];

        orderAmountData =
          orderAmountData +
          (ingredientStore.price * ingredientsFilter.length);
      }
    });
    return { ingredients: ingredientsOrderData, orderAmount: orderAmountData };
  }, [ingredients, ingredientsStore]);

  return (
    <div className={`${css.card_info} mb-10`}>
      <div
        className={`${css.container_title} mb-5 ${
          !isModal ? `${css.container_title_center}` : ""
        }`}
      >
        <h2 className="text text_type_digits-default">#{number}</h2>
      </div>

      <h3 className="text text_type_main-medium">{name}</h3>
      <div className={`${css.container_status} mt-2`}>
        <p className="text text_type_main-small">{statusText}</p>
      </div>
      <p className="text text_type_main-medium mt-15 mb-6">Соcтав:</p>
      <div className={`${css.container_ingredients} mb-10`}>
        {ingredientsOrderInfo.ingredients.map((ingredient) => {
          return (
            <div className={`${css.ingredient_item} mb-4`} key={ingredient._id}>
              <div className={`${css.ingredient_info}`}>
                <div
                  className={css.ingredient_image}
                  style={{
                    backgroundImage: `url(${ingredient.image})`,
                  }}
                ></div>
                <div className={`${css.ingredient_name} ml-4`}>
                  <p className="text text_type_main-default">
                  {ingredient.name}
                  </p>
                </div>
              </div>
              <div className={`${css.price}`}>
                <p className="text text_type_digits-default">{ingredient.count} x {ingredient.price}</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${css.container_time_price}`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </p>
        <div className={`${css.price}`}>
          <p className="text text_type_digits-default">{ingredientsOrderInfo.orderAmount}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderCardInfo);