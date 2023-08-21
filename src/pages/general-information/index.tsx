import React, { useState, ChangeEvent } from 'react';
import { ControlledTextField } from '@/shared/ui/controlled';
import ImageModal from './modul/ImageModal';
import styles from './styles.module.css';
import { getLayout } from 'src/components/Layout/BaseLayout/BaseLayout';
import { useForm } from 'react-hook-form';
import PlaceholderImageIcon from '../../../public/icon/placeholder-image-icon'



const FormPage = () => {
  const [birthday, setBirthday] = useState('');
  const [aboutme, setAboutme] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  const { control, handleSubmit } = useForm();
  
  

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const onSubmit = (data: any) => {

    console.log(data);
 };
 

  return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.inputText}>
          Username
        <ControlledTextField name="userName" control={control}  />

        </label>

        <label className={styles.inputText}>
          First name
          <ControlledTextField name="firstName" control={control} className={styles.formPageWrapper}  />
        </label>

        <label className={styles.inputText}>
          Last Name
          <ControlledTextField name="lastName" control={control}/>
        </label>
        
        <div className={styles.dateText}>
          Date of birthday
          <input className={styles.inputDate} type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Address" />
         </div>

         <label className={styles.inputText}>
          City
          <ControlledTextField name="city" control={control} />
        </label>

        <label className={styles.inputText}>
          About me
          <textarea className={styles.textarea} value={aboutme} onChange={e => setAboutme(e.target.value)} placeholder="Text-area" />
        </label>

      <div className={styles.imageUpload} onClick={openModal}>
          {imagePreview ? (
            <img src={imagePreview} alt="Profile" className={styles.profilePreview} />
          ) : (
            <PlaceholderImageIcon className={styles.placeholderImage} />
          )}
      </div>


      {modalIsOpen && (
        <ImageModal onImageChange={onImageChange} closeModal={closeModal} imagePreview={imagePreview} />
      )}
        <div className={styles.line}></div>
      <button className={styles.button} >
          submit
        </button>
    </form>
  );
}

FormPage.getLayout = getLayout
export default FormPage;
