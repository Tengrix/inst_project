import Image from 'next/image';
import s from './placeholder.module.scss';
import placeholderIcon from 'public/icon/placeholderIcon.svg';
import { Typography } from '../typography';
import { useEffect, useState } from 'react';

type ImagePlaceholderType = {
  width?: number;
  height?: number;
  src?: Blob | string;
  alt?: string;
  variant?: 'rounded' | 'default';
};

export const ImagePlaceholder = ({
  variant = 'default',
  alt = 'placeholderIcon',
  width = 48,
  height = 48,
  src = placeholderIcon,
}: ImagePlaceholderType) => {
  const SRC = src === '' ? placeholderIcon : src;
  const [bWidth, setWidth] = useState(width);
  const [bHeight, setHeight] = useState(height);

  useEffect(() => {
    if (src !== '') {
      setWidth(200);
      setHeight(200);
    }
  }, [src]);

  return (
    <div className={`${variant && s[variant]} ${s.container}`}>
      {src instanceof Blob ? (
        <img src={SRC} width={bWidth} height={bHeight} alt={alt} />
      ) : (
        <Image src={SRC} width={bWidth} height={bHeight} alt={alt} />
      )}
    </div>
  );
};

export const LoremIpsumPlaceholder = ({ repeat = 1 }) => {
  const lorem = `Lorem, ipsum dolor sit amet consectetur adipisicing elit.
    Dolor architecto recusandae distinctio veniam numquam amet
    earum dicta neque pariatur natus doloremque nemo deserunt
    commodi voluptates modi consequatur illo cum, obcaecati assumenda! `;

  return (
    <>
      <Typography variant="regular14" as="p">
        {lorem.repeat(repeat)}
      </Typography>
    </>
  );
};
