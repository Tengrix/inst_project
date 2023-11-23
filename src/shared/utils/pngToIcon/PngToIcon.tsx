import Image, { StaticImageData } from 'next/image';

type Props = {
    iconPath: StaticImageData;
    width: number;
    height: number;
    alt?: string;
};
export const PngToIcon = (props: Props) => {
    return <Image src={props.iconPath} alt={props.alt ?? ''} width={props.width} height={props.height} />;
};
