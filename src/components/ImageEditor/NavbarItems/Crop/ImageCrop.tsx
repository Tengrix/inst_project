import { addFilterToCurrentImage, createNewImageBlob } from '@/shared/lib/imageStore';
import { useAppDispatch, useAppSelector } from '@/store';
import { MouseEvent } from 'react';
import s from './ImageCrop.module.scss';


export const ImageCrop = () => {
/*
  const img = fetch(image).then(r => r.blob());

  const [img, setImage] = useState(image);
  const [bitmap, setBitmap] = useState(image);
  const [newImg, setnewImage] = useState(image);
  useEffect(() => {
    async function getImage() {
      const newImg = await fetch(image).then(r => r.blob());
      const newBitmap = await createImageBitmap(newImg);
      setImage(newImg);
      setBitmap(newBitmap);
    }
    getImage();
  }, [image])

  const crop = (bitmap: any, size:number) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    //const canvas = new OffscreenCanvas(256, 256);
    //const ctx = offscreen.getContext("webgl");

    canvas.width = size
    canvas.height = size

    const { width, height } = bitmap;

    const ratio = Math.max(size / width, size / height)

    const x = (size - (width * ratio)) / 2;
    const y = (size - (height * ratio)) / 2;
    ctx.drawImage(bitmap, 0, 0, width, height, x, y, width * ratio, height * ratio);
    const blob = {};
    const obj = function () {
      return b => {
        console.log(b)
        const src = URL.createObjectURL(b);
        blob['src'] = src;
      }
    }

    canvas.toBlob(obj, 'image/jpeg', 1);

    const promise = new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 1));
    //const func = () => async () => await promise.then(blob => blob);
    //const executor = (async () => await promise)();

    //console.log('PROMISE: ', executor);
    console.log(blob, obj())
    return promise;
  }
*/
  const dispatch = useAppDispatch();
  //const images = useAppSelector(state => state.images.images);
  //const imageIndex = useAppSelector(state => state.images.currentImageIndex);

  const cropImageHandler = (e: MouseEvent<HTMLButtonElement>) =>{
    if (e.currentTarget.value){
      console.log(e.currentTarget.value)
      /*dispatch(
        addFilterToCurrentImage({ 
          filterName: 'crop',
          args: e.currentTarget.value 
        }
      ));*/
      dispatch(createNewImageBlob({ filterName: 'crop', args: e.currentTarget.value }));
    }
  }

  return (
    <ul className={s.items}>
      <li className={s.item}>
        <button value={0} onClick={cropImageHandler}>
          <span>Original</span>
          <span className='icon_image'></span>
        </button>
      </li>
      <li className={s.item}>
        <button value={1 / 1} onClick={cropImageHandler}>
          <span>1:1</span>
          <span className={s.icon__one_to_one}></span>
        </button>
      </li>
      <li className={s.item}>
        <button value={4 / 5} onClick={cropImageHandler}>
          <span>4:5</span>
          <span className={s.icon__four_to_five}></span>
        </button>
      </li>
      <li className={s.item}>
        <button value={16 / 9} onClick={cropImageHandler}>
          <span>16:9</span>
          <span className={s.icon__sixteen_to_nine}></span>
        </button>
      </li>
    </ul>
  )
};

