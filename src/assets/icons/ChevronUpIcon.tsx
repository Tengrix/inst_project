import * as React from 'react';
import { SVGProps } from 'react';

const ChevronUpIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" {...props}>
        <g clipPath="url(#a)">
            <path
                fill="#fff"
                d="M19.542 14.514a1 1 0 0 1-1.64.77l-5.36-4.48-5.37 4.32a.999.999 0 0 1-1.41-.15 1 1 0 0 1 .15-1.46l6-4.83a1 1 0 0 1 1.27 0l6 5a1 1 0 0 1 .36.83Z"
            />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
        </defs>
    </svg>
);
export default ChevronUpIcon;
