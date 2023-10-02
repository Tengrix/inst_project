import { GlobeIcon } from '@radix-ui/react-icons';
import React from 'react';

import { Card } from '@/shared/ui/card';

interface DevicesProps {
    device: {
        name: string;
        ip: string;
    };
}

const Devices = ({ device }: DevicesProps) => {
    return (
        <div>
            <Card>
                <div>
                    <div>
                        <GlobeIcon />
                    </div>
                    <div></div>
                </div>
            </Card>
        </div>
    );
};

export default Devices;
