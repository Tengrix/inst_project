import { ReactNode, useEffect, useState } from 'react';
import { centerCrop, Crop, makeAspectCrop, ReactCrop } from 'react-image-crop';
import 'react-image-crop/src/ReactCrop.scss';

import useDebounce from '@/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setCrop } from '@/redux/store/imageSlice/imageSlice';

type PropsType = {
    children?: ReactNode;
    src: string;
    isCircular?: boolean;
    // eslint-disable-next-line no-unused-vars
    onCrop?: (crop: Crop) => void;
};

const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number = 1) =>
    centerCrop(
        makeAspectCrop(
            {
                unit: 'px',
                width: mediaWidth
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );

const ImageCropper = ({ isCircular = false, ...props }: PropsType) => {
    const dispatch = useAppDispatch();
    const savedCrop = useAppSelector(state => state.images.images.filter(image => image.src === props.src)[0]?.crop);
    const cropRatio = +useAppSelector(
        state => state.images.images.filter(image => image.src === props.src)[0]?.filters.crop
    );
    const [curCrop, setCurCrop] = useState<Crop>(
        savedCrop || {
            unit: '%',
            x: 0,
            y: 0,
            width: 100,
            height: 100
        }
    );
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const debouncedCrop = useDebounce(completedCrop, 500);

    useEffect(() => {
        if (props.src) {
            const newCrop = centerAspectCrop(curCrop.width, curCrop.height, isCircular ? 1 : cropRatio);
            setCompletedCrop(newCrop);
            setCurCrop(newCrop);
        }
    }, [cropRatio]);

    useEffect(() => {
        if (debouncedCrop) {
            isCircular
                ? props.onCrop!(debouncedCrop)
                : dispatch(
                      setCrop({
                          crop: debouncedCrop,
                          src: props.src
                      })
                  );
        }
    }, [debouncedCrop]);

    return (
        <ReactCrop
            circularCrop={isCircular}
            aspect={isCircular ? 1 : cropRatio}
            crop={curCrop}
            onChange={c => {
                setCurCrop(c);
            }}
            onComplete={c => {
                setCompletedCrop(c);
            }}>
            {props.children}
        </ReactCrop>
    );
};

export default ImageCropper;
