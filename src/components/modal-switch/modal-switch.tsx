import css from "./modal-switch.module.css";
import { useLocation, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from "../../pages/login-page/login";
import NotFound from "../../pages/404-page/not-found";

const ModalSwitch = () => {
    const location = useLocation();
    return (
        <div className={`${css.container} pb-10`}>
            <Routes location={location}>
                {
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                }
                {
                    <Route path="*">
                        <NotFound/>
                    </Route>
                }                
            </Routes>
        </div>
    );
}

export default ModalSwitch;