# react-burger
Автор: Ян Прика

## Описание
Приложение с возможностью сделать заказ из предложенных ингредиентов.
Стэк: HTML/CSS, JavaScript, TypeScript, React, Redux

## Посмотреть проект
* на GitHub - [https://yanprika.github.io/react-burger/]

## Функциональность проекта

* Сайт создан через Create React App.
* Использованы функциональные компоненты.
* Применяются React-хуки, React-dnd.
* Подключено Redux-хранилище (+ Redux-thunk, Redux Toolkit).
* Компоненты и хранилище написаны на TypeScript.
* Реализована связка с сервером через Api (ингридиенты) и WebSocket (лента заказов).
* Есть регистрация и авторизация на сайте, а также реализована защита маршрутов от неавторизованных пользователей.
* В проекте применяется тестирование (Jest для редьюсеров, Cypress для страницы конструктора).

## Инструкция по развёртыванию и системные требования
`npm install` — установить зависимости   
`npm run start` — запускает проект на локальном сервере. Если проект не запустился автоматически, откройте по ссылке http://localhost:3000/   
`npm run build` — собирает проект для деплоя на сервер (папка build)