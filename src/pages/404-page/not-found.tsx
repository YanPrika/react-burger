import css from "./not-found.module.css"
import {Link} from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

const Page404 = () => {
  return (
    <article className={css.wrapper}>
      <p className="text text_type_digits-large text_color_inactive">404</p>
      <h1 className="text text_type_main-large">
        Страница не найдена
      </h1>
      <h2 className="text text_type_main-medium">
        Для возврата в главное меню нажмите "К бургерам"!
      </h2>
      <Link className={css.link} to="/">
        <Button type="primary" size="medium" htmlType={"button"}>
          К бургерам
        </Button>
      </Link>
    </article>
  );
};

export default Page404;