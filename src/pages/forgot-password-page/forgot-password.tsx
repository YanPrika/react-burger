import { FC } from "react";
import css from "./forgot-password.module.css";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { ROUTE_RESET_PASSWORD } from "../../utils/const";
import { useFormWithValidation } from "../../components/hooks/hooks";
import LoginForm from "../../components/login-form/login-form";
import { useAuthProvide } from "../../utils/authorization";

const ForgotPassword: FC = () => {

  const navigate = useNavigate();
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const { forgotPassword } = useAuthProvide();

  const handleSubmit = async (evt: React.SyntheticEvent<HTMLElement>) => {
    evt.preventDefault();
    const requestresult = await forgotPassword(values);
    if (requestresult.success) {
      navigate(ROUTE_RESET_PASSWORD, {
        state: { email: values.email, from: "reset-password" }
      });
    }
  };

  return (
    <div className={`${css.content}  ${css.content_page_form}`}>
      <LoginForm
        title="Восстановление пароля"
        isValidForm={isValidForm}
        textButton="Восстановить"
        onSubmit={handleSubmit}
      >
        <EmailInput
          onChange={handleChange}
          value={values.email || ""}
          name={"email"}
          placeholder="Укажите e-mail"
          isIcon={false}
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
    </div>
  );
};

export default ForgotPassword;