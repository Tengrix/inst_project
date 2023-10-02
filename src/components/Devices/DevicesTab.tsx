import React from 'react';

import ActiveDevices from '@/components/Devices/Devices/ActiveDevices/ActiveDevices';
import CurrentDevice from '@/components/Devices/Devices/CurrentDevice/CurrentDevice';
import { Button } from '@/shared/ui/button';

const DevicesTab = () => {
    // expecting to have some rtk query hook(s) which returns active devices as well as current device

    //we should be able to get it back from backend
    const testDataThisDevice = {
        name: 'Chrome',
        ip: '192.168.1.1'
    };
    //we should be able to get it back from backend
    const activeDevices = [
        { name: 'Razer blade', ip: '192.168.1.1', lastVisit: new Date('09/29/2023'), log: <Button>LogOut</Button> },
        { name: 'iphone 11', ip: '192.168.1.1', lastVisit: new Date('09/29/2023'), log: <Button>LogOut</Button> }
    ];
    return (
        <div>
            <p>This device</p>
            <br />
            <div>
                <CurrentDevice device={testDataThisDevice} />
            </div>
            <br />
            <Button variant={'outlined'}>Terminate all other session</Button>
            <br />
            <br />
            <p>Active sessions</p>
            <div>{/*<ActiveDevices activeDevices={activeDevices} />*/}</div>
        </div>
    );
};

export default DevicesTab;
