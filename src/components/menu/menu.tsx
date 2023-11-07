import { ROUTE_LOGIN, ROUTE_PROFILE, ROUTE_ORDER } from "../../utils/const";
import React from "react";
import css from "../../components/menu/menu.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "../../hooks/hooks";
import { onLogOut } from "../../services/actions/users";
import { userSlice } from "../../services/reducers/users";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clearUser } = userSlice.actions;

  function handlelogOut() {
    dispatch(onLogOut())
      .unwrap()
      .then(() => {
        navigate(ROUTE_LOGIN);
      })
      .catch((err: any) => {
        dispatch(clearUser());
      })
      .finally(() => {
        navigate(ROUTE_LOGIN);
      });
  }

  return (
    <nav>
      <ul className={`${css.navigation}`}>
        <li className={`${css.navigation_link}`}>
          <NavLink
            to={ROUTE_PROFILE}
            className={({ isActive }) =>
              isActive
                ? `${css.link_name_active} text text_type_main-medium`
                : `${css.link_name} text text_type_main-medium text_color_inactive`
            }
            end
          >
            Профиль
          </NavLink>
        </li>

        <li className={css.navigation_link}>
          <NavLink
            to={`${ROUTE_PROFILE}${ROUTE_ORDER}`}
            className={({ isActive }) =>
              isActive
                ? `${css.link_name_active} text text_type_main-medium`
                : `${css.link_name} text text_type_main-medium text_color_inactive`
            }
            end
          >
            История заказов
          </NavLink>
        </li>
        <li className={css.navigation_link}>
          <button className={css.button} onClick={handlelogOut}>
            <p className="text text_type_main-medium text_color_inactive">
              Выход
            </p>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default React.memo(Menu);