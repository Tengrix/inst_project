import { ImageType } from "@/shared/lib/imageStore";


type ImageSliderPropsType = {
    currentImage: string
    images: Array<ImageType>
}

export const ImageSlider = ({currentImage, images} : ImageSliderPropsType) => {

    return (
        <div className="slider">
        {images.length > 0 && (
                <ul>
                    {images.map(({ src }) => (
                        <li key={src}>
                            <img src={src} alt=""/>
                        </li>
                    ))}
                </ul>
            )
        }
        </div>
    )
}