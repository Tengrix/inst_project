import { ImageType } from "@/shared/lib/imageStore";
import s from "./ImagesSlider.module.scss";
import Link from "next/link";


type ImageSliderPropsType = {
    currentImage: string
    images: Array<ImageType>
}

export const ImageSlider = ({currentImage, images} : ImageSliderPropsType) => {

    //const getHash = (src: string) => (src.match(/(?=\/([a-z-0-9]+)$)/) || [])[1] ?? src;
    const getHash = (src: string) => src.replace(/^.*\//, '');

    return (
        <div className={s.slider}>
        {images.length > 0 && (
                <ul className={s.slider__list}>
                    {images.map(({ src }) => (
                        <li id={getHash(src)} key={src} className={s.slider__item}>
                            <img className={s.slider__image} src={src} alt=""/>
                        </li>
                    ))}
                </ul>
            )
        }

        {images.length > 0 && (
            <ul className={s.bullets}> 
                {images.map(({ src }) => (
                    <li key={getHash(src)} className={s.bullets__item}>
                        <Link  href={`#${getHash(src)}`}></Link>
                    </li>
                    )
                )}
            </ul>
        )}

        </div>
    )
}