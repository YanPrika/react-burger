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
          path={"/ingredients/:ingredientId"}
          element={<IngredientPage />}
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      {
        background && (
          <Routes>
            <Route
              path={"/ingredients/:ingredientId"}
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