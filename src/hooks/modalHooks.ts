import { useEffect, RefObject } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    callback: () => void,
    enabled: boolean
) {
    useEffect(() => {
        if (!enabled) return;
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [ref, callback, enabled]);
}

