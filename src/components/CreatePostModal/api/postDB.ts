import { ImageType } from '@/redux/store/imageSlice/types/store';
import { base64ToBlobURL } from '@/shared/utils/canvas/base64ToBlobURL';
import { blobToBase64 } from '@/shared/utils/canvas/blobToBase64';

import { Indb } from './indb';

export class PostDB {
    db: Indb;

    constructor() {
        this.db = new Indb('Draft');
    }

    public async saveImages(images: ImageType[], currentUserID: string) {
        const imagesBase64 = [];
        const imagesBase64DB: any = await this.db.getAll('images');
        for (const img of imagesBase64DB) {
            const {
                data: { image, imageBase64, userID }
            } = img;
            if (currentUserID !== userID) {
                imagesBase64.push({ image, imageBase64, userID });
            }
        }

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const imageBase64 = await blobToBase64(image.originalSRC);
            imagesBase64.push({ image, imageBase64, userID: currentUserID });
        }
        this.db.save('images', imagesBase64);
    }

    public async getImages(save: boolean, currentUserID: string) {
        const images: Promise<ImageType>[] = [];
        const imagesFromIndb: any = await this.db.getAll('images');

        if (save && imagesFromIndb.length > 0) {
            for (let i = 0; i < imagesFromIndb.length; i++) {
                const {
                    data: { image, imageBase64, userID }
                } = imagesFromIndb[i];
                const newImage: Promise<ImageType> = new Promise((resolve, reject) => {
                    base64ToBlobURL(imageBase64).then((blobURL: string) => {
                        resolve({ ...image, originalSRC: blobURL, src: blobURL });
                    });
                });
                if (currentUserID === userID) {
                    images.push(newImage);
                }
            }
        }
        return images;
    }

    public saveDescription(description: string) {}

    public getDescription(description: string) {}
}
