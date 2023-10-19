import { FC, useState, useEffect, FormEvent } from "react";
import css from "./reset-password.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import LoginForm from "../../components/login-form/login-form";
import { useFormWithValidation } from "../../hooks/hooks";
import { ROUTE_MAIN } from "../../utils/const";
import { useAuthProvide } from "../../utils/authorization";
import { useDispatch } from "../../hooks/hooks";
import { onLogin } from "../../services/actions/users";

const ResetPassword: FC = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [requestFailed, setRequestFailed] = useState(false);
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const { resetPassword } = useAuthProvide();
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    resetPassword(values)
      .then(() => {
        dispatch(
          onLogin({ email: location.state.email, password: values.password })
        )
          .unwrap()
          .then(() => {
            navigate(ROUTE_MAIN);
          });
      })
      .catch((err) => {
        setRequestFailed(true);
        setRequestFailedMessage(err.message);
      });
  };

  useEffect(() => {
    if (location?.state?.from !== "reset-password") {
      navigate(ROUTE_MAIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRequestFailed(false);
  }, [values.token]);

  return (
    <div className={`${css.content}  ${css.content_page_form}`}>
      <LoginForm
        title="Восстановление пароля"
        isValidForm={isValidForm}
        textButton="Сохранить"
        onSubmit={handleSubmit}
      >
        <PasswordInput
          onChange={handleChange}
          placeholder={"Введите новый пароль"}
          value={values.password || ""}
          name={"password"}
          extraClass="mb-6"
          required
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleChange}
          value={values.token || ""}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          extraClass="mb-6"
          required
        />
      </LoginForm>

      <p className="text text_type_main-default text_color_inactive mb-4">
        Вспомнили пароль?{" "}
        <Link to="/login" className={css.link}>
          Войти
        </Link>
      </p>
      {requestFailed && (
        <p className={`${css.error} text text_type_main-default mt-20`}>
          {requestFailedMessage}
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
