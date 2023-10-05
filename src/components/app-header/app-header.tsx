import React from "react";
import { useMatch } from "react-router-dom";
import css from './app-header.module.css';
import { NavLink } from 'react-router-dom';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { ROUTE_MAIN, ROUTE_PROFILE, ROUTE_ORDER } from "../../utils/const";

export const AppHeader = React.memo(() => {
    const isMainPage = !!useMatch(ROUTE_MAIN);
    const isOrderPage = !!useMatch(ROUTE_ORDER);
    const isProfilePage = !!useMatch(ROUTE_PROFILE);

    return (
        <header className={css.app_header}>
            <div className={css.box1}>
                <NavLink to='/' className={`${css.link} pl-5 pr-5 pt-4 pb-4`}>
                    <BurgerIcon type={isMainPage ? "primary" : "secondary"} />
                    <p className={`${"text text_type_main-default"}
                                   ${isMainPage ? "text_color_active" : "text_color_inactive"}`}>
                        Конструктор
                    </p>
                </NavLink>
                <NavLink to='/orders' className={`${css.link} pl-5 pr-5 pt-4 pb-4`}>
                    <ListIcon type={isOrderPage ? "primary" : "secondary"} />
                    <p className={`${"text text_type_main-default"}
                                   ${isOrderPage ? "text_color_active" : "text_color_inactive"}`}>
                        Лента Заказов
                    </p>
                </NavLink>
            </div>
            <div className={css.centr}>                                        
                <Logo />                    
            </div>
            <div className={css.box3}>
                <NavLink to='/profile' className={`${css.link} pl-5 pr-5 pt-4 pb-4`} >
                    <ProfileIcon type={isProfilePage ? "primary" : "secondary"}/>
                    <p className={`${"text text_type_main-default"}
                                   ${isProfilePage ? "text_color_active" : "text_color_inactive"}`}>
                        Личный кабинет
                    </p>
                </NavLink>
            </div>
        </header> 
    );
});

export default AppHeader;