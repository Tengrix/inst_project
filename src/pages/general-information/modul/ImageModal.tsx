import React, { ChangeEvent } from 'react';
import styles from './ImageModal.module.css';

type ImageModalProps = {
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  closeModal: () => void;
  imagePreview: string | null;
};

const ImageModal = ({ onImageChange, closeModal, imagePreview }: ImageModalProps) => {
  return (
    <div className={styles.modalContent}>

<div className={styles.innerSquare}>
<button className={styles.cancelButton} onClick={closeModal}>x</button>

</div>


      <div className={styles.imageContainer}>
        {imagePreview ? <img src={imagePreview} alt="Preview" className={styles.previewImage} /> : 'Select an image'}
      </div>

      <label className={styles.addPhotoText}>
            Select from Computer
        <input type="file" accept="image/*" onChange={onImageChange} className={styles.hiddenInput} />
      </label>

      <button className={styles.button} onClick={closeModal}>Save</button>
      
    </div>
  );
};

export default ImageModal;
