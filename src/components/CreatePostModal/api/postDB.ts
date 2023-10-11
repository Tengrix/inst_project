import { Indb } from '@/api/indxDB';
import { ImageType } from '@/redux/store/imageSlice/types/store';
import { base64ToBlobURL } from '@/shared/utils/canvas/base64ToBlobURL';
import { blobToBase64 } from '@/shared/utils/canvas/blobToBase64';

export class PostDB {
    db: Indb;

    constructor() {
        this.db = new Indb('Draft', ['images', 'description']);
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

    public async *getImages(currentUserID: string) {
        const imagesFromIndb: any = await this.db.getAll('images');
        for (const img of imagesFromIndb) {
            const {
                data: { image, imageBase64, userID }
            } = img;
            const blobURL: string = await base64ToBlobURL(imageBase64);
            if (currentUserID === userID) {
                yield { ...image, originalSRC: blobURL, src: blobURL };
            }
        }
    }

    public async resetImages(currentUserID: string) {
        const images = [];
        const imagesFromIndb: any = await this.db.getAll('images');
        for (const img of imagesFromIndb) {
            const {
                data: { userID, ...args }
            } = img;
            if (currentUserID !== userID) {
                images.push({ userID, ...args });
            }
        }
        this.db.clear('images');
        this.db.save('images', images);
    }

    public saveDescription(description: string, currentUserID: string) {
        this.db.save('description', [{ description, currentUserID }]);
    }

    public async getDescription(currentUserID: string) {
        const description = await this.db.getAll('description');
        return description;
    }

    public delete() {
        this.db.delete();
    }
}
