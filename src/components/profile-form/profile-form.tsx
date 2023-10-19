import { FC, useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useSelector } from "../../hooks/hooks";
import { useDispatch } from "../../hooks/hooks";
import { Input, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormWithValidation } from "../../hooks/hooks";
import LoginForm from "../login-form/login-form";
import { editUser } from "../../services/actions/users";

const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const [isDataUserChange, setIsDataUserChange] = useState<boolean>(false);
  const { values, handleChange, isValidForm } = useFormWithValidation();
  const [requestFailedMessage, setRequestFailedMessage] = useState(null);
  const [requestSuccessMessage, setRequestSuccessMessage] = useState<boolean | null>(null);
  const { user } = useSelector((store: any) => store.user);


  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    dispatch(editUser(values))
      .unwrap()
      .then((res: any) => {
        setRequestSuccessMessage(true);
      })
      .catch((err: any) => {
        setRequestFailedMessage(err.message);
      });
  }

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    handleChange(evt);
    if (requestFailedMessage) {
      setRequestFailedMessage(null);
    }
    if (requestSuccessMessage) {
      setRequestSuccessMessage(false);
    }
  };

  useEffect(() => {
    setIsDataUserChange(
      values.name !== user.name ||
      values.email !== user.email ||
      Boolean(values.password)
    );
  }, [values, user]);

  useEffect(() => {
    values.name = user.name;
    values.email = user.email;
    values.password = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <LoginForm
      isValidForm={isValidForm}
      textButton="Сохранить"
      onSubmit={handleSubmit}
      buttonIsInvisible={!isDataUserChange}
    >
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleChangeInput}
        icon="EditIcon"
        value={values.name || ""}
        name={"name"}
        error={false}
        errorText={"Ошибка"}
        size={"default"}
        extraClass="mb-6"
        required
      />
      <EmailInput
        onChange={handleChangeInput}
        value={values.email || ""}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        extraClass="mb-6"
        required
      />
      <PasswordInput
        onChange={handleChangeInput}
        value={values.password || ""}
        name={"password"}
        extraClass="mb-6"
        icon="EditIcon"
      />
    </LoginForm>
  );
}

export default ProfileForm;