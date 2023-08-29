import React from 'react';
import ReactDOM from 'react-dom';
import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import css from './app-header.module.css';

export const AppHeader = () => {
    return (
        <header className={css.app_header}>
            <div className={css.box1}>   
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default">
                    Конструктор
                </p>
                <ListIcon type="secondary" />
                <p className="text text_type_main-default text_color_inactive">
                    Лента Заказов
                </p>
            </div>
            <div className={css.centr}>                                        
                <Logo />                    
            </div>
            <div className={css.box3}>
                <ProfileIcon type="secondary"/>
                <p className="text text_type_main-default text_color_inactive">
                    Личный кабинет
                </p>
            </div>
        </header> 
    );
}

export default AppHeader;