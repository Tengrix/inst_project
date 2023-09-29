import { useTranslations } from 'next-intl';
import React from 'react';
import { Control } from 'react-hook-form';

import { GetUserDataResponseType } from '@/api/types';
import { ControlledTextField } from '@/shared/ui/controlled';
import { ControlledTextAreaField } from '@/shared/ui/controlled/controlled-text-area';
import NewDatePicker from '@/shared/ui/newDatePicker/NewDatePicker';
import { TextField } from '@/shared/ui/text-field';
import { EditProfileType } from '@/shared/utils/schemas/editProfileSchema';

import styles from './styles.module.scss';

type Props = {
    userData?: GetUserDataResponseType;
    control: Control<EditProfileType, any>;
};

const translationPath = 'profileSettings.tab.generalInformation';

export const ProfileInfoForm = ({ userData, control }: Props) => {
    const t = useTranslations(translationPath);

    return (
        <div className={styles.profileInfo}>
            <TextField label={t('form.username')} value={userData?.login} readOnly />
            <ControlledTextField
                name="firstName"
                translation={translationPath}
                label={t('form.firstname')}
                control={control}
            />
            <ControlledTextField
                name="lastName"
                translation={translationPath}
                label={t('form.lastname')}
                control={control}
            />
            <NewDatePicker name="birthdayDate" label={t('form.dateOfBirthday')} control={control} />
            <ControlledTextField name="city" translation={translationPath} label={t('form.city')} control={control} />
            <ControlledTextAreaField
                name="aboutMe"
                translation={translationPath}
                label={t('form.aboutMe')}
                control={control}
            />
        </div>
    );
};
