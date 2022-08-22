import {useEffect} from "react";
import useStore from "./use-store";

export default function useAuth() {
    const store = useStore();
    useEffect(() => {
        const updateUser = async () => {
            await store.get('auth').updateUser(localStorage.getItem('token'));
        }
        if (localStorage.getItem('token')) {
           updateUser();
        }
    }, [])

}