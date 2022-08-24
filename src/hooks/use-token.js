import { useEffect } from "react";
import useStore from "./use-store";

export default function useToken(depends = []) {
    const store = useStore();
    useEffect(() => {
    (    async function() {
            await store.get('autorization').checkToken(window.localStorage.getItem('token'));
            await store.get('profile').getProfile(window.localStorage.getItem('token'));
        }())

    }, depends)
}