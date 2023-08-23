import { ReactNode, useState } from 'react';

import { ImageCrop } from '@/components/ImageEditor/NavbarItems/Crop/ImageCrop';
import { ImageGallery } from '@/components/ImageEditor/NavbarItems/Gallery/ImageGallery';
import { ImageScale } from '@/components/ImageEditor/NavbarItems/Scale/ImageScale';

import s from './ImageNavbar.module.scss';

type ItemsType = Array<ItemType>;

type ItemType = {
    iconTitle: string;
    className: string;
    children: ReactNode;
};

export const ImageNavbar = () => {
    const items: ItemsType = [
        {
            iconTitle: 'resize',
            className: 'icon_expand',
            children: <ImageCrop />
        },
        {
            iconTitle: 'scale',
            className: 'icon_maximizeOutline',
            children: <ImageScale />
        },
        {
            iconTitle: 'gallery',
            className: 'icon_imageOutline',
            children: <ImageGallery />
        }
    ];

    const [isShow, setShow] = useState(false);
    const [activeComponent, setActiveComponent] = useState();
    const [iTitle, setTitle] = useState();

    const showItem = (component: any, iconTitle: any) => {
        iconTitle === iTitle ? setShow(!isShow) : setShow(true);
        setTitle(iconTitle);
        setActiveComponent(component);
    };

    const navbarComponents = items.map(item => (
        <button
            key={item.iconTitle}
            className={s.imageManagerButton + ' ' + item.className}
            onClick={(e: any) => showItem(item.children, e.target.value)}
            value={item.iconTitle}></button>
    ));

    return (
        <div className={s.currentImageManager}>
            {isShow && activeComponent}
            {navbarComponents}
        </div>
    );
};
