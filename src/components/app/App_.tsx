import React from 'react';
import css from '../app/app.module.css';
import { AppHeader } from '../app-header/app-header';
import { ProtectedRouteElement } from "../../components/protected-route";
import LoginPage from '../../pages/login-page/login';
import Page404 from '../../pages/404-page/not-found';
import Main from '../../pages/main-page/main';
import ForgotPassword from '../../pages/forgot-password-page/forgot-password';
import Profile from '../../pages/profile-page/profile';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Register from '../../pages/register-page/register';
import ResetPassword from '../../pages/reset-password-page/reset-password';
import ProfileForm from '../profile-form/profile-form';
import { ROUTE_INGREDIENTS } from '../../utils/const';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch } from '../hooks/hooks';
import { selectedIngredientSlice } from "../../services/reducers/selectedIngredient";
import { IngredientPage } from '../../pages/Ingredient-page/ingredient';

export const App = () => {
  const ModalSwitch = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { removeIngredientDetails } = selectedIngredientSlice.actions;
    

    let background = location.state && location.state.background;

    const handleModalClose = () => {
      dispatch(removeIngredientDetails());
      navigate(-1);
    };

    return (
      <div className={css.main_rect}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<Main />} />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement
                onlyUnAuth={false}
                element={<LoginPage />}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                onlyUnAuth={true}
                element={<Profile />}
              />
            }
          />
          <Route path="/profile-form" element={<ProfileForm />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRouteElement
                onlyUnAuth={false}
                element={<ForgotPassword />}
              />
            }
          />
          <Route
            path="/reset-password"
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

        {background && (
            <Route
            path={"/ingredients/:ingredientId"}
            element={<IngredientPage />}
          />
        )}
      </div>
    );
  };
  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}


export default App;