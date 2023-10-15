import React, { useEffect } from 'react';
import css from '../app/app.module.css';
import { AppHeader } from '../app-header/app-header';
import { ProtectedRouteElement } from "../../components/protected-route";
import LoginPage from '../../pages/login-page/login';
import Page404 from '../../pages/404-page/not-found';
import Main from '../../pages/main-page/main';
import ForgotPassword from '../../pages/forgot-password-page/forgot-password';
import Profile from '../../pages/profile-page/profile';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Register from '../../pages/register-page/register';
import ResetPassword from '../../pages/reset-password-page/reset-password';
import ProfileForm from '../profile-form/profile-form';
import IngredientPage from '../../pages/IngredientPage/IngredientPage';
import { getIngredients } from '../../services/actions/ingredients';
import { useDispatch } from '../../components/hooks/hooks';
import Modal from '../modal/modal';
import { ROUTE_FORGOT_PASSWORD, ROUTE_INGREDIENTS, ROUTE_LOGIN, ROUTE_MAIN, ROUTE_PROFILE, ROUTE_PROFILE_FORM, ROUTE_REGISTER, ROUTE_RESET_PASSWORD } from '../../utils/const';

export const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleModalClose = () => {
    navigate(-1);
  };

  let background = location.state && location.state.background;
  
  return (
    <div className={css.main_rect}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path={ROUTE_MAIN} element={<Main />} />
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
          </Routes>
        )
      }
    </div>
  );
}

export default App;