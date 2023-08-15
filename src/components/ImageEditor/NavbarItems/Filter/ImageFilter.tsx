import { useAppDispatch } from '@/store';
import { MouseEvent } from 'react';
import s from './ImageFilter.module.scss';
import { createNewImageBlob } from '@/shared/lib/imageStore';

export const ImageFilter = ({ image }) => {
  const dispatch = useAppDispatch();
  const filters = [
    { className: 'blur', value: 'blur(4px)' },
    { className: 'brightness', value: 'brightness(250%' },
    { className: 'contrast', value: 'contrast(180%)' },
    { className: 'grayscale', value: 'grayscale(100%)' },
    { className: 'huerotate', value: 'hue-rotate(180deg)' },
    { className: 'invert', value: 'invert(100%)' },
    { className: 'opacity', value: 'opacity(50%)' },
    { className: 'saturate', value: 'saturate(7)' },
    { className: 'sepia', value: 'sepia(100%)' },
  ];

  const applyFilterForImageHandler = (/* e: MouseEvent<HTMLButtonElement> */ filter: string) => {
    if (filter) {
      dispatch(
        createNewImageBlob({ filterName: 'color', /* args: e.currentTarget.value */ args: filter }),
      );
    }
  };

  return (
    <div className={s.container}>
      <ul className={s.filters}>
        {filters.map((filter) => (
          <li className={s.filter} key={filter.className}>
            <img
              className={s[`${filter.className}`]}
              src={image.src}
              alt={filter.className}
              onClick={() => applyFilterForImageHandler(filter.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
