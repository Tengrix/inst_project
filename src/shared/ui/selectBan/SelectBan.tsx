import { useTranslations } from 'next-intl';
import { useState } from 'react';

import s from './SelectBan.module.scss';

export const SelectBan = () => {
    const [selectedReasonForBan, setSelectedReasonForBan] = useState('');
    const t = useTranslations('');
    return (
        <select
            className={s.selectStyle}
            onChange={e => setSelectedReasonForBan(e.target.value)}
            name="selectedReasonForBan">
            <option value="" disabled selected>
                {t('modal.reasonForBan')}
            </option>
            <option value="Bad behavior">{t('modal.badBehavior')}</option>
            <option value="Advertising placement">{t('modal.advertisingPlacement')}</option>
            <option value="Another reason">{t('modal.anotherReason')}</option>
        </select>
    );
};
