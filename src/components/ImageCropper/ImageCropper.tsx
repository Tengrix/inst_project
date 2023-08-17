import {centerCrop, Crop, makeAspectCrop, ReactCrop} from "react-image-crop";
import 'react-image-crop/src/ReactCrop.scss'
import {ReactNode, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import useDebounce from "@/hooks/useDebounce";
import {setCrop} from "@/shared/lib/imageStore";


type PropsType = {
    children?: ReactNode,
    ref: any
    src: string
    // aspect?: number
}

const centerAspectCrop = (
    mediaWidth: number,
    mediaHeight: number,
    aspect: number = 1,
) => centerCrop(
    makeAspectCrop(
        {
            unit: '%',
            width: 100,
        },
        aspect,
        mediaWidth,
        mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
);

const ImageCropper = (props: PropsType) => {
    const dispatch = useAppDispatch()
    const savedCrop = useAppSelector(state=>state.images.images.filter(image=>image.src===props.src)[0].crop)
    // const imageRef = useRef<HTMLImageElement>(null);
    const [curCrop, setCurCrop] = useState<Crop>(savedCrop||{
        unit: '%',
        x: 0,
        y: 0,
        width: 100,
        height: 100,
    })
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)


    const debouncedCrop = useDebounce(completedCrop, 2000)


    // const generateCroppedImageURL = () => {
    //     if (completedCrop && imageRef.current) {
    //         const canvas = document.createElement("canvas");
    //         const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    //         const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    //         canvas.width = completedCrop.width;
    //         canvas.height = completedCrop.height;
    //         const ctx = canvas.getContext("2d");
    //
    //         if (ctx) {
    //             ctx.drawImage(
    //                 imageRef.current,
    //                 completedCrop.x! * scaleX,
    //                 completedCrop.y! * scaleY,
    //                 completedCrop.width! * scaleX,
    //                 completedCrop.height! * scaleY,
    //                 0,
    //                 0,
    //                 completedCrop.width!,
    //                 completedCrop.height!
    //             );
    //
    //         }
    //     }
    // };

    // useEffect(() => {
    //     if (props.src && props.ref.current) {
    //         const {width, height} = props.ref.current
    //         const newCrop = centerAspectCrop(width, height, props.aspect!)
    //         setCrop(newCrop)
    //         setCompletedCrop(newCrop)
    //     }
    // }, [props.aspect])

    useEffect(() => {
        debouncedCrop && (dispatch(setCrop({crop:debouncedCrop,src:props.src})))
    }, [debouncedCrop])


    return (
                <ReactCrop
                    // aspect={props.aspect}
                    crop={curCrop}
                    onChange={(c) => {
                        setCurCrop(c)
                    }}
                    onComplete={(c) => {
                        setCompletedCrop(c)
                    }}
                >
                    {/*<img ref={imageRef} src={props.src}/>*/}
                    {props.children}
                </ReactCrop>


    );
};

export default ImageCropper;