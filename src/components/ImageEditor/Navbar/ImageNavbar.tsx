import { useDispatch } from 'react-redux';
import s from './ImageNavbar.module.scss';
import { ReactNode, useState } from 'react';
import { ImageResize } from '../NavbarItems/Resize/ImageResize';
import { ImageGallery } from '../NavbarItems/Gallery/ImageGallery';
import { ImageScale } from '../NavbarItems/Scale/ImageScale';

type ImageNavbarPropsType = {
  callback?: () => void;
};
type IconType = {
  iconTitle: string;
  className: string;
  children: ReactNode;
};

export const ImageNavbar = ({ callback }: ImageNavbarPropsType) => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([
    { iconTitle: 'resize', className: 'icon_expand', children: <ImageResize />, isShow: false },
    {
      iconTitle: 'scale',
      className: 'icon_maximizeOutline',
      children: <ImageScale />,
      isShow: false,
    },
    {
      iconTitle: 'gallery',
      className: 'icon_imageOutline',
      children: <ImageGallery />,
      isShow: false,
    },
  ]);
  const showItem = (value: string) => {
    const newItems = items.map((item) => {
      return item.iconTitle === value
        ? { ...item, isShow: !item.isShow }
        : { ...item, isShow: false };
    });
    setItems(newItems);
  };

  return (
    <>
      <div className={s.currentImageManager}>
        {items.map((item) => (
          <div>
            {item.isShow && item.children}
            <button
              key={item.iconTitle}
              className={s.imageManagerButton + ' ' + item.className}
              onClick={(e: any) => showItem(e.target.value)}
              value={item.iconTitle}
            ></button>
          </div>
        ))}
      </div>
    </>
  );
};
