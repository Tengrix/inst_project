import { ImageType, currentImage } from '@/shared/lib/imageStore';
import s from './ImagesSlider.module.scss';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { MouseEvent } from 'react';

type ImageSliderPropsType = {
  currImage: string;
  images: Array<ImageType>;
};

export const ImageSlider = ({ currImage, images }) => {
  //const getHash = (src: string) => (src.match(/(?=\/([a-z-0-9]+)$)/) || [])[1] ?? src;
  //const getHash = (src: string) => src.replace(/^.*\//, '');
  //const images = useAppSelector(state => state.images.images);
  //const currentImage = useAppSelector(state => state.images.currentImagex);
  const dispatch = useAppDispatch();
  const itemsRef = useRef({});

  useEffect(() => {
    //@ts-ignore
    itemsRef.current[currImage.hash]?.scrollIntoView();
  }, [currImage]);

  const bulletHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value) {
      //const hash = images[imageIndex].hash;
      //const [i, hash] = e.currentTarget.value;
      dispatch(currentImage(e.currentTarget.value));
      //document.getElementById(e.currentTarget.value)?.scrollIntoView();
    }
  };

  return (
    <div className={s.slider}>
      {images.length > 0 && (
        <ul className={s.slider__list}>
          {images.map(({ src, hash }) => (
            <li
              key={src}
              className={s.slider__item}
              //@ts-ignore
              ref={(el) => (itemsRef.current[hash] = el)}
            >
              <img className={s.slider__image} src={src} alt="" />
            </li>
          ))}
        </ul>
      )}

      {images.length > 1 && (
        <ul className={s.bullets}>
          {images.map(({ originalSRC }) => (
            <li key={originalSRC} className={s.bullets__item}>
              <button
                className={s.btn + ' ' + (originalSRC === currImage.src ? s.btn_active : '')}
                value={originalSRC}
                onClick={bulletHandler}
              ></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
