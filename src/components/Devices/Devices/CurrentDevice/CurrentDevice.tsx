import { GlobeIcon } from '@radix-ui/react-icons';
import React from 'react';

import { Card } from '@/shared/ui/card';

import s from './currentDevice.module.css';

interface DevicesProps {
    device: {
        name: string;
        ip: string;
    };
}

const CurrentDevice = ({ device }: DevicesProps) => {
    return (
        <div>
            <Card>
                <div className={s.container}>
                    <div>
                        <GlobeIcon className={s.deviceIcon} />
                    </div>
                    <div className={s.deviceDesc}>
                        <div className={s.deviceName}>{device.name}</div>
                        <div>{device.ip}</div>
                        <div style={{ color: 'lightgreen' }}>{device.ip && device.name && 'Online'}</div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CurrentDevice;
