import { useCallback, useEffect, useRef, useState } from "react";

export const useOutside = (initialVisible: boolean) => {
    const [isShow, setIsShow] = useState<boolean>(initialVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsShow(false);
            }
        }, [ref]);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return { ref, isShow, setIsShow };
}
