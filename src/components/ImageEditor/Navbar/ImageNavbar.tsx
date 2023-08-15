import { ReactNode, useState } from 'react';
import { ImageGallery } from '../NavbarItems/Gallery/ImageGallery';
import { ImageCrop } from '../NavbarItems/Crop/ImageCrop';
import { ImageScale } from '../NavbarItems/Scale/ImageScale';
import s from './ImageNavbar.module.scss';

type ImageNavbarPropsType = {
  callback?: () => void;
  image: string;
};
type IconType = {
  iconTitle: string;
  className: string;
  children: ReactNode;
};

export const ImageNavbar = ({ image, callback }: ImageNavbarPropsType) => {
  const [items, setItems] = useState([
    { iconTitle: 'resize',
      className: 'icon_expand',
      children: (image: string) => <ImageCrop image={image} />
      //isShow: false 
    },
    {
      iconTitle: 'scale',
      className: 'icon_maximizeOutline',
      children: (image: string) => <ImageScale image={image} />
      //isShow: false,
    },
    {
      iconTitle: 'gallery',
      className: 'icon_imageOutline',
      children: (image: string) => <ImageGallery image={image} />
      //isShow: false,
    },
  ]);

  const [isShow, setShow] = useState(false);
  const [comp, setComp] = useState();
  const [iTitle, setTitle] = useState();

  const showItem = (component: any, iconTitle: any) => {
    /*const newItems = items.map((item) => {
      return item.iconTitle === value
        ? { ...item, isShow: !item.isShow }
        : { ...item, isShow: false };
    });
    setItems(newItems);
    */

    iconTitle === iTitle ? setShow(!isShow) : setShow(true);
    setTitle(iconTitle);
    setComp(component(image));
  };

  return (
      <div className={s.currentImageManager}>
        {isShow && comp}
        {items.map((item) => (
            <button
              key={item.iconTitle}
              className={s.imageManagerButton + ' ' + item.className}
              onClick={(e: any) => showItem(item.children, e.target.value)}
              value={item.iconTitle}
            ></button>
        ))}
      </div>
  );
};
