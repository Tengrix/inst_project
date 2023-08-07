import { useDispatch } from 'react-redux';
import s from './ImageManager.module.scss';
import Image from 'next/image';
import { imageManager } from '@/shared/lib/imageStore';

type ImageManagerPropsType = {
  icons: Array<IconType>;
  callback?: () => void;
};
type IconType = {
  iconTitle: string;
  src: string;
};

export const ImageManager = ({ icons, callback }: ImageManagerPropsType) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={s.currentImageManager}>
        {icons.map((icon) => (
          <div className={s.imageManagerButton}>
            <Image
              src={icon.src}
              width={24}
              height={24}
              alt={icon.iconTitle}
              onClick={() => dispatch(imageManager({ value: icon.iconTitle }))}
            />
          </div>
        ))}
      </div>
    </>
  );
};
