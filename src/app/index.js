import React, {useEffect} from 'react';
import useSelector from "../hooks/use-selector";
import {Routes, Route} from "react-router-dom";
import Main from "./main";
import Basket from "./basket";
import Article from "./article";
import Login from "./login";
import Profile from "./profile";
import PrivateRoute from "../components/routes/private-route";
import useAuth from "../hooks/use-auth";


/**
 * Приложение
 * @return {React.ReactElement} Виртуальные элементы React
 */
function App() {

    const modal = useSelector(state => state.modals.name);
    const user = useSelector(state => state.auth.user);
    useAuth();

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <>
            <Routes>
                <Route path={''} element={<Main/>}/>
                <Route path={"/articles/:id"} element={<Article/>}/>
                <Route path={'/login'} element={<PrivateRoute path={'/'} condition={user !== null}>
                    <Login/>
                </PrivateRoute>}/>
                <Route path={'/profile'} element={<PrivateRoute path={'/login'} condition={user === null}>
                    <Profile/>
                </PrivateRoute>}/>
            </Routes>
            {modal === 'basket' && <Basket/>}
        </>
    );
}

export default React.memo(App);
