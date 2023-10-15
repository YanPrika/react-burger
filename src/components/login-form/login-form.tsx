import css from "./login-form.module.css";
import React, {FC} from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { THandleSubmit } from "../../utils/types";

interface ILoginForm {
  title?: string;
  isValidForm: boolean;
  buttonIsInvisible?: boolean;
  onSubmit: THandleSubmit;
  textButton: string;
  children?: React.ReactNode
}

const LoginForm: FC<ILoginForm> = ({ title, isValidForm = true, buttonIsInvisible = false, onSubmit, textButton, children }) => {
  return (
    <>
      {title && (<h1 className="text text_type_main-medium mb-6">{title}</h1>)}
      <form className={`${css.form}`} onSubmit={onSubmit} >
        {children}
        {!buttonIsInvisible && (<Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!isValidForm}
          >
          {textButton}
        </Button>)}
      </form>
    </>
  );
};

export default React.memo(LoginForm);