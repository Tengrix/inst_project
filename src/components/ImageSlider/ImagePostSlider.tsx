import Image from 'next/image';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import s from '@/components/ImageSlider/ImagesSlider.module.scss';

type ImagePostSliderPropsType = {
    images: Array<string>;
};

export const ImagePostSlider = ({ images }: ImagePostSliderPropsType) => {
    const prevBtn = (
        <div className={s.prevBtn}>
            <span className="icon_arrowIosBackLeft"></span>
        </div>
    );

    const nextBtn = (
        <div className={s.nextBtn}>
            <span className="icon_arrowIosForwardRight"></span>
        </div>
    );

    return (
        <div className={s.sliders}>

            {images.length > 1 ? nextBtn : ''}
            {images.length > 1 ? prevBtn : ''}

            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation={{
                    nextEl: `.${s.nextBtn}`,
                    prevEl: `.${s.prevBtn}`,
                    disabledClass: `${s.btn_disabled}`
                }}
                pagination={{
                    clickable: true,
                    bulletClass: `${s.btn}`,
                    bulletActiveClass: `${s.btn_active}`,
                    modifierClass: '',
                    horizontalClass: `${images.length > 1 ? s.bullets : s.bullets_hidden}`
                }}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}>
                {images.map((image, index) => (
                    <SwiperSlide key={image} virtualIndex={index}>
                        <Image
                            style={{ height: 400, width: 400, objectFit: 'contain', margin: '0 auto' }}
                            src={image}
                            alt=""
                            width={400}
                            height={400}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
