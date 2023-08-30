import Image from 'next/image';

import placeholderIcon from 'public/icon/placeholderIcon.svg';

import { Typography } from '../typography';

import s from './placeholder.module.scss';

type ImagePlaceholderType = {
    width?: number;
    height?: number;
    src?: string;
    alt?: string;
    variant?: 'rounded' | 'default';
};

export const ImagePlaceholder = ({
    variant = 'default',
    alt = 'placeholderIcon',
    src = placeholderIcon
}: ImagePlaceholderType) => {
    return (
        <div className={`${variant && s[variant]} ${s.container}`}>
            <Image src={src} width={48} height={48} alt={alt} />
        </div>
    );
};

export const LoremIpsumPlaceholder = () => {
    const lorem = `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Dolor architecto recusandae distinctio veniam numquam amet
    earum dicta neque pariatur natus doloremque nemo deserunt
    commodi voluptates modi consequatur illo cum, obcaecati assumenda! `;

    return (
        <>
            <Typography variant="regular14" as="p">
                {lorem.repeat(1)}
            </Typography>
        </>
    );
};
