import { useAppDispatch } from '@/store';
import { MouseEvent } from 'react';
import s from './ImageFilter.module.scss';


export const ImageFilter = ({image}) => {
    const dispatch = useAppDispatch();

    const applyFilterForImageHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value) {
            console.log(e.currentTarget.value)
            /*dispatch(
              addFilterToCurrentImage({ 
                filterName: 'crop',
                args: e.currentTarget.value 
              }
            ));*/
            dispatch(createNewImageBlob({ filterName: 'crop', args: e.currentTarget.value }));
        }
    }

    return (
        <div className={s.container}>
            <ul className={s.filters}>
                <li className={s.filter}>
                    <img className={s.blur} src={image.src} alt="" />
                </li>
                <li className={s.filter}>
                    <img className={s.brightness} src={image.src} alt="" />
                </li>
                <li className={s.filter}>
                    <img className={s.contrast} src={image.src} alt="" />
                </li>
                <li className={s.filter}>
                    <img className={s.grayscale} src={image.src} alt="" />
                </li>
                <li className={s.filter}>
                    <img className={s.huerotate} src={image.src} alt="" />
                </li>
                <li className={s.filter}>
                    <img className={s.invert} src={image.src} alt="" />
                </li>
                <li className={s.filter}>
                    <img className={s.opacity} src={image.src} alt="" />
                </li>
                <li className={s.filter}>
                    <img className={s.saturate} src={image.src} alt="" />
                </li>
                <li className={s.filter}>
                    <img className={s.sepia} src={image.src} alt="" />
                </li>
            </ul>
        </div>
    )
}