import * as React from 'react';
import { SVGProps, Ref, forwardRef, memo } from 'react';
const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={20} fill="none" ref={ref} {...props}>
        <path
            fill="#fff"
            fillRule="evenodd"
            d="m2.51 14 1.18-1.18c.38-.38.6-.88.6-1.42V6.73a4.73 4.73 0 0 1 5.35-4.69 4.85 4.85 0 0 1 4.08 4.9v4.46c0 .54.2 1.04.58 1.42L15.5 14h-13ZM11 16.34c0 .9-.92 1.66-2 1.66s-2-.76-2-1.66V16h4v.34Zm6.52-3.13-1.8-1.8V6.93c0-3.48-2.5-6.44-5.82-6.88a6.72 6.72 0 0 0-7.62 6.67v4.67l-1.8 1.8A1.63 1.63 0 0 0 1.64 16H5v.34C5 18.36 6.8 20 9 20s4-1.64 4-3.66V16h3.36a1.63 1.63 0 0 0 1.16-2.8Z"
            clipRule="evenodd"
        />
    </svg>
);
const ForwardRef = forwardRef(SvgComponent);

export const Mask = memo(ForwardRef);
