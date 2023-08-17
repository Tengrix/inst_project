import {ImageType, setCurrentImage} from '@/shared/lib/imageStore';
import s from './ImagesSlider.module.scss';
import {MouseEvent, useEffect, useRef} from 'react';
import {useAppDispatch} from '@/store';
import {Canvas} from '../Canvas/Canvas';
import {StepType} from "@/pages/post/createPostModal/CreatePostModal";

type ImageSliderPropsType = {
  currImage: {src: string, hash: string}
  images: Array<ImageType>;
  step: StepType
};

export const ImageSlider = ({ currImage, images, step }:ImageSliderPropsType) => {
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
      dispatch(setCurrentImage(e.currentTarget.value));
      //document.getElementById(e.currentTarget.value)?.scrollIntoView();
    }
  };

  return (
    <div className={s.slider}>
      {images.length > 0 && (
        <ul className={s.slider__list}>
          {images.map(({ src, hash, originalSRC, filters,crop }) => (
            <li
              key={src}
              className={s.slider__item}
              //@ts-ignore
              ref={(el) => (itemsRef.current[hash] = el)}
            >
              <Canvas imageSRC={originalSRC} filters={filters} step={step} crop={crop} />
            </li>
          ))}
        </ul>
      )}

      {images.length > 1 && (
        <ul className={s.bullets}>
          {images.map(({originalSRC}) => (
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
