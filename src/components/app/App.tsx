import React, { useEffect } from 'react';
import css from '../app/app.module.css';
import { AppHeader } from '../app-header/app-header';
import { ProtectedRouteElement } from "../../components/protected-route";
import LoginPage from '../../pages/login-page/login';
import Page404 from '../../pages/404-page/not-found';
import Main from '../../pages/main-page/main';
import Orders from '../../pages/orders-page/orders';
import ForgotPassword from '../../pages/forgot-password-page/forgot-password';
import Profile from '../../pages/profile-page/profile';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Register from '../../pages/register-page/register';
import ResetPassword from '../../pages/reset-password-page/reset-password';
import ProfileForm from '../profile-form/profile-form';
import IngredientPage from '../../pages/Ingredient-page/IngredientPage';
import OrderCardInfo from "../order-card-info/order-card-info";
import OrderInfo from "../../pages/order-info/order-info";
import { getIngredients } from '../../services/actions/ingredients';
import { useSelector, useDispatch } from '../../hooks/hooks';
import Modal from '../modal/modal';
import { selectedIngredientSlice } from "../../services/reducers/selectedIngredient";
import { ROUTE_FORGOT_PASSWORD, ROUTE_INGREDIENTS, ROUTE_LOGIN, ROUTE_MAIN, ROUTE_FEED, ROUTE_PROFILE, ROUTE_PROFILE_FORM, ROUTE_REGISTER, ROUTE_RESET_PASSWORD, ROUTE_ORDER } from '../../utils/const';
import { WebsocketStatus } from "../../utils/types";
import { disconnect } from "../../services/actions/orderFeed";
import { OrderHistory } from '../../pages/order-history-page/order-history';

export const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { removeIngredientDetails } = selectedIngredientSlice.actions;
  const { status: statusWS } = useSelector((store) => store.orderFeed);
  const isOrderFeedPages = location.pathname.includes(ROUTE_FEED);
  const isOrderHistoryPage = location.pathname.includes(`${ROUTE_PROFILE}${ROUTE_ORDER}`);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (
      statusWS === WebsocketStatus.ONLINE &&
      !isOrderFeedPages &&
      !isOrderHistoryPage
    ) {
      dispatch(disconnect());
    }
  }, [dispatch, statusWS, isOrderFeedPages, isOrderHistoryPage]);

  const handleModalClose = () => {
    dispatch(removeIngredientDetails());
    navigate(-1);
  };

  let background = location.state && location.state.background;
  
  return (
    <div className={css.main_rect}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={ROUTE_MAIN} element={<Main />} />
        <Route path={ROUTE_FEED} element={<Orders />} />
        <Route path={`${ROUTE_FEED}/:orderId`} element={<OrderInfo />} />
        <Route
          path={`${ROUTE_PROFILE}${ROUTE_ORDER}`}
          element={
            <ProtectedRouteElement
              onlyUnAuth={true}
              element={<OrderHistory />}
            />
          }
        />
        <Route
          path={`${ROUTE_PROFILE}${ROUTE_ORDER}/:orderId`}
          element={
            <ProtectedRouteElement
              onlyUnAuth={true}
              element={<OrderInfo />}
            />
          }
        />
        <Route
          path={ROUTE_LOGIN}
          element={
            <ProtectedRouteElement
              onlyUnAuth={false}
              element={<LoginPage />}
            />
          }
        />
        <Route
          path={ROUTE_PROFILE}
          element={
            <ProtectedRouteElement
              onlyUnAuth={true}
              element={<Profile />}
            />
          }
        />
        <Route path={ROUTE_PROFILE_FORM} element={<ProfileForm />} />
        <Route path={ROUTE_REGISTER} element={<Register />} />
        <Route
          path={ROUTE_FORGOT_PASSWORD}
          element={
            <ProtectedRouteElement
              onlyUnAuth={false}
              element={<ForgotPassword />}
            />
          }
        />
        <Route
          path={ROUTE_RESET_PASSWORD}
          element={
            <ProtectedRouteElement
              onlyUnAuth={false}
              element={<ResetPassword />}
            />
          }
        />
        <Route
          path={`${ROUTE_INGREDIENTS}/:ingredientId`}
          element={<IngredientPage />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      {
        background && (
          <Routes>
            <Route
              path={`${ROUTE_INGREDIENTS}/:ingredientId`}
              element={
                <Modal title={"Детали ингредиента"} onClose={handleModalClose}>
                  <IngredientPage />
                </Modal>
              }
            />
            {[
              `${ROUTE_FEED}/:orderId`,
              `${ROUTE_PROFILE}${ROUTE_ORDER}/:orderId`,
            ].map((path, index) => (
              <Route
                path={path}
                key={index}
                element={
                  <Modal title={" "} onClose={handleModalClose}>
                    <OrderCardInfo
                      order={location.state.orderCard}
                      isModal={true}
                    />
                  </Modal>
                }
              />
            ))}
          </Routes>
        )
      }
    </div>
  );  
}

export default App;