import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function useAuth(isAuth, loginPage, homePage) {
    const navigate = useNavigate();
    const location = useLocation();

    return useEffect(() => {
        if (!isAuth && location.pathname !== loginPage) {
            navigate(loginPage);
        }
        if (
            isAuth &&
            location.key === "default" &&
            location.pathname === loginPage
        ) {
            navigate(homePage, { replace: true });
        }
        if (
            isAuth &&
            location.key !== "default" &&
            location.pathname === loginPage
        ) {
            navigate(-1);
        }
    }, [isAuth]);
}