import { ReactNode, useState } from 'react';
import { ImageGallery } from '../NavbarItems/Gallery/ImageGallery';
import { ImageResize } from '../NavbarItems/Resize/ImageResize';
import { ImageScale } from '../NavbarItems/Scale/ImageScale';
import s from './ImageNavbar.module.scss';

type ImageNavbarPropsType = {
  callback?: () => void;
};
type IconType = {
  iconTitle: string;
  className: string;
  children: ReactNode;
};

export const ImageNavbar = ({ callback }: ImageNavbarPropsType) => {
  const [items, setItems] = useState([
    { iconTitle: 'resize',
      className: 'icon_expand',
      children: <ImageResize />
      //isShow: false 
    },
    {
      iconTitle: 'scale',
      className: 'icon_maximizeOutline',
      children: <ImageScale />
      //isShow: false,
    },
    {
      iconTitle: 'gallery',
      className: 'icon_imageOutline',
      children: <ImageGallery />
      //isShow: false,
    },
  ]);

  const [isShow, setShow] = useState(false);
  const [comp, setComp] = useState();

  const showItem = (component: any) => {
    /*const newItems = items.map((item) => {
      return item.iconTitle === value
        ? { ...item, isShow: !item.isShow }
        : { ...item, isShow: false };
    });
    setItems(newItems);
    */
    setShow(!isShow);
    setComp(component);
  };

  return (
      <div className={s.currentImageManager}>
        {isShow && comp}
        {items.map((item) => (
            <button
              key={item.iconTitle}
              className={s.imageManagerButton + ' ' + item.className}
              onClick={() => showItem(item.children)}
              value={item.iconTitle}
            ></button>
        ))}
      </div>
  );
};
