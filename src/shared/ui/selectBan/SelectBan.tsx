import { useState } from 'react';

import s from './SelectBan.module.scss';

export const SelectBan = () => {
    const [selectedReasonForBan, setSelectedReasonForBan] = useState('');
    return (
        <select
            className={s.selectStyle}
            onChange={e => setSelectedReasonForBan(e.target.value)}
            name="selectedReasonForBan">
            <option value="" disabled selected>
                Reason for ban
            </option>
            <option value="Bad behavior">Bad behavior</option>
            <option value="Advertising placement">Advertising placement</option>
            <option value="Another reason">Another reason</option>
        </select>
    );
};
