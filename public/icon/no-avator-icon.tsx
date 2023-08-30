import * as React from "react"
import { SVGProps, memo } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={48}
        height={48}
        fill="none"
        {...props}
    >
        <path
            fill="#fff"
            d="M36 6H12a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h24a6 6 0 0 0 6-6V12a6 6 0 0 0-6-6Zm-24 4h24a2 2 0 0 1 2 2v16.72l-6.4-5.46a5.54 5.54 0 0 0-7.04 0L10 35.4V12a2 2 0 0 1 2-2Zm24 28H13.12l14-11.68a1.56 1.56 0 0 1 1.86 0L38 34v2a2 2 0 0 1-2 2Z"
        />
        <path fill="#fff" d="M16 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    </svg>
)
const Memo = memo(SvgComponent)
export { Memo as NoAvatar }