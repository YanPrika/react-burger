import css from "./login.module.css";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "../../hooks/hooks";
import { useSelector } from "../../hooks/hooks";
import LoginForm from "../../components/login-form/login-form";
import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormWithValidation } from "../../hooks/hooks";
import { onLogin } from "../../services/actions/users" 

const LoginPage = () => {
  const navigate = useNavigate();
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const { onLoginFailed, onLoginRequest } = useSelector((store:any) => store.user);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(onLogin(values))
      .unwrap()
      .then(() => {
        const from = location?.state?.from;       
        navigate(from !== undefined ? from.pathname : "/");
      })
      .catch((err: any) => {
        setRequestFailedMessage(err.message);
      });
  };

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    handleChange(evt);
    if (requestFailedMessage) {
      setRequestFailedMessage(null);
    }
  };

  return (
    <div className={`${css.content} ${css.content_page_form}`}>
      <LoginForm
        title="Вход"
        isValidForm={isValidForm}
        textButton="Войти"
        onSubmit={handleSubmit}
      >
        <EmailInput
          onChange={handleChangeInput}
          value={values.email || ""}
          name={"email"}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mb-6"
          required
        />
        <PasswordInput
          onChange={handleChangeInput}
          value={values.password || ""}
          name={"password"}
          extraClass="mb-6"
          required
        />
      </LoginForm>
      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{" "}
        <Link to="/register" className={css.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to="/forgot-password" className={css.link}>
          Восстановить пароль
        </Link>
      </p>
      {onLoginFailed && (
        <p className={`${css.error} text text_type_main-default mt-20`}>
          {requestFailedMessage}
        </p>
      )}
            {onLoginRequest && (
        <p className="text text_type_main-default mt-20">
          Идет авторизация пользователя...
        </p>
      )}
    </div>
  );
}

export default LoginPage;
