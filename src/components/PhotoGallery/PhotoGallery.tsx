import Image from 'next/image';

import s from './styles.module.scss';

type Props = {
    photos: string[] | null;
};
const PhotoGallery = (props: Props) => {
    const photos = props.photos?.map(photo => {
        return <Image key={photo} src={photo} alt={''} width={500} height={500} />;
    });
    return <div className={s.photoGallery}>{photos}</div>;
};

export default PhotoGallery;
