import * as React from 'react';
import { memo, Ref, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" ref={ref} {...props}>
        <g clipPath="url(#a)">
            <path
                fill="#fff"
                d="M19 11H7.14l3.63-4.36a1 1 0 0 0-1.54-1.28l-5 6-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13l.09.15 5 6a1 1 0 0 0 1.54-1.28L7.14 13H19a1 1 0 0 0 0-2Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
const BackArrowLeft = memo(SvgComponent);
export default BackArrowLeft;
