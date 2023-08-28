import s from '@/components/ImageEditor/NavbarItems/Filter/ImageFilter.module.scss';
import { useAppDispatch } from '@/redux/store';
import { addFilterToCurrentImage } from '@/redux/store/imageSlice/imageSlice';
import { CurrentImageType } from '@/redux/store/imageSlice/types/store';

export const ImageFilter = ({ image }: { image: CurrentImageType }) => {
    const dispatch = useAppDispatch();
    const filters = [
        { className: 'original', value: 'none' },
        { className: 'blur', value: 'blur(4px)' },
        { className: 'brightness', value: 'brightness(250%)' },
        { className: 'contrast', value: 'contrast(180%)' },
        { className: 'grayscale', value: 'grayscale(100%)' },
        { className: 'huerotate', value: 'hue-rotate(180deg)' },
        { className: 'opacity', value: 'opacity(50%)' },
        { className: 'saturate', value: 'saturate(7)' },
        { className: 'sepia', value: 'sepia(100%)' }
    ];

    const applyFilterForImageHandler = (filter: string) => {
        if (filter) {
            dispatch(
                addFilterToCurrentImage({
                    filterName: 'color',
                    args: filter
                })
            );
        }
    };

    const filtersImages = filters.map(filter => (
        <li className={s.filter} key={filter.className}>
            <div onClick={() => applyFilterForImageHandler(filter.value)} role="button" aria-hidden>
                <img className={s[`${filter.className}`]} src={image.src} alt={filter.className} />
            </div>
        </li>
    ));

    return (
        <div className={s.container}>
            <ul className={s.filters}>{filtersImages}</ul>
        </div>
    );
};
