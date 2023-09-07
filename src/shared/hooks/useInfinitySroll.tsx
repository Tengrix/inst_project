import { useEffect, useState } from 'react';

export const useInfinityScroll = (isLoading: boolean) => {
    const [isRefetch, setIsRefetch] = useState(true);
    const [maxHeight, setMaxHeight] = useState(0);
    const scrollHandler = (e: Event) => {
        const scrollHeight = (e.target as Document).documentElement.scrollHeight;
        const scrollTop = (e.target as Document).documentElement.scrollTop;
        const innerHeight = window.innerHeight;
        const condition = scrollHeight - (scrollTop + innerHeight) < 50;
        const scrollHeightMoreThenBefore = scrollHeight > maxHeight;
        setMaxHeight(scrollHeight);
        if (condition && scrollHeightMoreThenBefore && !isLoading) {
            setIsRefetch(true);
        }
    };
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);
    return { isRefetch, setIsRefetch };
};
