import Image from 'next/image';
import { MouseEvent, useEffect, useRef, useState } from 'react';

import s from '@/components/ImageSlider/ImagesSlider.module.scss';

type ImagePostSliderPropsType = {
    images: Array<string>;
};

export const ImagePostSlider = ({ images }: ImagePostSliderPropsType) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const itemsRef = useRef<any>({});

    useEffect(() => {
        setCurrentImageIndex(currentImageIndex);
        const image = images[currentImageIndex];
        //@ts-ignore
        //itemsRef.current[image]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }, [setCurrentImageIndex, currentImageIndex, images]);

    const bulletHandler = (e: MouseEvent<HTMLButtonElement>) => {
        const index = Number(e.currentTarget?.value ?? 0);

        if (index >= 0) {
            setCurrentImageIndex(index);
        }
    };

    const changeCurrentImageHandler = (e: MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value;

        images.forEach((_: string, index: number) => {
            if (currentImageIndex === index) {
                if (value === 'prev' && index > 0) {
                    setCurrentImageIndex(index - 1);
                }
                if (value === 'next' && images.length !== index + 1) {
                    setCurrentImageIndex(index + 1);
                }
            }
        });
    };

    const prevBtn = (
        <button value={'prev'} className={s.prevBtn} onClick={changeCurrentImageHandler}>
            <span className="icon_arrowIosBackLeft"></span>
        </button>
    );

    const nextBtn = (
        <button value={'next'} className={s.nextBtn} onClick={changeCurrentImageHandler}>
            <span className="icon_arrowIosForwardRight"></span>
        </button>
    );

    const imagePreview = images.map(image => (
        <li key={image} className={s.slider__item} ref={(el: any) => (itemsRef.current[image] = el)}>
            <Image style={{ height: 400, width: 400 }} src={image} alt="" width={400} height={400} />
        </li>
    ));

    const bullets = images.map((_, index) => (
        <li key={index} className={s.bullets__item}>
            <button
                className={s.btn + ' ' + (currentImageIndex === index ? s.btn_active : '')}
                value={index}
                onClick={bulletHandler}></button>
        </li>
    ));

    return (
        <div className={s.slider}>
            {images.length > 1 && (
                <>
                    {currentImageIndex > 0 && prevBtn}
                    {currentImageIndex + 1 < images.length && nextBtn}
                </>
            )}
            {images.length > 0 && <ul className={s.slider__list}>{imagePreview}</ul>}
            {images.length > 1 && <ul className={s.bullets}>{bullets}</ul>}
        </div>
    );
};
