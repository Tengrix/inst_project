import { useEffect, useState } from 'react';

type ScreenSizeType = {
    width: number;
    height: number;
};
export const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<ScreenSizeType>({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });
    useEffect(() => {
        const handleResize = () => {
            setScreenSize({ height: window.innerHeight, width: window.innerWidth });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return screenSize;
};
