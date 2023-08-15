import s from './ImageScale.module.scss';

export const ImageScale = ({image}) => {
  return <div><img src={image} alt="" />{<div className={s.imageScale}>IMAGE SCALE</div>}</div>;
};
