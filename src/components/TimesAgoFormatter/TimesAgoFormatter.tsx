import { useNow, useFormatter } from 'next-intl';

import { Typography } from '@/shared/ui/typography/typography';

import s from './TimesAgoFromatter.module.scss';

const TimesAgoFormatter = ({ date }: { date: string }) => {
    const format = useFormatter();
    const dateTime = new Date(date);
    const now = useNow({
        // Update every 30 seconds
        updateInterval: 1000 * 30
    });

    return (
        <Typography className={s.title}>
            <span className={s.dot}>&#9679;</span>
            {format.relativeTime(dateTime, now)}
        </Typography>
    );
};

export default TimesAgoFormatter;
