import {useEffect} from "react";

export function useCloseModal(ref, handler) {
    useEffect(() => {
        const reference = ref.current;
        const listener = (event) => {
            if (reference === event.target) {
                handler();
            }
            reference?.addEventListener('mousedown', listener);
            return () => reference?.removeEventListener('mousedown', listener);
        }
        if (reference) {
            listener(reference);
        }
    }, [ref, handler]);
}