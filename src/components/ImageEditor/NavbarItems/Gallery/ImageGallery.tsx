import s from '@/components/ImageEditor/NavbarItems/Gallery/ImageGallery.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { addImage, removeImage, setCurrentImage } from '@/redux/store/imageSlice/imageSlice';
import { ImageUploader } from '@/shared/ui/image-uploader/ImageUploader';
import { parseImageBlob } from '@/shared/utils/parseImageBlob';

export const ImageGallery = () => {
    const dispatch = useAppDispatch();
    const images = useAppSelector(state => state.images.images);

    const addImageToGallery = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const blob = event.target.files[0];
            const image = parseImageBlob(blob);
            dispatch(addImage(image));
        }
    };

    const removeImageFromGallery = (e: any) => {
        if (e.currentTarget.value) {
            dispatch(removeImage({ src: e.currentTarget.value }));
        }
    };

    const imagePreview = images.map(({ originalSRC }) => (
        <li key={originalSRC} className={s.image}>
            <div
                role="button"
                aria-hidden
                onClick={() => {
                    dispatch(setCurrentImage(originalSRC));
                }}>
                <img src={originalSRC} alt="" />
            </div>

            <button className={s.image_close} onClick={removeImageFromGallery} value={originalSRC}>
                <span className={s.icon__close}></span>
            </button>
        </li>
    ));

    return (
        <div className={s.imageGalleryUploader}>
            <div className={s.galleryContainer}>
                {images.length > 0 && <ul className={s.images}>{imagePreview}</ul>}
                <ImageUploader label={'+'} onImageChangeHandler={addImageToGallery} />
            </div>
        </div>
    );
};
