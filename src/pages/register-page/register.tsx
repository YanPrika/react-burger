import {FC, useState } from "react";
import css from "./register.module.css";
import { ROUTE_MAIN } from "../../utils/const";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/login-form/login-form";
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useFormWithValidation } from "../../components/hooks/hooks";
import { onRegister } from "../../services/actions/users";

const Register: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);

  function handleSubmit(evt: React.SyntheticEvent<HTMLElement>) {
    evt.preventDefault();
    dispatch(onRegister(values))
      .unwrap()
      .then(() => {
        navigate(ROUTE_MAIN);
      })
      .catch((err: any) => {
        setRequestFailedMessage(err.message);
      });
  }

  const handleChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(evt);
    if (requestFailedMessage) {
      setRequestFailedMessage(null);
    }
  };

  return (
    <article className={css.content_page_form}>
      <LoginForm
        title="Регистрация"
        isValidForm={isValidForm}
        textButton="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChangeInput}
            value={values.name || ""}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            required
          />
        </div>
        <div className="mb-6">
          <EmailInput
            onChange={handleChangeInput}
            value={values.email || ""}
            name={"email"}
            placeholder="E-mail"
            isIcon={false}
            required
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            onChange={handleChangeInput}
            value={values.password || ""}
            name={"password"}
            required
          />
        </div>
      </LoginForm>
      <p className="text text_type_main-default text_color_inactive">
        {"Уже зарегистрированы? "}
        <Link className={css.link} to="/login">
          Войти
        </Link>
      </p>
    </article>
  );
};

export default Register;
