import React, { ChangeEvent, useState } from 'react';
import { Crop } from 'react-image-crop';

import { Canvas } from '@/components/Canvas/Canvas';
import ImageCropper from '@/components/ImageCropper/ImageCropper';
import { ImageUploader } from '@/shared/ui/image-uploader/ImageUploader';

const Index = () => {
    const [image, setImage] = useState(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4PPPpQeXiWIC8_mV7P9u-tb6WACxsGGJ9Ow&usqp=CAU'
    );
    const [crop, setCrop] = useState<Crop>();
    const [canvas, setCanvas] = useState<HTMLCanvasElement>();

    const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files && e.target.files[0];
        if (img) {
            const imageURL = URL.createObjectURL(img);
            setImage(imageURL);
        }
    };
    return (
        <div style={{ display: 'flex', gap: '100px', marginTop: '100px', alignItems: 'flex-start' }}>
            <ImageUploader
                label="Add a Profile Photo"
                btnVariant={'outlined'}
                onImageChangeHandler={onImageChangeHandler}
            />
            <div style={{ display: 'flex', gap: '100px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    SRC IMG
                    <img src={image} alt="" />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: 500, height: 400 }}>
                    Crop container
                    <ImageCropper src={image} onCrop={setCrop} isCircular>
                        <img src={image} alt="" width={'100%'} />
                    </ImageCropper>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', width: 250, height: 250 }}>
                    Dest cont
                    <Canvas
                        crop={crop}
                        step={'Publication'}
                        filters={{}}
                        imageSRC={image}
                        destHeight={250}
                        destWidth={250}
                        getCanvas={setCanvas}
                    />
                </div>
            </div>
        </div>
    );
};

export default Index;
