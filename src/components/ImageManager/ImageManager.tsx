import { useDispatch } from 'react-redux';
import s from './ImageManager.module.scss';
import Image from 'next/image';
import { imageManager } from '@/shared/lib/imageStore';
import { ReactComponentElement, ReactNode } from 'react';

type ImageManagerPropsType = {
  icons: Array<IconType>;
  callback?: () => void;
};
type IconType = {
  iconTitle: string;
  src: string;
  icon: ReactNode
};

export const ImageManager = ({ icons, callback }: ImageManagerPropsType) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={s.currentImageManager}>
        {icons.map((icon) => (
          <div key={icon.iconTitle} className={s.imageManagerButton} onClick={() => dispatch(imageManager({ value: icon.iconTitle }))}>
            {icon.icon}
          </div>
        ))}
      </div>
    </>
  );
};
