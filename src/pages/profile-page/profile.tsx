import React from 'react';
import css from "./profile.module.css";
import ProfileForm from "../../components/profile-form/profile-form";
import { ROUTE_PROFILE, ROUTE_LOGIN } from "../../utils/const";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from '../../components/hooks/hooks';
import { onLogOut } from "../../services/actions/users";
import { userSlice } from "../../services/reducers/users";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clearUser } = userSlice.actions;

  function handlelogOut() {
    dispatch(onLogOut())
      .unwrap()
      .finally(() => {
        dispatch(clearUser());
        navigate(ROUTE_LOGIN);
      });
  }

  return (
    <article className={css.wrapper}>
      <nav className={css.navigation}>
        <ul className={`${css.list}`}>
          <li className={css.list_item}>
            <NavLink
              to={ROUTE_PROFILE}
              className={({ isActive }) =>
                isActive
                  ? `${css.link_active} text text_type_main-medium text_color_active`
                  : `${css.link} text text_type_main-medium text_color_inactive`
              }
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${ROUTE_PROFILE}/orders`}
              className={({ isActive }) =>
                isActive
                  ? `${css.link_active} text text_type_main-medium text_color_active`
                  : `${css.link} text text_type_main-medium text_color_inactive`
              }
            >
              История заказов
            </NavLink>
          </li>
          <li className={css.link}>
            <button className={css.button} onClick={handlelogOut}>
              <p className="text text_type_main-medium text_color_inactive">
                Выход
              </p>
            </button>
          </li>
        </ul>
        <p className={`${css.text} text text_type_main-default text_color_inactive`} >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <ProfileForm />

    </article>
  );
};

export default React.memo(Profile);