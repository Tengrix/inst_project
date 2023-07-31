import Link from 'next/link';

type LogoPropsType = {
    width?: string;
    height?: string;
    color?: string;
    img?: string;
};

export const Logo = (props: LogoPropsType) => {
    const { width, height, color, img } = props;
    return (
        <Link href={'/'}>
            <h1 style={{ color: color ? color : 'white' }}>Inctagram</h1>
        </Link>
    );
};
