import 'react-dates/initialize';

import DatePicker from "@/shared/ui/datePicker/DatePicker";
import {getLayout} from "@/components/Layout/BaseLayout/BaseLayout";
import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import {useState} from "react";


const Profile = () => {
    const [date,setDate] = useState('')

    return (
        <div>
            <Sidebar/>
            {/*{date}*/}
            {/*<DatePicker callback={setDate} label={'Date of birthday'}/>*/}
        </div>
    );
};

Profile.getLayout = getLayout
export default Profile;