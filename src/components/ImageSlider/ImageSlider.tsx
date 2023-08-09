import { ImageType, currentImage } from '@/shared/lib/imageStore';
import s from './ImagesSlider.module.scss';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

type ImageSliderPropsType = {
  currImage: string;
  images: Array<ImageType>;
};

export const ImageSlider = ({ currImage, images }: ImageSliderPropsType) => {
  //const getHash = (src: string) => (src.match(/(?=\/([a-z-0-9]+)$)/) || [])[1] ?? src;
  const getHash = (src: string) => src.replace(/^.*\//, '');
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById(getHash(currImage))?.scrollIntoView();
  }, [currImage]);

  return (
    <div className={s.slider}>
      {images.length > 0 && (
        <ul className={s.slider__list}>
          {images.map(({ src }) => (
            <li id={getHash(src)} key={src} className={s.slider__item}>
              <img className={s.slider__image} src={src} alt="" />
            </li>
          ))}
        </ul>
      )}

      {images.length > 1 && (
        <ul className={s.bullets}>
          {images.map(({ src }) => (
            <li key={getHash(src)} className={s.bullets__item}>
              <button
                value={getHash(src)}
                onClick={() => {
                  dispatch(currentImage({ src }));
                }}
              ></button>{' '}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
