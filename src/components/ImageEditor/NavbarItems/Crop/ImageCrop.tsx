import { addFilterToCurrentImage } from '@/redux/store/imageSlice/imageSlice';
import { useAppDispatch } from '@/redux/store';
import { MouseEvent } from 'react';
import s from '@/components/ImageEditor/NavbarItems/Crop/ImageCrop.module.scss';

export const ImageCrop = () => {
  const dispatch = useAppDispatch();

  const cropImageHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.value) {
      dispatch(
        addFilterToCurrentImage({
          filterName: 'crop',
          args: e.currentTarget.value,
        }),
      );
    }
  };

  const aspectRatioItems = [
    {
      className: 'icon_image',
      name: 'Original',
      value: 0,
    },
    {
      className: s.icon__one_to_one,
      name: '1:1',
      value: 1 / 1,
    },
    {
      className: s.icon__four_to_five,
      name: '4:5',
      value: 4 / 5,
    },
    {
      className: s.icon__sixteen_to_nine,
      name: '16:9',
      value: 16 / 9,
    },
  ];

  const aspectRatioBtn = aspectRatioItems.map((item) => (
    <li className={s.item} key={item.name}>
      <button value={item.value} onClick={cropImageHandler}>
        <span>{item.name}</span>
        <span className={item.className}></span>
      </button>
    </li>
  ));

  return <ul className={s.items}>{aspectRatioBtn}</ul>;
};
