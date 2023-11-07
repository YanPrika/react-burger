import css from "../../pages/order-info/order-info.module.css";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "../../hooks/hooks";
import OrderCardInfo from "../../components/order-card-info/order-card-info";
import { TOrderInfo } from "../../utils/types";
import { connect, wsClose } from "../../services/actions/orderFeed";
import { WS_URL_ORDER_FEED, WS_URL_ORDER_HISTORY, ROUTE_PROFILE, ROUTE_ORDER } from "../../utils/const";
import { WebsocketStatus } from "../../utils/types";
import { getCookie } from "../../utils/api";

const OrderInfo = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const accessToken = getCookie("token");

  let { orderId } = useParams();

  const [orderFound, setOrderFound] = useState("unknown");

  const { orders, status: statusWS } = useSelector((store) => store.orderFeed);

  useEffect(() => {
    if (location.pathname.includes(`${ROUTE_PROFILE}${ROUTE_ORDER}`)) {
      dispatch(connect(`${WS_URL_ORDER_HISTORY}?token=${accessToken}`));
    } else {
      dispatch(connect(WS_URL_ORDER_FEED));
    }
    return () => {
      dispatch(wsClose())
    }
  }, [dispatch, accessToken, location.pathname]);
 
  const orderInfo = useMemo(() => {
    if (orders.length) {
      const dataOrder = orders.find(function (item: TOrderInfo) {
        return item.number === Number(orderId);
      });
      if (dataOrder) {
        setOrderFound("found");
        return dataOrder;
      } else {
        setOrderFound("notfound");
        return;
      }
    }
  }, [orderId, orders]);

  return (
    <div className={`${css.content}  ${css.content_page_order_info}`}>
      {statusWS === WebsocketStatus.ONLINE ? (
        <>
          {orderFound === "found" && orderInfo && (
            <OrderCardInfo order={orderInfo} />
          )}
          {orderFound === "notfound" && (
            <>
              <p className="text text_type_main-default mt-10 mb-10">
                Заказ не найден.
              </p>
            </>
          )}
        </>
      ) : (
        <>
          {statusWS === WebsocketStatus.ERROR && (
            <p className="text text_type_main-default pt-4">
              Ошибка сервера: невозможно загрузить заказы.
            </p>
          )}
          {statusWS === WebsocketStatus.CONNECTING && (
            <p className="text text_type_main-default pt-4">
              Загрузка информации о заказе...
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default OrderInfo;